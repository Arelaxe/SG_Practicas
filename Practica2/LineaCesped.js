class LineaCesped extends THREE.Object3D {
    constructor() {
      super();

      var val = Math.random() * (10 - 0) + 0;

      if(val>5){
        this.arboles = true;
      }
      else{
        this.arboles = false;
      }
      console.log(val);
  
      this.linea = this.createLinea();

      this.add(this.linea);
    }

    
    createLinea(){
        var linea = new THREE.Group();

        for (var i=0; i<10; i++){
          var casilla = new CasillaCesped(0,0,i*5);
        
          linea.add(casilla);

          var obstaculo = Math.random() * (10 - 0) + 0;

          if (obstaculo > 8){
            if (this.arboles){
              var arbol = new Arbol();
              arbol.scale.x = 1.5;
              arbol.scale.y = 1.5;
              arbol.scale.z = 1.5;
              arbol.position.y = 2.75;
              arbol.position.z = i*5;
              this.add(arbol);
            }
            else{
              var rock = new Rock();
              rock.scale.x = 1.75;
              rock.scale.y = 1.75;
              rock.scale.z = 1.75;
              rock.position.y = 1;
              rock.position.z = i*5;
              this.add(rock);
            }
            
          }
        }

        return linea;
    }
    
    update () {
    }
}