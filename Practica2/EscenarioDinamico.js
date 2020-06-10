class EscenarioDinamico extends THREE.Object3D {
    constructor(num_lineas,garaje,jardin) {
      super();
  
      this.obstaculos = [];
      this.trampas = [] ;
      this.garaje = garaje;
      this.jardin = jardin;
      this.escenario = this.createEscenario(num_lineas,garaje,jardin);
      this.num_lineas = num_lineas;

      this.add(this.escenario);
      this.num_linea_actual = num_lineas;
      this.num_lineas_eliminadas = 0;
    }

    
    createEscenario(num_lineas,garaje,jardin){
        var escenario = new THREE.Group();

        var linea;

        linea = new LineaInicial(-4);
        escenario.add(linea);
        linea = new LineaInicial(-3);
        escenario.add(linea);
        linea = new LineaInicial(-2);
        escenario.add(linea);
        linea = new LineaInicial(-1);
        escenario.add(linea);

        for (var i=0; i<num_lineas; i++){
            var tipo_linea = Math.random() * (3 - 0) + 0;

            if (tipo_linea >= 0 && tipo_linea < 1){
                linea = new LineaAgua(i);
            }
            else if (tipo_linea >= 1 && tipo_linea < 2){
                linea = new LineaCesped(i,this.jardin);
            }
            else{
                linea = new LineaCarretera(i,this.garaje);

            }
        
            escenario.add(linea);
        }

        this.tiempo_borrar = new Date ();
        this.tiempo_crear = new Date();

        return escenario;
    }

    getObstaculos(){
        return this.obstaculos;
    }

    getTrampas(){
        return this.trampas;
    }
    
    update () {
        var tiempo_actual = new Date ();
        if ((tiempo_actual-this.tiempo_borrar) > 2000){
            this.tiempo_borrar = new Date();
            if (this.escenario.children[0] instanceof LineaCesped) this.escenario.children[0].recoger();
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
                linea = new LineaCesped(this.num_linea_actual,this.jardin);
            }
            else{
                linea = new LineaCarretera(this.num_linea_actual,this.garaje);
            }
        
            this.num_linea_actual++;
            this.escenario.add(linea);
            this.num_lineas++;
            this.recargarObjetos();
        }
        else{
            for (var i=0; i<this.num_lineas; i++){
                this.escenario.children[i].update();
            }
        }
    }

    recargarObjetos(){
        this.obstaculos = [];
        this.trampas = [];

        for(let l=0 ; l<this.num_lineas ; l++){
            var obstaculo = this.escenario.children[l].getObstaculos();
            for(let o = 0 ; o < obstaculo.length ; o++){
                this.obstaculos.push(obstaculo[o]);
            }
            var trampa = this.escenario.children[l].getTrampas();
            for(let o = 0 ; o < trampa.length ; o++){
                this.trampas.push(trampa[o]);
            }
        }

        this.obstaculos = this.obstaculos.filter(function(dato){return dato != undefined;});
        this.trampas = this.trampas.filter(function(dato){return dato != undefined;});
    }
}