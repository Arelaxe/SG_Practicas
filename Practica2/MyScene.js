 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
    constructor (myCanvas) {
      super();
      
      // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
      this.renderer = this.createRenderer(myCanvas);
      
      // Se añade a la gui los controles para manipular los elementos de esta clase
      this.gui = this.createGUI ();
      
      // Construimos los distinos elementos que tendremos en la escena
      
      // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
      // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
      this.createLights ();
      
      // Tendremos una cámara con un control de movimiento con el ratón
      this.createCamera ();
      
      // Un suelo 
      // this.createGround ();
      
      // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
      this.axis = new THREE.AxesHelper (5);
      this.add (this.axis);
      
      
      // Por último creamos el modelo.
      // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
      // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
      //this.model = new Coche();
      //this.model.position.set(0,0,0);
      //this.model.scale.x = 0.25;
      //this.model.scale.y = 0.25;
      //this.model.scale.z = 0.25;
      this.puntuacion = 0;
      this.model2 = new EscenarioDinamico(10);
      this.model3 = new Personaje();
      //this.add (this.model);
      this.add (this.model2);
      this.add (this.model3);
      this.setMessage(this.puntuacion);

      this.model3.position.y = 2.20;
      this.estado = MyScene.IDLE ;
      this.direccion = MyScene.IDLE ;
      this.partida = MyScene.NOTSTARTED;
      this.dead = false ;

      this.tiempo = Date.now();
      this.initAudio();
    }

    nuevaPartida(){
      this.puntuacion = 0;
      this.remove(this.model3);
      this.remove(this.model2);
      this.remove(this.camera);
      this.model2 = new EscenarioDinamico(10);
      this.model3 = new Personaje();
      //this.add (this.model);
      this.add (this.model2);
      this.add (this.model3);
      this.setMessage(this.puntuacion);
      this.createCamera ();

      this.model3.position.y = 2.20;
      this.estado = MyScene.IDLE ;
      this.direccion = MyScene.IDLE ;
      this.dead = false ;

      this.tiempo = Date.now();
    }

    initAudio(){
         // instantiate a listener
         var audioListener = new THREE.AudioListener();

         // add the listener to the camera
         this.camera.add( audioListener );
 
         // instantiate audio object
         var oceanAmbientSound = new THREE.Audio( audioListener );
 
         // add the audio object to the scene
         this.add( oceanAmbientSound );
 
         // instantiate a loader
         var loader = new THREE.AudioLoader();
 
         // load a resource
         loader.load(
       // resource URL
       'audio/BlipStream.mp3',
 
       // onLoad callback
       function ( audioBuffer ) {
         // set the audio object buffer to the loaded object
         oceanAmbientSound.setBuffer( audioBuffer );
 
         // play the audio
         oceanAmbientSound.play();
       },
 
       // onProgress callback
       function ( xhr ) {
         console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
       },
 
       // onError callback
       function ( err ) {
         console.log( 'An error happened' );
       }
     );
    }


    
    createCamera () {
      // Para crear una cámara le indicamos
      //   El ángulo del campo de visión en grados sexagesimales
      //   La razón de aspecto ancho/alto
      //   Los planos de recorte cercano y lejano
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      // También se indica dónde se coloca
      this.camera.position.set (-20, 40, 25);
      // Y hacia dónde mira
      var look = new THREE.Vector3 (0,0,25);
      this.lookx = 0;
      this.camera.lookAt(look);
      this.add (this.camera);
      this.tiempo_camara = Date.now();
      
      // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
      this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
      // Se configuran las velocidades de los movimientos
      this.cameraControl.rotateSpeed = 5;
      this.cameraControl.zoomSpeed = -2;
      this.cameraControl.panSpeed = 0.5;
      // Debe orbitar con respecto al punto de mira de la cámara
      this.cameraControl.target = look;
    }
    
    createGround () {
      // El suelo es un Mesh, necesita una geometría y un material.
      
      // La geometría es una caja con muy poca altura
      var geometryGround = new THREE.BoxGeometry (50,0.2,50);
      
      // El material se hará con una textura de madera
      var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
      var materialGround = new THREE.MeshPhongMaterial ({map: texture});
      
      // Ya se puede construir el Mesh
      var ground = new THREE.Mesh (geometryGround, materialGround);
      
      // Todas las figuras se crean centradas en el origen.
      // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
      ground.position.y = -0.1;
      
      // Que no se nos olvide añadirlo a la escena, que en este caso es  this
      this.add (ground);
    }
    
    createGUI () {
      // Se crea la interfaz gráfica de usuario
      var gui = new dat.GUI();
      
      // La escena le va a añadir sus propios controles. 
      // Se definen mediante una   new function()
      // En este caso la intensidad de la luz y si se muestran o no los ejes
      this.guiControls = new function() {
        // En el contexto de una función   this   alude a la función
        this.lightIntensity = 0.8;
        this.axisOnOff = true;
      }
  
      // Se crea una sección para los controles de esta clase
      var folder = gui.addFolder ('Luz y Ejes');
      
      // Se le añade un control para la intensidad de la luz
      folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
      
      // Y otro para mostrar u ocultar los ejes
      folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');
      
      return gui;
    }
    
    createLights () {
      var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
      this.add( directionalLight );
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
      // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
      // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
      requestAnimationFrame(() => this.update())

      // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
      var tiempo_actual = Date.now();
      var segs = (tiempo_actual-this.tiempo_camara)/1000;

      this.lookx += segs*2.5;
      var look = new THREE.Vector3 (this.lookx,0,25);
      this.camera.lookAt(look);
      this.cameraControl.target = look;
      this.camera.position.x += segs*2.5;
      // Se actualiza la posición de la cámara según su controlador
      this.cameraControl.update();
      this.tiempo_camara = tiempo_actual;

      // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
      this.renderer.render (this, this.getCamera());
  
      // Se actualizan los elementos de la escena para cada frame
      // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
      //this.spotLight.intensity = this.guiControls.lightIntensity;
      
      // Se muestran o no los ejes según lo que idique la GUI
      this.axis.visible = this.guiControls.axisOnOff;
      
      // Se actualiza el resto del modelo
      //this.model.update();
      this.model2.update();
      this.checkCollisions();
      this.saltar();
      this.aplastar();
      
    }

    onKeyPressed () {
      var tecla = event.which || event.keyCode ;
      var letra = String.fromCharCode(tecla);
      if(this.partida == MyScene.STARTED){
      if(tecla == 38 || letra.toUpperCase() == "W"){
        this.estado = MyScene.JUMP ;
        this.direccion = MyScene.UP ;
        this.puntuacion++;
        this.setMessage(this.puntuacion);
      }
      if(tecla == 37 || letra.toUpperCase() == "A"){
        this.estado = MyScene.JUMP ;
        this.direccion = MyScene.LEFT ;
      }
      if(tecla == 39 || letra.toUpperCase() == "D"){
        this.estado = MyScene.JUMP ;
        this.direccion = MyScene.RIGHT ;
      }
      if(tecla == 40 || letra.toUpperCase() == "S"){
        this.estado = MyScene.DEATH ;
        this.partida = MyScene.NOTSTARTED;
        document.getElementById("gameover").style.display = "none";
      }
    }
    else if (this.partida == MyScene.NOTSTARTED){
      if(letra.toUpperCase() == " "){
        this.partida = MyScene.STARTED;
        document.getElementById("init").style.display = "none";
        document.getElementById("gameover").style.display = "none";
        this.nuevaPartida();
      }
    }
    }

    saltar(){
      var distancia = 250 ;
      var tiempototal = 250 ;
      var velocidad = distancia/tiempototal ;
      if(this.estado == MyScene.JUMP){
          this.tiempo = Date.now();
          this.estado = MyScene.WAIT ;
          if (this.direccion == MyScene.UP)
            this.model3.rotation.y = Math.PI/2;
          if (this.direccion == MyScene.LEFT)
            this.model3.rotation.y = Math.PI;
          if (this.direccion == MyScene.RIGHT)
            this.model3.rotation.y = 0;
       }

      if(this.estado == MyScene.WAIT && this.direccion != MyScene.IDLE){
        var time = Date.now();
        var elapsed = time-this.tiempo ;
        if(elapsed < tiempototal){
          if(this.direccion == MyScene.UP){
            if (elapsed < tiempototal/2) {
                this.model3.position.y += elapsed/tiempototal;
                this.model3.position.x += velocidad * elapsed/tiempototal;
            } else {
                this.model3.position.y -= elapsed/tiempototal;
                this.model3.position.x += velocidad * elapsed/tiempototal;
            }
          }
          if(this.direccion == MyScene.LEFT){
            if (elapsed < tiempototal/2) {
              this.model3.position.y += elapsed/tiempototal;
              this.model3.position.z -= velocidad * elapsed/tiempototal;
          } else {
              this.model3.position.y -= elapsed/tiempototal;
              this.model3.position.z -= velocidad * elapsed/tiempototal;
          }
          }
          if(this.direccion == MyScene.RIGHT){
            if (elapsed < tiempototal/2) {
              this.model3.position.y += elapsed/tiempototal;
              this.model3.position.z += velocidad * elapsed/tiempototal;
          } else {
              this.model3.position.y -= elapsed/tiempototal;
              this.model3.position.z += velocidad * elapsed/tiempototal;
          }
          }
        }
        else{
            this.model3.position.y = 2.2 ;
            this.estado = MyScene.IDLE ;
            this.direccion = MyScene.IDLE;
        }
      }
  }

  aplastar(){
    var escala = 1 ;
    var tiempototal = 2000 ;
    var velocidad = escala/tiempototal ;
    if(this.estado ==  MyScene.DEATH){
      this.tiempo = Date.now();
      this.estado = MyScene.WAIT ;
      this.dead = true ;
    }
    if(this.estado == MyScene.WAIT && this.dead){
      var time = Date.now();
      var elapsed = time-this.tiempo ;
      if (elapsed < tiempototal)
        this.model3.scale.y = velocidad * elapsed/tiempototal ;
      else {
        this.estado = MyScene.DEAD;
        this.partida = MyScene.NOTSTARTED ;
        this.model3.position.y = 0.3 ;
        document.getElementById("gameover").style.display = "block";
      } 
    }
  }
  setMessage (str) {
    document.getElementById("msg").innerHTML = "Puntuación: "+str;
  }

  checkCollisions(){
    var posicionPersonaje = this.model3.position ;
    var rayCaster = [];
    rayCaster.push(new THREE.Raycaster(posicionPersonaje, new THREE.Vector3(0,0,1),0,1));
    rayCaster.push(new THREE.Raycaster(posicionPersonaje, new THREE.Vector3(0,0,-1),0,1));
    rayCaster.push(new THREE.Raycaster(posicionPersonaje, new THREE.Vector3(1,0,0),0,1));
    rayCaster.push(new THREE.Raycaster(posicionPersonaje, new THREE.Vector3(-1,0,0),0,1));
    var rayGeom = new THREE.Geometry();
    var obstaculos = this.getObstaculos();
    for(let rayo = 0 ; rayo < rayCaster.length ; rayo++){
      var intersecciones = rayCaster[rayo].intersectObjects(obstaculos,true);
      if (intersecciones.length > 0){
        /*rayGeom.vertices.push(posicionPersonaje);
        rayGeom.vertices.push(intersecciones[0].point);
  
        this.remove(line);
        var line = new THREE.Line(rayGeom,new THREE.LineBasicMaterial({color:0x00ffbb}));
        this.add(line);*/
        this.estado = MyScene.DEATH;
      }
    }
    }

  getObstaculos(){
    return this.model2.getObstaculos();
  }
}

  //Estados
  MyScene.WAIT = -1;
  MyScene.IDLE = 0 ;
  MyScene.JUMP = 1;
  MyScene.DEATH = 2 ;
  MyScene.DEAD = 3 ;

  //Direcciones (Comparto Idle por ser Nulo)
  MyScene.LEFT = 4 ;
  MyScene.RIGHT = 6 ;
  MyScene.UP = 8 ;

  //Estado de la partida
  MyScene.NOTSTARTED = 9;
  MyScene.STARTED = 10;
  
  /// La función   main
  $(function () {
    
    // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
    var scene = new MyScene("#WebGL-output");
  
    // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
    window.addEventListener ("resize", () => scene.onWindowResize());
    window.addEventListener("keypress", () => scene.onKeyPressed());
    window.addEventListener("keydown", () => scene.onKeyPressed());
    
    // Que no se nos olvide, la primera visualización.
    scene.update();
  });