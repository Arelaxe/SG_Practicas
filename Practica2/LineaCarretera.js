 class LineaCarretera extends THREE.Object3D {
    constructor() {
      super();
  
      this.linea = this.createLinea();

      this.add(this.linea);

      this.coche = new Coche();
      this.coche.scale.x = 0.1;
      this.coche.scale.y = 0.1;
      this.coche.scale.z = 0.1;
      this.coche.position.y = 1;
      this.coche.position.z = 45;
      this.coche.rotation.y += Math.PI/2;
      this.add(this.coche);
    }

    
    createLinea(){
        var linea = new THREE.Group();

        for (var i=0; i<10; i++){
          var casilla = new CasillaCarretera(0,0,i*5);
        
          linea.add(casilla);
        }

        return linea;
    }
    
    update () {
      this.coche.position.z -= 0.7;
    }
  }