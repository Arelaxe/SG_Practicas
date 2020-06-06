class LineaInicial extends THREE.Object3D {
    constructor(num_linea) {
      super();
  
      this.linea = this.createLinea(num_linea);

      this.add(this.linea);
    }

    
    createLinea(num_linea){
        var linea = new THREE.Group();

        for (var i=0; i<25; i++){
          var casilla = new CasillaCesped(num_linea*5,0,i*5);
        
          linea.add(casilla);
        }

        return linea;
    }

    getObstaculos(){return [];}

    getTrampas(){
      return [];
    }
    
    update () {
    }
}