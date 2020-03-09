 
class Cilindro extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      var ejes = this.createAxis();
  
      this.cilindro = this.createCilindro();
  
      this.add(ejes);
      this.add(this.cilindro);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
    }
    
    createGUI (gui,titleGui) {

      var that = this ;

      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;
        this.radiusTop = 1.0 ;
        this.radiusBottom = 1.0 ;
        this.height = 1.0 ;
        this.segments = 5.0 ;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
          this.sizeX = 1.0;
          this.sizeY = 1.0;
          this.sizeZ = 1.0;
          this.radiusTop = 1.0 ;
          this.radiusBottom = 1.0 ;
          this.height = 1.0 ;
          this.segments = 5;

          that.remove(that.cilindro) ;
          console.log("RESET" + that.guiControls.radiusBottom) ;
          that.cilindro = that.createCilindro() ;
          that.add(that.cilindro) ;
        }
      } 

      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui)
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radiusTop', 0.1, 5, 0.1).name ('Radio superior : ').listen()
      .onChange(function(){
          that.modifyCilindro() ;
        }) ;
      folder.add (this.guiControls, 'radiusBottom', 0.1, 5, 0.1).name ('Radio inferior : ').listen()
      .onChange(function(){
          that.modifyCilindro() ;
      }) ;
      folder.add (this.guiControls, 'height', 0.1, 5.0, 0.1).name ('Altura : ').listen()
      .onChange(function(){
        that.modifyCilindro() ;
    });
      folder.add (this.guiControls, 'segments', 5, 50, 1).name ('Resolución : ').listen()
      .onChange(function(){
        that.modifyCilindro() ;
    }) ;
      folder.add (this.guiControls, 'reset').name ('[ Reset ]').onChange(
        function(){
          that.modifyCilindro() ;
        });
    }
    
  
    createAxis(){
      this.axis = new THREE.AxesHelper (5);
      this.add (this.axis);
    }
  
    createCilindro(){
      // Un Mesh se compone de geometría y material
      var cylGeom = new THREE.CylinderGeometry (this.guiControls.radiusTop,this.guiControls.radiusBottom,this.guiControls.height,this.guiControls.segments);
      console.log("Creando cilindro (RS/RI/A/S) " + this.guiControls.radiusTop + "/" + this.guiControls.radiusBottom + "/" + this.guiControls.height + "/" + this.guiControls.segments) ;
      // Como material se crea uno a partir de un color
      var cylMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      var cylinder = new THREE.Mesh (cylGeom, cylMat);
  
      var cilindro = new THREE.Object3D();
      cilindro.add(cylinder);
  
      return cilindro;
    }

    modifyCilindro(){
      //children posee a los ejes y la malla. Children[0] incluye la malla.
      var cylGeom = new THREE.CylinderGeometry (this.guiControls.radiusTop,this.guiControls.radiusBottom,this.guiControls.height,this.guiControls.segments);
      console.log(this.cilindro.children[0].geometry) ;
      this.cilindro.children[0].geometry = cylGeom ;
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.position.set (0,7,0);
      this.cilindro.rotation.y += 0.01;
      this.cilindro.rotation.x += 0.01;
      this.cilindro.rotation.z += 0.01;
    }
  }