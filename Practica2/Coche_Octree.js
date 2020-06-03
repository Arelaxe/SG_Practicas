class Coche extends THREE.Object3D{
    constructor(octree){
        super();

        var that = this ;
        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();

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
                    var geomCollider = new THREE.BoxGeometry(bb.max.x-bb.min.x,bb.max.y-bb.min.y,bb.max.z-bb.min.z);
                    geomCollider.translate(12.5,10,-0.5);
                    var matCollider = new THREE.MeshPhongMaterial({color:0xbb0000, transparent:true, opacity:0.5});
                    var collider = new THREE.Mesh(geomCollider,matCollider);
                    collider.add(modelo);
                    that.add(collider);
                    that.addTreeNode(octree,that.children[0]) ;
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

    addTreeNode(arbol,objeto){
        arbol.add(objeto,{useFaces:true });
    }

    update(){
    }
}