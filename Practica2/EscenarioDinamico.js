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

        this.tiempo_anterior = new Date ();

        return escenario;
    }
    
    update () {
        

        var tiempo_actual = new Date ();
        if ((tiempo_actual-this.tiempo_anterior) > 5000){
            this.tiempo_anterior = new Date();
            this.escenario.remove(this.escenario.children[0]);

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
        }
        else{
            for (var i=0; i<this.num_lineas; i++){
                this.escenario.children[i].update();
            }
        }
    }
}