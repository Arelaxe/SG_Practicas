class GeneraEscenario extends THREE.Object3D {
    constructor(num_lineas,octree) {
      super();
  
      this.escenario = this.createEscenario(num_lineas,octree);
      this.num_lineas = num_lineas;

      this.add(this.escenario);
    }

    
    createEscenario(num_lineas,octree){
        var escenario = new THREE.Group();

        var linea;

        linea = new LineaInicial();
        escenario.add(linea);

        for (var i=1; i<num_lineas; i++){
            var tipo_linea = Math.random() * (3 - 0) + 0;

            if (tipo_linea >= 0 && tipo_linea < 1){
                linea = new LineaAgua(i);
            }
            else if (tipo_linea >= 1 && tipo_linea < 2){
                linea = new LineaCesped(i);
            }
            else{
                linea = new LineaCarretera(i,octree);
            }
        
            escenario.add(linea);
        }

        return escenario;
    }
    
    update () {
        for (var i=0; i<this.num_lineas; i++){
            this.escenario.children[i].update();
        }
    }
}