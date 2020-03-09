class Icosaedro extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      var ejes = this.createAxis();
  
      this.icosaedro = this.createIcosaedro();
  
      this.add(ejes);
      this.add(this.icosaedro);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
    }
    
    createGUI (gui,titleGui) {

      var that = this ;

      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        this.radius = 1.0 ;
        this.segments = 2 ;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
          this.radius = 1.0 ;
          this.segments = 2;
        }
      } 

      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui)
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radius', 0.1, 5, 0.1).name ('Radio : ').listen()
      .onChange(function(){
          that.modifyIcosaedro() ;
        }) ;
      folder.add (this.guiControls, 'segments', 1, 5, 1).name ('Subdivisiones: ').listen()
      .onChange(function(){
          that.modifyIcosaedro() ;
      }) ;
      folder.add (this.guiControls, 'reset').name ('[ Reset ]').onChange(
        function(){
          that.modifyIcosaedro() ;
        });
    }
    
  
    createAxis(){
      this.axis = new THREE.AxesHelper (5);
      this.add (this.axis);
    }
  
    createIcosaedro(){
      // Un Mesh se compone de geometría y material
      var icoGeom = new THREE.IcosahedronGeometry (this.guiControls.radius,this.guiControls.segments);
      console.log("Creando cilindro (Radio/Resolucion) " + this.guiControls.radius + "/" + this.guiControls.segments) ;
      // Como material se crea uno a partir de un color
      var icoMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      var icosaedron = new THREE.Mesh (icoGeom, icoMat);
  
      var icosaedro = new THREE.Object3D();
      icosaedro.add(icosaedron);
  
      return icosaedro;
    }

    modifyIcosaedro(){
      //children posee a los ejes y la malla. Children[0] incluye la malla.
      var icoGeom = new THREE.IcosahedronGeometry (this.guiControls.radius,this.guiControls.segments);
      console.log(this.icosaedro.children[0].geometry) ;
      this.icosaedro.children[0].geometry = icoGeom ;
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.position.set (-15,-7,0);
      this.icosaedro.rotation.y += 0.01;
      this.icosaedro.rotation.x += 0.01;
      this.icosaedro.rotation.z += 0.01;
    }
  }