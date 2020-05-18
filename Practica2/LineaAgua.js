class LineaAgua extends THREE.Object3D {
    constructor() {
      super();

      var val = Math.random() * (10 - 0) + 0;

      if (val>5){
          this.madera = true;
      } 
      else{
          this.madera = false;
      }
  
      this.linea = this.createLinea();

      this.add(this.linea);
    }

    
    createLinea(){
        var linea = new THREE.Group();

        for (var i=0; i<10; i++){
          var casilla = new CasillaAgua(0,0,i*5);
        
          linea.add(casilla);
          
          var transitable = Math.random() * (10 - 0) + 0;

          if (transitable > 5){
            if(this.madera){
              var cas = new CasillaMadera(0,0.25,i*5);
            }
            else{
              var cas = new CasillaNenufar(0,0.25,i*5);
            }
            linea.add(cas);
          }
        }

        return linea;
    }
    
    update () {
    }
}