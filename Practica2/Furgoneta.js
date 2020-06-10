class Furgoneta extends THREE.Object3D{
    constructor(){
        super();
        var that = this ;
        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();

        this.isFurgoneta = true;

        this.collider = new THREE.Mesh();

        materialLoader.load('models/furgoneta/furgoneta.mtl',
            function(material){
                objectLoader.setMaterials(material);
                objectLoader.load('models/furgoneta/furgoneta.obj',
                function(objeto){
                    var modelo = objeto ;
                    modelo.position.x = 0;
                    //Collider
                    var bounding = new THREE.BoxHelper(modelo);
                    bounding.geometry.computeBoundingBox();
                    var bb = bounding.geometry.boundingBox;
                    var geomCollider = new THREE.BoxBufferGeometry(bb.max.x-bb.min.x,bb.max.y-bb.min.y,bb.max.z-bb.min.z);
                    geomCollider.translate(0.1, 21,-0.5);
                    var matCollider = new THREE.MeshPhongMaterial({color:0xbb0000, transparent:true, opacity:0.0});
                    that.collider.geometry = geomCollider;
                    that.collider.material = matCollider ;
                    that.collider.add(modelo);
                    that.add(that.collider);
                },null,null);
            });
        
        this.scale.x = 0.1;
        this.scale.y = 0.1;
        this.scale.z = 0.1;
        this.position.y = 1.0;
        this.velocidad = 40;
        this.desaparicion = 3.5;
    }

    getCollider(){
        return this.collider;
    }

    update(){
    }
}