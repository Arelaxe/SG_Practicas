class Tuerca extends THREE.Object3D{
    constructor(){
        super() ;

        var ejes = this.createAxis();

        this.tuerca = this.createTuerca() ;

        this.add(ejes) ;
        this.add(this.tuerca) ;
        this.position.set(10,0,0);
    }

    createCamino(){
        var radius = 1.25 ;
        var heightStep  = 0.005 ;
        var turns = 4;
        var pointsPerTurn = 100;

        var angleStep = (Math.PI * 2) / pointsPerTurn ;

        var puntos = [] ;

        for(var i = 0 ; i < turns*pointsPerTurn ; i++){
            puntos.push(new THREE.Vector3(
                Math.cos(angleStep * i) * radius,
                heightStep * i,
                Math.sin(angleStep * i) * radius
            ));

            
        }

        var curve = new THREE.CatmullRomCurve3(puntos);
        return curve; 
    }

    createEspiral(){
        var triangulo = new THREE.Shape();
            triangulo.lineTo(0.1,0);
            triangulo.lineTo(0,0.05);
            triangulo.lineTo(0,0);
        var camino = this.createCamino() ;
        var extrudeSettings = {depth:50, curveSegments: 20 , steps: 100, extrudePath: camino};
        var geometry = new THREE.ExtrudeGeometry( triangulo, extrudeSettings );

        return geometry;
    }

    createTuerca(){
        var base = new THREE.CylinderGeometry(2.5,2.5,2,6);
        var cilindroAgujero = new THREE.CylinderGeometry(1.25,1.25,2,20);
        var esferaEsquinas = new THREE.SphereGeometry(2.55,20,20) ;
        var espiralRosca = this.createEspiral() ;
        espiralRosca.translate(0,-1,0);

        var base_BSP = new ThreeBSP(base);
        var cilindroAgujero_BSP = new ThreeBSP(cilindroAgujero);
        var esferaEsquinas_BSP = new ThreeBSP(esferaEsquinas);
        var espiralRosca_BSP = new ThreeBSP(espiralRosca);

        var agujero = base_BSP.subtract(cilindroAgujero_BSP);
        var pulido = agujero.intersect(esferaEsquinas_BSP);
        var figura_final = pulido.union(espiralRosca_BSP);
        

        var material = new THREE.MeshNormalMaterial() ;
        var malla = figura_final.toMesh(material) ;

        var tuerca = new THREE.Object3D();
        tuerca.add(malla) ;
        return tuerca;
    }

    createAxis(){
        this.axis = new THREE.AxesHelper (10);
        this.add (this.axis);
    }

    update(){
        this.tuerca.rotation.x += 0.01;
        this.tuerca.rotation.y += 0.01;
        this.tuerca.rotation.z += 0.01;
    }
}