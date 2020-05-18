class Arbol extends THREE.Object3D{
    constructor(){
        super();

        var that = this ;
        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();

        materialLoader.load('models/tree/lowpolytree.mtl',
            function(material){
                objectLoader.setMaterials(material);
                objectLoader.load('models/tree/lowpolytree.obj',
                function(objeto){
                    var modelo = objeto ;
                    that.add(modelo);
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
            console.log(this);
    }

    update(){
    }
}