class Arbol extends THREE.Object3D{
    constructor(){
        super();

        var that = this ;
        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();

        this.isObstacle = true ;

        materialLoader.load('models/tree/lowpolytree.mtl',
            function(material){
                objectLoader.setMaterials(material);
                objectLoader.load('models/tree/lowpolytree.obj',
                function(objeto){
                    var modelo = objeto ;
                    //Collider
                    var bounding = new THREE.BoxHelper(modelo);
                    bounding.geometry.computeBoundingBox();
                    var bb = bounding.geometry.boundingBox;
                    var geomCollider = new THREE.BoxGeometry(bb.max.x-bb.min.x,bb.max.y-bb.min.y,bb.max.z-bb.min.z);
                    geomCollider.translate(0,0.65,0)
                    var matCollider = new THREE.MeshPhongMaterial({color:0x00ab00, transparent:true, opacity:0.5});
                    var collider = new THREE.Mesh(geomCollider,matCollider);
                    collider.add(modelo);
                    that.add(collider);
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
    }

    update(){
    }
}