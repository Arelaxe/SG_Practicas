 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
    constructor (myCanvas) {
      super();
      
      this.applicationMode = MyScene.NO_ACTION;
      this.renderer = this.createRenderer(myCanvas);
      this.gui = this.createGUI ();
      this.mousedown = false;

      this.ambientLight = null;
      this.spotLight = null;
      this.camera = null;
      this.cameraControl = null
      this.suelo = null;

      this.createLights ();
      this.createCamera ();
      this.axis = new THREE.AxesHelper (5);
      this.add (this.axis);
      this.model = this.createModel ();

      this.add (this.model);
    }

    createModel (){
      var model = new THREE.Object3D();
      var loader = new THREE.TextureLoader();
      var textura = loader.load ("../imgs/wood.jpg");
      this.suelo = new Suelo (this, 100, 100, new THREE.MeshPhongMaterial ({map: textura}), 4);
      model.add (this.suelo);
      this.setMessage('Pulsa H para obtener ayuda');
      return model;

    }
    
    createCamera () {
      // Para crear una cámara le indicamos
      //   El ángulo del campo de visión en grados sexagesimales
      //   La razón de aspecto ancho/alto
      //   Los planos de recorte cercano y lejano
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      // También se indica dónde se coloca
      this.camera.position.set (30, 20, 30);
      // Y hacia dónde mira
      var look = new THREE.Vector3 (0,0,0);
      this.camera.lookAt(look);
      
      // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
      this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
      // Se configuran las velocidades de los movimientos
      this.cameraControl.rotateSpeed = 5;
      this.cameraControl.zoomSpeed = -2;
      this.cameraControl.panSpeed = 0.5;
      // Debe orbitar con respecto al punto de mira de la cámara
      this.cameraControl.target = look;

      this.add (this.camera);
    }
    
    createGUI () {
      // Se crea la interfaz gráfica de usuario
      var gui = new dat.GUI();
      var that = this;
      
      // La escena le va a añadir sus propios controles. 
      // Se definen mediante una   new function()
      // En este caso la intensidad de la luz y si se muestran o no los ejes
      this.guiControls = new function() {
        // En el contexto de una función   this   alude a la función
        this.lightIntensity = 0.5;
        this.axisOnOff = true;
        this.turnOnOff = false;

        this.setAddCajas = function () {
          that.applicationMode = MyScene.ADDING_BOXES;
        }

        this.setMoverCajas = function () {
          that.applicationMode = MyScene.MOVING_BOXES;
        }
      }
  
      // Se crea una sección para los controles de esta clase
      var folder = gui.addFolder ('Luz y Ejes');
      
      // Se le añade un control para la intensidad de la luz
      folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
      
      // Y otro para mostrar u ocultar los ejes
      folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');

      var folder_2 = gui.addFolder ('Cajas');

      folder_2.add (this.guiControls, 'setAddCajas').name ('Añadir cajas: ');

      folder_2.add (this.guiControls, 'setMoverCajas').name ('Mover cajas: ');
      
      return gui;
    }
    
    createLights () {
      // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
      // La luz ambiental solo tiene un color y una intensidad
      // Se declara como   var   y va a ser una variable local a este método
      //    se hace así puesto que no va a ser accedida desde otros métodos
      this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
      // La añadimos a la escena
      this.add (this.ambientLight);
      
      this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity);
      this.spotLight.position.set( 60, 60, 40 );
      this.spotLight.castShadow = true;
      this.spotLight.shadow.mapSize.width=2048
      this.spotLight.shadow.mapSize.height=2048;
      this.add (this.spotLight);
    }
    
    createRenderer (myCanvas) {
      // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
      
      // Se instancia un Renderer   WebGL
      var renderer = new THREE.WebGLRenderer();
      
      // Se establece un color de fondo en las imágenes que genera el render
      renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
      
      // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // La visualización se muestra en el lienzo recibido
      $(myCanvas).append(renderer.domElement);
      
      return renderer;  
    }
    
    getCamera () {
      // En principio se devuelve la única cámara que tenemos
      // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
      return this.camera;
    }

    getCameraControl () {
      return this.cameraControl;
    }
    
    setCameraAspect (ratio) {
      // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
      // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
      this.camera.aspect = ratio;
      // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
      this.camera.updateProjectionMatrix();
    }
    
    onWindowResize () {
      // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
      // Hay que actualizar el ratio de aspecto de la cámara
      this.setCameraAspect (window.innerWidth / window.innerHeight);
      
      // Y también el tamaño del renderizador
      this.renderer.setSize (window.innerWidth, window.innerHeight);
    }
  
    update () {
      // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
      
      // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
      // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
      requestAnimationFrame(() => this.update())
  
      //this.applicationMode = this.guiControls.appMode;

      // Se actualizan los elementos de la escena para cada frame
      // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
      this.spotLight.intensity = this.guiControls.lightIntensity;
      
      // Se actualiza la posición de la cámara según su controlador
      this.cameraControl.update();
      
      // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
      this.renderer.render (this, this.getCamera());
    }

    onKeyPressed() {
        var tecla = event.which || event.keyCode;

        if(String.fromCharCode(tecla).toUpperCase() == "H"){
            window.alert ("Elige la acción en el menú de la derecha\nAñadir Cajas: Pulsa sobre el suelo con el botón izquierdo\nMover Cajas: Pulsa sobre una caja con le botón izquierdo y arrastra el ratón.\nLa rueda del ratón hace girar la caja actual en ambos modos.\nEl botón derecho cancela el modo actual.\nMantén pulsado Ctrl para mover la cámara");
        }
    }

    addBoxes(event, action){
      this.suelo.addBoxes(event, action);
    }

    moveBoxes(event, action){
      this.suelo.moveBoxes(event, action);
    }

    onMouseMove(event){
      if (this.mousedown) {
        switch (this.applicationMode) {
          case MyScene.ADDING_BOXES:
          case MyScene.MOVING_BOXES:
            this.moveBoxes(event, MyScene.MOVE_BOX);
          break;
          default:
            this.applicationMode = MyScene.NO_ACTION;
          break;
        }
      }
    }

    onMouseDown(event){
      if(event.ctrlKey){
        this.getCameraControl().enabled = true;
      }
      else{
        this.getCameraControl().enabled = false;
        if (event.button == 0){
          this.mousedown = true;
          switch(this.applicationMode){
            case MyScene.ADDING_BOXES:
              this.setMessage('Añadiendo cajas');
              this.addBoxes(event, MyScene.NEW_BOX);
            break;
            case MyScene.MOVING_BOXES:
              this.setMessage('Moviendo cajas');
              this.moveBoxes(event, MyScene.SELECT_BOX);
            break;
            default:
              this.applicationMode = MyScene.NO_ACTION;
              break;
          }
        }
        else {
          this.setMessage('Pulsa H para obtener ayuda');
          this.applicationMode = MyScene.NO_ACTION;
        }
      }
    }

    onMouseUp (event){
      if (this.mousedown) {
        switch(this.applicationMode){
          case MyScene.ADDING_BOXES:
            this.addBoxes(event, MyScene.END_ACTION);
          break;
          case MyScene.MOVING_BOXES:
            this.moveBoxes(event, MyScene.END_ACTION);
          break;
          default:
            this.applicationMode = MyScene.NO_ACTION;
          break;
        }
        this.mousedown = false;
      }
    }

    onMouseWheel (event){
      if (event.ctrlKey) {
        this.getCameraControl().enabled = true;
      }
      else {
        this.getCameraControl().enabled = false;
        if (this.mousedown) {
          switch (this.applicationMode) {
            case MyScene.ADDING_BOXES:
              this.moveBoxes(event, MyScene.ROTATE_BOX);
            break;
            case MyScene.MOVING_BOXES:
              this.moveBoxes(event, MyScene.ROTATE_BOX);
            break;
          }
        }
      }
    }

    setMessage (str) {
        document.getElementById("mensaje").innerHTML = str;
    }
  }
  // Acción seleccionada en el menú
  MyScene.NO_ACTION = 0;
  MyScene.ADDING_BOXES = 1;
  MyScene.MOVING_BOXES = 2;

  // Estado de la acción
  MyScene.NEW_BOX = 0;
  MyScene.MOVE_BOX = 1;
  MyScene.SELECT_BOX = 2;
  MyScene.ROTATE_BOX = 3;
  MyScene.END_ACTION = 10;
  
  /// La función   main
  $(function () {
    
    // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
    var scene = new MyScene("#WebGL-output");
  
    // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
    window.addEventListener ("resize", () => scene.onWindowResize());
    
    window.addEventListener ("keypress", () => scene.onKeyPressed());
    window.addEventListener("mousedown", (event) => scene.onMouseDown(event), true);
    window.addEventListener("mouseup", (event) => scene.onMouseUp(event), true);
    window.addEventListener("mousemove", (event) => scene.onMouseMove(event), true);
    window.addEventListener ("mousewheel", (event) => scene.onMouseWheel(event), true);   // For Chrome an others
    window.addEventListener ("DOMMouseScroll", (event) => scene.onMouseWheel(event), true); // For Firefox
    
    // Que no se nos olvide, la primera visualización.
    scene.update();
  });