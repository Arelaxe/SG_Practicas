class Elipse extends THREE.Object3D{
    constructor(){
        super();
        this.curva = this.createCurva();
        this.pista = this.createPista();
        this.bola = this.createBola();
        this.add(this.pista);
        this.add(this.bola);
        var that = this;
        //Movimiento por Tween
        var origenizq = {recorrido : 0};
        var destinoizq = {recorrido : 0.35};
        var origender = {recorrido : 0.35};
        var destinoder = {recorrido : 1};

        this.animacion1 = new TWEEN.Tween(origenizq).to(destinoizq,4000);
        this.animacion2 = new TWEEN.Tween(origender).to(destinoder,8000);
        this.animacion1.easing(TWEEN.Easing.Quadratic.InOut);
        this.animacion2.easing(TWEEN.Easing.Cubic.InOut);
        this.animacion1.onUpdate(function(){
            that.curva.points[0].x -= 0.01;
            that.curva.points[2].x += 0.01;
            that.pista.geometry = new THREE.BufferGeometry().setFromPoints(that.curva.getPoints(1000));
            var posicion = that.curva.getPointAt(origenizq.recorrido);
            that.bola.position.copy(posicion);
            var tangente = that.curva.getTangentAt(origenizq.recorrido);
            posicion.add(tangente);
            that.bola.lookAt(posicion);
        });
        this.animacion2.onUpdate(function(){
            that.curva.points[0].x -= 0.01;
            that.curva.points[2].x += 0.01;
            that.pista.geometry = new THREE.BufferGeometry().setFromPoints(that.curva.getPoints(1000));
            var posicion = that.curva.getPointAt(origender.recorrido);
            that.bola.position.copy(posicion);
            var tangente = that.curva.getTangentAt(origender.recorrido);
            posicion.add(tangente);
            that.bola.lookAt(posicion);
        });
        this.animacion1.chain(this.animacion2);
        this.animacion2.chain(this.animacion1);
        this.animacion1.start();

    }

    createPista(){
        var curva = this.createCurva();
        var points = curva.getPoints( 1000 );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );

        var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
 
        // Create the final object to add to the scene
         var curveObject = new THREE.Line( geometry, material );
         return curveObject;
    }   

    createCurva(){
        var curva = new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(-5,0,0),
                new THREE.Vector3(0,0,-5),
                new THREE.Vector3(5,0,0),
                new THREE.Vector3(0,0,5)
            ],true,'catmullrom',0.8
        );


        var camino = new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),new THREE.Vector3(0,5,0)]);

        var extrudeSettings = { amount: 50, curveSegments: 50 , steps: 50, extrudePath: camino };

        var geometry = new THREE.ExtrudeBufferGeometry( curva, extrudeSettings );

        this.mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color : 0xff0000}) );

        return this.mesh;
    }

    createBola(){
        var satGeom = new THREE.SphereGeometry(2,20,20);
        this.rad_bola = 2;
        var satMat = new THREE.MeshNormalMaterial();
        satGeom.translate(0,1.5,0);
        var satelite = new THREE.Mesh(satGeom,satMat);

        return satelite;
    }
}