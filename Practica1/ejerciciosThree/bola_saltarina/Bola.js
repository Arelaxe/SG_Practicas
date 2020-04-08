class Bola extends THREE.Object3D{
    constructor(gui, titleGui){
        super();
        this.createGUI(gui, titleGui);

        this.bola = this.createBola();
        this.cilindro = this.createCilindro();
        this.add(this.bola);
        this.add(this.cilindro);
        this.tope = true ;
    }

    createGUI (gui,titleGui) {

        var that = this ;
  
        this.guiControls = new function () {
          this.radius = 5.0 ;
          this.bouncespeed = 0.4 ;
          this.turnspeed = 0.1 ;
          
          this.reset = function () {
            this.radius = 5.0 ;
            this.bouncespeed = 0.4 ;
            this.turnspeed = 0.1 ;
  
            that.remove(that.cilindro) ;
          }
        } 

        var folder = gui.addFolder (titleGui)
        folder.add (this.guiControls, 'radius', 1, 20, 1).name ('Radio : ').listen()
        .onChange(function(){
          that.modifyCilindro() ;
        }) ;
        var subfolder = gui.addFolder('Velocidad de animación:');
        subfolder.add(this.guiControls,'bouncespeed',0,5,0.1).name('Vel. salto:').listen();
        subfolder.add(this.guiControls,'turnspeed',-2,2,0.1).name('Vel. giro:').listen();
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



    update(){
        this.bola.position.x = this.guiControls.radius;
        this.cilindro.position.y = 10;
        this.rotation.y += this.guiControls.turnspeed;
        if (this.bola.position.y >= 20) this.tope = false ;
        if (this.bola.position.y <= 0) this.tope = true ;
        if (this.tope) this.bola.position.y += this.guiControls.bouncespeed;
        else this.bola.position.y -= this.guiControls.bouncespeed;
    }
}