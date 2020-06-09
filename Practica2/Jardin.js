class Jardin extends THREE.Object3D{
    constructor(){
        super();

        this.arboles = [];
        this.rocas = [];
    }

    sacarArbol(){
        if (this.arboles.length == 0) return new Arbol();
        else return this.arboles.pop();
    }

    meterArbol(arbol){
        this.arboles.push(arbol);
    }

    sacarRoca(){
        if (this.rocas.length == 0) return new Rock();
        else return this.rocas.pop();
    }

    meterRoca(roca){
        this.arboles.push(roca);
    }
}