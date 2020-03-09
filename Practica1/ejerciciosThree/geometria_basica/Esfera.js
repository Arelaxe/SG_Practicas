 
class Esfera extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      var ejes = this.createAxis();
  
      this.esfera = this.createEsfera();
  
      this.add(ejes);
      this.add(this.esfera);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
    }
    
    createGUI (gui,titleGui) {

      var that = this ;

      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        this.radius = 1.0 ;
        this.segmentsSide = 5.0 ;
        this.segmentsTop = 5.0 ;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
          this.radius = 1.0 ;
          this.segmentsSide = 5;
          this.segmentsTop = 5;
        }
      } 

      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui)
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radius', 0.1, 5, 0.1).name ('Radio : ').listen()
      .onChange(function(){
          that.modifyEsfera() ;
        }) ;
      folder.add (this.guiControls, 'segmentsSide', 1, 50, 1).name ('Res. ecuat.: ').listen()
      .onChange(function(){
          that.modifyEsfera() ;
      }) ;
      folder.add (this.guiControls, 'segmentsTop', 1, 50, 1).name ('Res. merid : ').listen()
      .onChange(function(){
        that.modifyEsfera() ;
    });
      folder.add (this.guiControls, 'reset').name ('[ Reset ]').onChange(
        function(){
          that.modifyEsfera() ;
        });
    }
    
  
    createAxis(){
      this.axis = new THREE.AxesHelper (5);
      this.add (this.axis);
    }
  
    createEsfera(){
      // Un Mesh se compone de geometría y material
      var sphGeom = new THREE.SphereGeometry (this.guiControls.radius,this.guiControls.segmentsSide,this.guiControls.segmentsTop);
      console.log("Creando cilindro (Radio/Seg.I-D/Seg.Arr-Aba) " + this.guiControls.radius + "/" + this.guiControls.segmentsSide + "/" + this.guiControls.segmentsTop) ;
      // Como material se crea uno a partir de un color
      var sphMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      var sphere = new THREE.Mesh (sphGeom, sphMat);
  
      var esfera = new THREE.Object3D();
      esfera.add(sphere);
  
      return esfera;
    }

    modifyEsfera(){
      //children posee a los ejes y la malla. Children[0] incluye la malla.
      var sphGeom = new THREE.SphereGeometry (this.guiControls.radius,this.guiControls.segmentsSide,this.guiControls.segmentsTop);
      console.log(this.esfera.children[0].geometry) ;
      this.esfera.children[0].geometry = sphGeom ;
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.position.set (-15,7,0);
      this.esfera.rotation.y += 0.01;
      this.esfera.rotation.x += 0.01;
      this.esfera.rotation.z += 0.01;
    }
  }