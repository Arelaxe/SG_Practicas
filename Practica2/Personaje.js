class Personaje extends THREE.Object3D{
constructor(){
    super();

    var that = this ;
    var materialLoader = new THREE.MTLLoader();
    var objectLoader = new THREE.OBJLoader();

    materialLoader.setMaterialOptions({side: THREE.DoubleSize}).load('models/chicken/chicken.mtl',
        function(material){
            objectLoader.setMaterials(material);
            objectLoader.load('models/chicken/chicken.obj',
            function(objeto){
                var modelo = objeto ;
                that.add(modelo);
                objeto.children[0].material.map.anisotropy = 16 ;
                objeto.children[0].material.map.minFilter = THREE.LinearFilter;
                console.log(objeto.children[0].geometry);
            },
            // called when loading is in progresses
            function ( xhr ) {
        
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            // called when loading has errors
            function ( error ) {
        
                console.log( 'An error happened' );
        
            });
        });
}

saltar(reloj,distancia,tiempototal){
    console.log(this.position);
    var time = reloj.getDelta();
    if(reloj.getElapsedTime() < tiempototal){
        if (reloj.getElapsedTime() < tiempototal/2) {
            this.position.y += distancia * time/tiempototal/2;
            this.position.z += distancia * time/tiempototal/2;
        } else {
            this.position.y -= distancia * time/tiempototal/2;
            this.position.z += distancia * time/tiempototal/2;
        }
    }
}

aplastarY(reloj,tiempototal){
    var time = reloj.getDelta()  ;
    if(reloj.getElapsedTime()<tiempototal){
        this.scale.y = this.scale.y - time/tiempototal ;
        this.position.y -= 2*time/tiempototal; 
    }
}

aplastarZ(reloj,tiempototal){
    var time = reloj.getDelta()  ;
    if(reloj.getElapsedTime()<tiempototal){
        this.scale.z = this.scale.z - time/tiempototal ;
    }
}

update(reloj){
    this.saltar(reloj,5,0.5);
    if (reloj.getElapsedTime() >= 0.5){reloj.stop(); reloj.start();}
}
}