class Taza extends THREE.Object3D{
    constructor(){
        super() ;

        var ejes = this.createAxis();

        this.taza = this.createTaza() ;

        this.add(ejes) ;
        this.add(this.taza) ;
        this.position.set(-10,0,0);
    }

    createTaza(){
        var cilindroTaza = new THREE.CylinderGeometry(5,5,10,20) ;
        var asaTaza = new THREE.TorusGeometry(3,0.5,50,20) ;
        var cilindroCapacidad = new THREE.CylinderGeometry(4.5,4.5,10,20) ;
        asaTaza.translate(-5,0,0) ;
        cilindroCapacidad.translate(0,2,0) ;

        var cilindroTaza_BSP = new ThreeBSP(cilindroTaza);
        var asaTaza_BSP = new ThreeBSP(asaTaza);
        var cilindroCapacidad_BSP = new ThreeBSP(cilindroCapacidad) ;

        var formaTaza = cilindroTaza_BSP.union(asaTaza_BSP) ;
        var tazaVacia = formaTaza.subtract(cilindroCapacidad_BSP) ;

        var material = new THREE.MeshNormalMaterial() ;
        var malla = tazaVacia.toMesh(material) ;

        var taza = new THREE.Object3D();
        taza.add(malla) ;
        return taza;
    }

    createAxis(){
        this.axis = new THREE.AxesHelper (10);
        this.add (this.axis);
    }

    update(){
        this.taza.rotation.x += 0.01;
        this.taza.rotation.y += 0.01;
        this.taza.rotation.z += 0.01;
    }
}