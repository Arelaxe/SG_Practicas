class EscenarioDinamico extends THREE.Object3D {
    constructor(num_lineas) {
      super();
  
      this.escenario = this.createEscenario(num_lineas);
      this.num_lineas = num_lineas;

      this.add(this.escenario);
      this.num_linea_actual = num_lineas;
      this.num_lineas_eliminadas = 0;
    }

    
    createEscenario(num_lineas){
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
                linea = new LineaCarretera(i);
            }
        
            escenario.add(linea);
        }

        this.tiempo_borrar = new Date ();
        this.tiempo_crear = new Date();

        return escenario;
    }
    
    update () {
        var tiempo_actual = new Date ();
        if ((tiempo_actual-this.tiempo_borrar) > 6000){
            this.tiempo_borrar = new Date();
            this.escenario.remove(this.escenario.children[0]); 
            this.num_lineas--;           
        }
        else if((tiempo_actual-this.tiempo_crear) > 2000) {
            this.tiempo_crear = new Date();
            var tipo_linea = Math.random() * (3 - 0) + 0;
            var linea;

            if (tipo_linea >= 0 && tipo_linea < 1){
                linea = new LineaAgua(this.num_linea_actual);
            }
            else if (tipo_linea >= 1 && tipo_linea < 2){
                linea = new LineaCesped(this.num_linea_actual);
            }
            else{
                linea = new LineaCarretera(this.num_linea_actual);
            }
        
            this.num_linea_actual++;
            this.escenario.add(linea);
            this.num_lineas++;
        }
        else{
            for (var i=0; i<this.num_lineas; i++){
                this.escenario.children[i].update();
            }
        }
    }
}