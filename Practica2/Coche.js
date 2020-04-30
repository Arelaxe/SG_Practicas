class Coche extends THREE.Object3D{
    constructor(){
        super();

        var that = this ;
        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();

        materialLoader.load('models/low_poly_cars_set/Low_Poly_City_Cars.mtl',
            function(material){
                objectLoader.setMaterials(material);
                objectLoader.load('models/low_poly_cars_set/Low_Poly_City_Cars.obj',
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