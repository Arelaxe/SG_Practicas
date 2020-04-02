class Esquina extends THREE.Object3D{
    constructor(){
        super() ;

        var ejes = this.createAxis();

        this.esquina = this.createEsquina() ;

        this.add(ejes) ;
        this.add(this.esquina) ;
    }

    createEsquina(){
        var cajaVertical = new THREE.BoxGeometry(0.6,5,2) ;
        var cajaHorizontal = new THREE.BoxGeometry(5,0.6,2) ;
        var cajaCurva = new THREE.BoxGeometry(1,1,2) ;
        var conoAgujero = new THREE.CylinderGeometry(0.5,0.2,0.6,20) ;
        var conoAgujero2 = new THREE.CylinderGeometry(0.5,0.2,0.6,20) ;
        var cilindro = new THREE.CylinderGeometry(0.92,0.92,5,20)  ;
        cajaHorizontal.translate(2.2,0,0);
        cajaVertical.translate(0,2.5,0);
        cajaCurva.translate(0.6,0.6,0);
        cilindro.rotateX(Math.PI/2);
        cilindro.translate(1.2,1.2,0);
        conoAgujero.translate(3.5,0,0);
        conoAgujero2.rotateX(Math.PI/2);
        conoAgujero2.rotateY(Math.PI/2);
        conoAgujero2.translate(0,4,0);


        var cajaVertical_BSP = new ThreeBSP(cajaVertical);
        var cajaHorizontal_BSP = new ThreeBSP(cajaHorizontal);
        var cajaCurva_BSP = new ThreeBSP(cajaCurva);
        var cilindro_BSP = new ThreeBSP(cilindro);
        var conoAgujero_BSP = new ThreeBSP(conoAgujero);
        var conoAgujero2_BSP = new ThreeBSP(conoAgujero2);

        var borde = cajaVertical_BSP.union(cajaHorizontal_BSP) ;
        var caja = borde.union(cajaCurva_BSP);
        var pieza = caja.subtract(cilindro_BSP);
        var pieza_unAgujero = pieza.subtract(conoAgujero_BSP);
        var pieza_final = pieza_unAgujero.subtract(conoAgujero2_BSP);

        var material = new THREE.MeshNormalMaterial() ;
        var malla = pieza_final.toMesh(material) ;

        var esquina = new THREE.Object3D();
        esquina.add(malla) ;
        return esquina;
    }

    createAxis(){
        this.axis = new THREE.AxesHelper (10);
        this.add (this.axis);
    }

    update(){
        this.esquina.rotation.x += 0.01;
        this.esquina.rotation.y += 0.01;
        this.esquina.rotation.z += 0.01;
    }
}