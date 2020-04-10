class Cilindro extends THREE.Object3D{
    constructor(gui, titleGui){
        super();
        this.createGUI(gui, titleGui);

        this.cilindro = this.createCilindro();
        this.add(this.cilindro);
    }

    createGUI (gui,titleGui) {

        var that = this ;
  
        this.guiControls = new function () {
          this.radius = 5.0 ;
          
          this.reset = function () {
            this.radius = 5.0 ;
  
            that.remove(that.cilindro) ;
          }
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
        
        cylGeom.translate(0,10,0);

        // Ya podemos construir el Mesh
        var cylinder = new THREE.Mesh (cylGeom, cylMat);
    
        var cilindro = new THREE.Object3D();
        cilindro.add(cylinder);
    
        return cilindro;
      }
  
      modifyCilindro(){
        //children posee a los ejes y la malla. Children[0] incluye la malla.
        var cylGeom = new THREE.CylinderGeometry (this.guiControls.radius,this.guiControls.radius,20,30);
        cylGeom.translate(0,10,0);
        this.cilindro.children[0].geometry = cylGeom ;
      }
}