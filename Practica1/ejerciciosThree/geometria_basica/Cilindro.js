 
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
      folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Dimensión X : ').listen();
      folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Dimensión Y : ').listen();
      folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Dimensión Z : ').listen();
      folder.add (this.guiControls, 'radiusTop', 0.1, 5, 0.1).name ('Radio superior : ').listen()
      .onChange(function(){
          that.remove(that.cilindro) ;
          console.log("RadSup" + that.guiControls.radiusTop) ;
          that.cilindro = that.createCilindro() ;
          that.add(that.cilindro) ;
        }) ;
      folder.add (this.guiControls, 'radiusBottom', 0.1, 5, 0.1).name ('Radio inferior : ').listen()
      .onChange(function(){
          that.remove(that.cilindro) ;
          console.log("RadInf" + that.guiControls.radiusBottom) ;
          that.cilindro = that.createCilindro() ;
          that.add(that.cilindro) ;
      }) ;
      folder.add (this.guiControls, 'height', 0.1, 5.0, 0.1).name ('Altura : ').listen()
      .onChange(function(){
        that.remove(that.cilindro) ;
        console.log("Altura" + that.guiControls.height) ;
        that.cilindro = that.createCilindro() ;
        that.add(that.cilindro) ;
    });
      folder.add (this.guiControls, 'segments', 5, 50, 1).name ('Resolución : ').listen()
      .onChange(function(){
        that.remove(that.cilindro) ;
        console.log("Segmentos" + that.guiControls.segments) ;
        that.cilindro = that.createCilindro() ;
        that.add(that.cilindro) ;
    }) ;
      folder.add (this.guiControls, 'reset').name ('[ Reset ]').onChange(
        function(){
          that.remove(that.cilindro) ;
          console.log("RESET" + that.guiControls.radiusBottom) ;
          that.cilindro = that.createCilindro() ;
          that.add(that.cilindro) ;
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
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.position.set (0,10,0);
      this.cilindro.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
      this.cilindro.rotation.y += 0.01;
      this.cilindro.rotation.x += 0.01;
      this.cilindro.rotation.z += 0.01;
    }
  }