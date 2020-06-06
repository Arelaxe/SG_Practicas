class LineaInicial extends THREE.Object3D {
    constructor() {
      super();
  
      this.linea = this.createLinea();

      this.add(this.linea);
    }

    
    createLinea(){
        var linea = new THREE.Group();

        for (var i=0; i<10; i++){
          var casilla = new CasillaCesped(0,0,i*5);
        
          linea.add(casilla);
        }

        return linea;
    }

    getObstaculos(){return [];}
    
    update () {
    }
}