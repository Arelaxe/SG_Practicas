class Coche extends THREE.Object3D{
    constructor(){
        super();

        var that = this ;
        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();

        this.isCoche = true;

        this.collider = new THREE.Mesh();

        materialLoader.load('models/coche/coche.mtl',
            function(material){
                objectLoader.setMaterials(material);
                objectLoader.load('models/coche/coche.obj',
                function(objeto){
                    var modelo = objeto ;
                    //Collider
                    var bounding = new THREE.BoxHelper(modelo);
                    bounding.geometry.computeBoundingBox();
                    var bb = bounding.geometry.boundingBox;
                    var geomCollider = new THREE.BoxBufferGeometry(bb.max.x-bb.min.x,bb.max.y-bb.min.y,bb.max.z-bb.min.z);
                    geomCollider.translate(12.5,10,-0.5);
                    var matCollider = new THREE.MeshPhongMaterial({color:0xbb0000, transparent:true, opacity:0.0});
                    that.collider.geometry = geomCollider;
                    that.collider.material = matCollider ;
                    that.collider.add(modelo);
                    that.add(that.collider);
                },
                // called when loading is iporsche911n progresses
                function ( xhr ) {
            
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            
                },
                // called when loading has errors
                function ( error ) {
            
                    console.log( 'An error happened' );
            
                });
            });
        
        this.scale.x = 0.1;
        this.scale.y = 0.1;
        this.scale.z = 0.1;
        this.position.y = 1.0;
        this.velocidad = 50;
        this.desaparicion = 2.5;
    }

    getCollider(){
        return this.collider;
    }

    update(){
    }
}