class Elipse extends THREE.Object3D{
    constructor(gui, titleGui){
        super();
        this.rad_pista = 5;
        this.rad_bola = 2;

        this.createGUI(gui,titleGui);
        this.curva = this.createCurva();
        this.pista = this.createPista();
        this.bola = this.createBola();
        this.cilindro = this.createCilindro();
        this.add(this.pista);
        this.add(this.bola);
        this.add(this.cilindro);
        var that = this;
        //Movimiento por Tween
        var origen = {recorrido : 0};
        var destino = {recorrido : 1};

        this.animacion1 = new TWEEN.Tween(origen).to(destino,4000);
        this.animacion1.onUpdate(function(){
            that.pista.geometry = new THREE.BufferGeometry().setFromPoints(that.curva.getPoints(1000));
            var posicion = that.curva.getPointAt(origen.recorrido);
            that.bola.position.copy(posicion);
            var tangente = that.curva.getTangentAt(origen.recorrido);
            posicion.add(tangente);
            that.bola.lookAt(posicion);
        });
        this.animacion1.start();
        this.animacion1.repeat(Infinity);
    }

    createGUI(gui,titleGui){
        var that = this ;
  
        this.guiControls = new function () {
          this.escala = 1.0 ;
          
        } 

        var folder = gui.addFolder (titleGui)
        folder.add (this.guiControls, 'escala', 1, 5, 1).name ('Extensión : ').listen()
        .onChange(function(){
          that.modifyRotacion() ;
        }) ;
    }

    modifyRotacion(){
        var cylGeom = new THREE.CylinderGeometry (this.rad_pista,this.rad_pista,5,30);
        cylGeom.scale(this.guiControls.escala,1,1);
        cylGeom.translate(0,2.5,0);
        this.cilindro.children[0].geometry = cylGeom ;
        
        var curve = new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(-this.rad_pista*this.guiControls.escala,0,0),
                new THREE.Vector3(0,0,-this.rad_pista),
                new THREE.Vector3(this.rad_pista*this.guiControls.escala,0,0),
                new THREE.Vector3(0,0,this.rad_pista)
            ],true,'catmullrom',0.8
        );

        this.curva = curve;
      }

    createPista(){
        var curva = this.createCurva();
        var points = curva.getPoints( 1000 );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );

        var material = new THREE.LineBasicMaterial( { color : 0xffffff, transparent:true, opacity:0 } );
 
        // Create the final object to add to the scene
         var curveObject = new THREE.Line( geometry, material );
         return curveObject;
    }   

    createCurva(){
        var curva = new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(-this.rad_pista,0,0),
                new THREE.Vector3(0,0,-this.rad_pista),
                new THREE.Vector3(this.rad_pista,0,0),
                new THREE.Vector3(0,0,this.rad_pista)
            ],true,'catmullrom',0.8
        );

        return curva;
    }

    createCilindro(){
        var cylGeom = new THREE.CylinderGeometry (this.rad_pista,this.rad_pista,5,30);
        var cylMat = new THREE.MeshNormalMaterial({opacity:0.35, transparent:true});
        
        cylGeom.translate(0,2.5,0);

        var cylinder = new THREE.Mesh (cylGeom, cylMat);
    
        var cilindro = new THREE.Object3D();
        cilindro.add(cylinder);
    
        return cilindro;
    }

    createBola(){
        var satGeom = new THREE.SphereGeometry(this.rad_bola,20,20);
        var satMat = new THREE.MeshNormalMaterial();
        satGeom.translate(0,1.5,0);
        var satelite = new THREE.Mesh(satGeom,satMat);

        return satelite;
    }
}