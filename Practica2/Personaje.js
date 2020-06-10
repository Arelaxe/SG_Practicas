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
                objeto.children[0].material.map.anisotropy = 16 ;
                objeto.children[0].material.map.minFilter = THREE.LinearFilter;
                //Collider
                var bounding = new THREE.BoxHelper(modelo);
                bounding.geometry.computeBoundingBox();
                var bb = bounding.geometry.boundingBox;
                var geomCollider = new THREE.BoxBufferGeometry(bb.max.x-bb.min.x,bb.max.y-bb.min.y,bb.max.z-bb.min.z);
                geomCollider.translate(0,0,-0.5);
                var matCollider = new THREE.MeshPhongMaterial({color:0xabc, transparent:true, opacity:0.0});
                var collider = new THREE.Mesh(geomCollider,matCollider);
                collider.add(modelo);
                that.add(collider);
            },null,null);
        }); 
        
        this.anterior = Date.now() ;
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
}