class Satelites extends THREE.Object3D{
    constructor(camara){
        super();
        this.tierra = this.createTierra();
        this.satelite1 = this.createSatelite1();
        this.satelite2 = this.createSatelite2(camara);
        this.satelite3 = this.createSatelite3();
        this.satelite1.position.set(10,0,0);
        this.satelite2.position.set(20,0,0);
        this.satelite3.position.set(30,0,0);
        this.add(this.tierra);
        this.add(this.satelite1);
        this.add(this.satelite2);
        this.add(this.satelite3);
        this.position.y = 5 ;
    }

    createTierra(){
        var tierraGeom = new THREE.SphereGeometry(5,20,20);
        var textura = new THREE.TextureLoader().load('../imgs/tierra.jpg');
        var tierraMat = new THREE.MeshPhongMaterial({map:textura});

        var tierra = new THREE.Mesh(tierraGeom,tierraMat);
        return tierra;
    }

    createBaseSatelite(){
        var satGeom = new THREE.SphereGeometry(2,20,20);
        var textura = new THREE.TextureLoader().load('../imgs/cara.jpg');
        var satMat = new THREE.MeshPhongMaterial({map:textura});

        var satelite = new THREE.Mesh(satGeom,satMat);
        return satelite;
    }

    createSatelite1(){
        var satelite = this.createBaseSatelite();
        return satelite ;
    }
    createSatelite2(camara){
        var satelite = this.createBaseSatelite();
        satelite.geometry.rotateY(-Math.PI/2);
        return satelite;
    }
    createSatelite3(){
        var satelite = this.createBaseSatelite();
        return satelite;
    }

    update(camara){
        this.rotation.y += 0.01 ;
        this.satelite1.rotation.y = Math.PI ;
        this.satelite2.lookAt(camara.position);
        this.satelite3.rotation.y += 0.01;
    }
}