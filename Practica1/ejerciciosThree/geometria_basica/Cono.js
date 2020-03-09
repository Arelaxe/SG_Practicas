 
class Cono extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      var ejes = this.createAxis();
  
      this.cono = this.createCono();
  
      this.add(ejes);
      this.add(this.cono);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
    }
    
    createGUI (gui,titleGui) {

      var that = this ;

      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        this.radius = 1.0 ;
        this.height = 1.0 ;
        this.segments = 5.0 ;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
          this.radius = 1.0 ;
          this.height = 1.0 ;
          this.segments = 3;

          that.remove(that.cono) ;
          that.cono = that.createCono() ;
          that.add(that.cono) ;
        }
      } 

      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui)
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radius', 0.1, 5, 0.1).name ('Radio: ').listen()
      .onChange(function(){
          that.remove(that.cono) ;
          that.cono = that.createCono() ;
          that.add(that.cono) ;
        }) ;
      folder.add (this.guiControls, 'height', 0.1, 5.0, 0.1).name ('Altura : ').listen()
      .onChange(function(){
        that.remove(that.cono) ;
        console.log("Altura" + that.guiControls.height) ;
        that.cono = that.createCono() ;
        that.add(that.cono) ;
    });
      folder.add (this.guiControls, 'segments', 5, 50, 1).name ('Resolución : ').listen()
      .onChange(function(){
        that.remove(that.cono) ;
        console.log("Segmentos" + that.guiControls.segments) ;
        that.cono = that.createCono() ;
        that.add(that.cono) ;
    }) ;
      folder.add (this.guiControls, 'reset').name ('[ Reset ]').onChange(
        function(){
          that.remove(that.cono) ;
          that.cono = that.createCono() ;
          that.add(that.cono) ;
        });
    }
    
  
    createAxis(){
      this.axis = new THREE.AxesHelper (5);
      this.add (this.axis);
    }
  
    createCono(){
      // Un Mesh se compone de geometría y material
      var coneGeom = new THREE.ConeGeometry (this.guiControls.radius, this.guiControls.height, this.guiControls.segments);
      
      // Como material se crea uno a partir de un color
      var coneMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      var cone = new THREE.Mesh (coneGeom, coneMat);
  
      var cono = new THREE.Object3D();
      cono.add(cone);
  
      return cono;
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.position.set (0,-10,0);
      this.cono.rotation.y += 0.01;
      this.cono.rotation.x += 0.01;
      this.cono.rotation.z += 0.01;
    }
  }