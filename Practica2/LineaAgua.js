class LineaAgua extends THREE.Object3D {
    constructor(num_linea) {
      super();

      var val = Math.random() * (10 - 0) + 0;

      if (val>5){
          this.madera = true;
      } 
      else{
          this.madera = false;
      }
  
      this.linea = this.createLinea(num_linea);

      this.add(this.linea);
    }

    
    createLinea(num_linea){
        var linea = new THREE.Group();

        for (var i=0; i<25; i++){
          var casilla = new CasillaAgua(num_linea*5,0,i*5);
        
          linea.add(casilla);
          
          var transitable = Math.random() * (10 - 0) + 0;

          if (transitable > 5){
            if(this.madera){
              var cas = new CasillaMadera(num_linea*5,0.25,i*5);
            }
            else{
              var cas = new CasillaNenufar(num_linea*5,0.25,i*5);
            }
            linea.add(cas);
          }
        }

        return linea;
    }
    
    update () {
    }
}