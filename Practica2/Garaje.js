class Garaje extends THREE.Object3D{
    constructor(){
        super();

        this.coches = [];
        this.cochespequenos = [];
        this.furgonetas = [];
        this.autobuses = [] ;
    }

    sacarCoche(){
        if (this.coches.length < 1) {console.log("Saco nuevo Coche."); return new Coche();}
        else {console.log("Saco viejo Coche."); return this.coches.pop()};
    }
    meterCoche(coche){
        this.coches.push(coche);
    }
    sacarCochePeque(){
        if (this.cochespequenos.length < 1) {console.log("Saco nuevo Peque."); return new CochePeque();}
        else {console.log("Saco viejo Peque."); return this.cochespequenos.pop();}
    }
    meterCochePeque(coche){
        this.cochespequenos.push(coche);
    }
    sacarFurgoneta(){
        if (this.furgonetas.length < 1) {console.log("Saco nueva furgo."); return new Furgoneta();}
        else {console.log("Saco vieja Furgo."); return this.furgonetas.pop();}
    }
    meterFurgoneta(furgo){
        this.furgonetas.push(furgo);
    }
    sacarBus(){
        if (this.autobuses.length < 1) {console.log("Saco nuevo Bus."); return new Autobus();}
        else {console.log("Saco viejo Bus."); return this.autobuses.pop();}
    }
    meterBus(bus){
        this.autobuses.push(bus);
    }

}