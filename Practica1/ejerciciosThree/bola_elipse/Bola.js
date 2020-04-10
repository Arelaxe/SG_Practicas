class Bola extends THREE.Object3D{
    constructor(cilindro_asociado){
        super();

        this.cil_asociado = cilindro_asociado;
        this.bola = this.createBola();
        this.add(this.bola);
    }

    createBola(){
        var satGeom = new THREE.SphereGeometry(2,20,20);
        this.rad_bola = 2;
        var satMat = new THREE.MeshNormalMaterial();
        satGeom.translate(this.cil_asociado.radX,1.5,0);
        var satelite = new THREE.Mesh(satGeom,satMat);

        this.tiempo_anterior = Date.now();

        return satelite;
    }

    

    update(){
        this.velocidad_angular = Math.PI/2; // Ya que quiero que de la vuelta en 4 segundos

        var tiempo_actual = Date.now();
        var segundos_transcurridos = (tiempo_actual-this.tiempo_anterior)/1000;

        

       
        this.tiempo_anterior = tiempo_actual;
    }
}