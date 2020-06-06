 class LineaCarretera extends THREE.Object3D {
    constructor(num_linea) {
      super();
  
      this.linea = this.createLinea(num_linea);
      this.obstaculos = [];

      this.add(this.linea);

      this.hay_coche = false;  
      this.velocidad = 1.5;    
    }
    
    createLinea(num_linea){
        var linea = new THREE.Group();
        this.num_linea = num_linea;

        for (var i=0; i<25; i++){
          var casilla = new CasillaCarretera(num_linea*5,0,i*5);
        
          linea.add(casilla);
        }

        return linea;
    }

    getObstaculos(){
      return this.obstaculos ;
    }
    
    update () {
      var val = Math.random() * (100000 - 0) + 0;
      if (val>99500 && !this.hay_coche){
        this.coche = new Coche();
        this.coche.scale.x = 0.1;
        this.coche.scale.y = 0.1;
        this.coche.scale.z = 0.1;
        this.coche.position.y = 1;
        this.coche.position.x = this.num_linea*5;
        this.coche.position.z = 45;
        this.coche.rotation.y += Math.PI/2;
        this.add(this.coche);
        this.tiempo_anterior = Date.now();
        this.hay_coche = true; 
        this.obstaculos.push(this.coche);
      } 
      
      if(this.hay_coche){
        var tiempo_actual = Date.now();

        var segundosTranscurridos = (tiempo_actual-this.tiempo_anterior)/1000;
        this.coche.position.z -= this.velocidad * segundosTranscurridos;

        if(segundosTranscurridos > 1.5){
          this.remove(this.coche);
          this.hay_coche = false;
        }
      }
    }
  }