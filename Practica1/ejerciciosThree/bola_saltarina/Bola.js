class Bola extends THREE.Object3D{
    constructor(gui, titleGui){
        super();
        this.createGUI(gui, titleGui);

        this.bola = this.createBola();
        this.cilindro = this.createCilindro();
        this.add(this.bola);
        this.add(this.cilindro);
        this.animar();
    }

    createGUI (gui,titleGui) {

        var that = this ;
  
        this.guiControls = new function () {
          this.radius = 5.0 ;
        }

        var folder = gui.addFolder (titleGui)
        folder.add (this.guiControls, 'radius', 1, 20, 1).name ('Radio : ').listen()
        .onChange(function(){
          that.modifyCilindro() ;
        }) ;
    }

    createCilindro(){
        // Un Mesh se compone de geometría y material
        var cylGeom = new THREE.CylinderGeometry (this.guiControls.radius,this.guiControls.radius,20,30);
        // Como material se crea uno a partir de un color
        var cylMat = new THREE.MeshNormalMaterial({opacity:0.35, transparent:true});
        
        // Ya podemos construir el Mesh
        var cylinder = new THREE.Mesh (cylGeom, cylMat);
    
        var cilindro = new THREE.Object3D();
        cilindro.add(cylinder);
    
        return cilindro;
      }
  
      modifyCilindro(){
        //children posee a los ejes y la malla. Children[0] incluye la malla.
        var cylGeom = new THREE.CylinderGeometry (this.guiControls.radius,this.guiControls.radius,20,30);
        this.cilindro.children[0].geometry = cylGeom ;
      }

    createBola(){
        var satGeom = new THREE.SphereGeometry(2,20,20);
        var satMat = new THREE.MeshNormalMaterial();
        satGeom.translate(0,1.5,0);
        var satelite = new THREE.Mesh(satGeom,satMat);
        return satelite;
    }

    animar(){
      var that=this;
      //Origenes y destinos
      var origenrot = {rotacion:0};
      var destrot = {rotacion:2*Math.PI};
      var origenarriba = {altura:0};
      var destinoarriba = {altura:that.cilindro.children[0].geometry.parameters.height};
      var origenabajo = {altura:that.cilindro.children[0].geometry.parameters.height};
      var destinoabajo = {altura:0};

      //Animaciones: giro y salto (arriba-abajo)
      this.animaciongiro = new TWEEN.Tween(origenrot).to(destrot,4000)
      .onUpdate(function(){
        that.rotation.y = origenrot.rotacion;
        that.cilindro.position.y = that.cilindro.children[0].geometry.parameters.height - 10;  
        that.bola.position.x = that.guiControls.radius ;
      }).repeat(Infinity).start();

      this.animacionarriba = new TWEEN.Tween(origenarriba).to(destinoarriba,500)
      .onUpdate(function(){
        that.bola.position.y = origenarriba.altura;
      })
      this.animacionabajo = new TWEEN.Tween(origenabajo).to(destinoabajo,500)
      .onUpdate(function(){
        that.bola.position.y = origenabajo.altura;
      })

      this.animacionarriba.chain(this.animacionabajo);
      this.animacionabajo.chain(this.animacionarriba);
      this.animacionarriba.start();

    }

    update(){}
}