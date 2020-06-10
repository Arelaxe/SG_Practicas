 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
    constructor (myCanvas) {
      super();

      this.garaje = new Garaje();
      this.jardin = new Jardin();
      
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
     
      this.puntuacion = 0;
      this.model2 = new EscenarioDinamico(12,this.garaje,this.jardin);
      this.model3 = new Personaje();
      //this.add (this.model);
      this.add (this.model2);
      this.add (this.model3);
      this.setMessage(this.puntuacion);
      this.stats = new Stats();

      this.model3.position.y = 2.20;
      this.model3.position.z = 60;
      this.model3.position.x = -5;
      this.model3.rotateY(Math.PI/2);
      
      this.estado = MyScene.IDLE ;
      this.direccion = MyScene.IDLE ;
      this.saltos = MyScene.IDLE ;
      this.partida = MyScene.NOTSTARTED;
      this.dead = false ;

      this.stats.showPanel(0) ;
      document.body.appendChild( this.stats.dom );

      this.tiempo = Date.now();
      this.relojColisiones = Date.now();
      this.initAudio();
    }

    nuevaPartida(){
      this.puntuacion = 0;
      this.posx = -5;
      this.posy = 2.20;
      this.posz = 60;
      this.remove(this.model3);
      this.remove(this.model2);
      this.remove(this.camera);
      this.model2 = new EscenarioDinamico(12,this.garaje,this.jardin);
      this.model3 = new Personaje();
      this.add (this.model2);
      this.add (this.model3);
      this.setMessage(this.puntuacion);
      this.createCamera ();

      this.model3.position.y = 2.20;
      this.model3.position.z = 60;
      this.model3.position.x = -5;
      this.model3.rotateY(Math.PI/2);
      
      this.estado = MyScene.IDLE ;
      this.direccion = MyScene.UP ;
      this.dead = false ;

      this.tiempo = Date.now();
      this.relojColisiones = Date.now();
    }

    initAudio(){
         // instantiate a listener
         var audioListener = new THREE.AudioListener();

         // add the listener to the camera
         this.camera.add( audioListener );
 
         // instantiate audio object
         var sonido = new THREE.Audio( audioListener );
 
         // add the audio object to the scene
         this.add( sonido );
 
         // instantiate a loader
         var loader = new THREE.AudioLoader();
 
         // load a resource
         loader.load(
       // resource URL
       'audio/BlipStream.mp3',
 
       // onLoad callback
       function ( audioBuffer ) {
         // set the audio object buffer to the loaded object
         sonido.setBuffer( audioBuffer );
         sonido.setVolume(0.25);
 
         // play the audio
         sonido.play();
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
      this.camera.position.set (-20, 30, 62.5);
      // Y hacia dónde mira
      var look = new THREE.Vector3 (0,0,62.5);
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
      }
  
      // Se crea una sección para los controles de esta clase
      var folder = gui.addFolder ('Luz y Ejes');
      
      // Se le añade un control para la intensidad de la luz
      folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
      
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
      requestAnimationFrame(() => this.update());

      this.stats.begin();

      TWEEN.update();
      this.model2.update();
      this.checkCollisions();
      this.aplastar();

      // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
      var tiempo_actual = Date.now();
      var segs = (tiempo_actual-this.tiempo_camara)/1000;

      this.lookx += segs*2.5;
      var look = new THREE.Vector3 (this.lookx,0,62.5);
      this.camera.lookAt(look);
      this.cameraControl.target = look;
      this.camera.position.x += segs*2.5;
      // Se actualiza la posición de la cámara según su controlador
      this.cameraControl.update();
      this.tiempo_camara = tiempo_actual;

      // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
      this.renderer.render (this, this.getCamera());
      if (this.model2.num_linea_actual*5 <= this.model3.position.x){
        this.estado = MyScene.DEATH;
      }

      if ((this.model2.num_linea_actual-this.model2.num_lineas-4)*5 > this.model3.position.x){
        this.estado = MyScene.DEATH;
      }

      this.stats.end();
      
    }

    onKeyPressed () {
      var tecla = event.which || event.keyCode ;
      var letra = String.fromCharCode(tecla);
      if(this.partida == MyScene.STARTED && this.estado == MyScene.IDLE){
        if(letra.toUpperCase() == "W" && this.saltos != MyScene.NOTFORWARD){
          if(this.model3.position.x % 5 == 0){
            this.model3.rotation.y = Math.PI/2;
            this.direccion = MyScene.UP;
            this.puntuacion++;
            this.salto_adelante();
            this.posx += 5;
            this.setMessage(this.puntuacion);
          }
        }
        if(letra.toUpperCase() == "A" && this.saltos != MyScene.NOTLEFT && this.saltos != MyScene.NOTSIDES){
          if(this.model3.position.z % 5 == 0){
            this.model3.rotation.y = Math.PI;
            this.direccion = MyScene.LEFT;
            this.salto_izquierda();
            this.posz -= 5;
          }
        }
        if(letra.toUpperCase() == "D" && this.saltos != MyScene.NOTRIGHT && this.saltos != MyScene.NOTSIDES){
          if(this.model3.position.z % 5 == 0){
            this.model3.rotation.y = 0;
            this.salto_derecha();
            this.posz += 5;
            this.direccion = MyScene.RIGHT;
          }
        }
        if(letra.toUpperCase() == "S"){
          this.estado = MyScene.DEATH ;
          this.partida = MyScene.NOTSTARTED;
          document.getElementById("gameover").style.display = "none";
        }
    }
    else if (this.partida == MyScene.NOTSTARTED){
      if(letra.toUpperCase() == " "){
        this.partida = MyScene.STARTED;
        this.estado = MyScene.IDLE;
        document.getElementById("init").style.display = "none";
        document.getElementById("gameover").style.display = "none";
        this.nuevaPartida();
      }
    }
    }

    onKeyDown () {
      var tecla = event.which || event.keyCode ;
      var letra = String.fromCharCode(tecla);
      if(this.partida == MyScene.STARTED && this.estado == MyScene.IDLE){
        if(tecla == 38 && this.saltos != MyScene.NOTFORWARD){
          if(this.model3.position.x % 5 == 0){
            this.model3.rotation.y = Math.PI/2;
            this.direccion = MyScene.UP;
            this.puntuacion++;
            this.salto_adelante();
            this.posx += 5;
            this.setMessage(this.puntuacion);
          }
        }
        if(tecla == 37 && this.saltos != MyScene.NOTLEFT && this.saltos != MyScene.NOTSIDES){
          if(this.model3.position.z % 5 == 0){
            this.model3.rotation.y = Math.PI;
            this.direccion = MyScene.LEFT;
            this.salto_izquierda();
            this.posz -= 5;
          }
        }
        if(tecla == 39 && this.saltos != MyScene.NOTRIGHT && this.saltos != MyScene.NOTSIDES){
          if(this.model3.position.z % 5 == 0){
            this.model3.rotation.y = 0;
            this.salto_derecha();
            this.posz += 5;
            this.direccion = MyScene.RIGHT;
          }
        }
        if(tecla == 40){
          this.estado = MyScene.DEATH ;
          this.partida = MyScene.NOTSTARTED;
          document.getElementById("gameover").style.display = "none";
        }
    }
    else if (this.partida == MyScene.NOTSTARTED){
      if(letra.toUpperCase() == " "){
        this.partida = MyScene.STARTED;
        this.estado = MyScene.IDLE;
        document.getElementById("init").style.display = "none";
        document.getElementById("gameover").style.display = "none";
        this.nuevaPartida();
      }
    }
    }

    salto_adelante(){
      var origen = {x: this.posx, y: this.posy, z: this.posz};
      var mitad = {x: this.posx+2.5, y: this.posy+1.0, z: this.posz};
      var destino = {x: this.posx+5, y: this.posy, z: this.posz};
      
      var animacion1 = new TWEEN.Tween(origen).to(mitad,100);
      var animacion2 = new TWEEN.Tween(mitad).to(destino,100);
      animacion1.easing(TWEEN.Easing.Quadratic.InOut);
      animacion2.easing(TWEEN.Easing.Quadratic.InOut);
      var that = this;
      animacion1.onUpdate(function(){
        that.model3.position.x = origen.x;
        that.model3.position.y = origen.y;
      });
      animacion2.onUpdate(function(){
        that.model3.position.x = mitad.x;
        that.model3.position.y = mitad.y;
      });
      animacion1.chain(animacion2);
      animacion1.start();
    }

    salto_derecha(){
      var origen = {x: this.posx, y: this.posy, z: this.posz};
      var mitad = {x: this.posx, y: this.posy+1.0, z: this.posz+2.5};
      var destino = {x: this.posx, y: this.posy, z: this.posz+5};
      
      var animacion1 = new TWEEN.Tween(origen).to(mitad,100);
      var animacion2 = new TWEEN.Tween(mitad).to(destino,100);
      animacion1.easing(TWEEN.Easing.Quadratic.InOut);
      animacion2.easing(TWEEN.Easing.Quadratic.InOut);
      var that = this;
      animacion1.onUpdate(function(){
        that.model3.position.z = origen.z;
        that.model3.position.y = origen.y;
      });
      animacion2.onUpdate(function(){
        that.model3.position.z = mitad.z;
        that.model3.position.y = mitad.y;
      });
      animacion1.chain(animacion2);
      animacion1.start();
    }

    salto_izquierda(){
      var origen = {x: this.posx, y: this.posy, z: this.posz};
      var mitad = {x: this.posx, y: this.posy+1.0, z: this.posz-2.5};
      var destino = {x: this.posx, y: this.posy, z: this.posz-5};
      
      var animacion1 = new TWEEN.Tween(origen).to(mitad,100);
      var animacion2 = new TWEEN.Tween(mitad).to(destino,100);
      animacion1.easing(TWEEN.Easing.Quadratic.InOut);
      animacion2.easing(TWEEN.Easing.Quadratic.InOut);
      var that = this;
      animacion1.onUpdate(function(){
        that.model3.position.z = origen.z;
        that.model3.position.y = origen.y;
      });
      animacion2.onUpdate(function(){
        that.model3.position.z = mitad.z;
        that.model3.position.y = mitad.y;
      });
      animacion1.chain(animacion2);
      animacion1.start();
    }

  aplastar(){
    if (this.estado == MyScene.DEATH){
      this.dead = true;
      this.model3.scale.y = 0.01;
      this.model3.position.y = 0.3;
      this.estado = MyScene.DEAD;
      this.partida = MyScene.NOTSTARTED ;
      document.getElementById("gameover").style.display = "block";
      document.getElementById("gameover").innerHTML = "<p>Game Over</p><p>Pulsa espacio para jugar otra vez</p>Tu puntuación es: " + this.puntuacion;
    }
  }

  setMessage (str) {
    document.getElementById("msg").innerHTML = "Puntuación: "+str;
  }

  checkCollisions(){
    var posicionPersonaje = this.model3.position ;
    var rayCaster = [];
    var changed = false ;
    rayCaster.push(new THREE.Raycaster(posicionPersonaje, new THREE.Vector3(0,-1,0),0,5));
    rayCaster.push(new THREE.Raycaster(posicionPersonaje, new THREE.Vector3(0,0,1),0,2));
    rayCaster.push(new THREE.Raycaster(posicionPersonaje, new THREE.Vector3(0,0,-1),0,2));
    rayCaster.push(new THREE.Raycaster(posicionPersonaje, new THREE.Vector3(1,0,0),0,2));
    rayCaster.push(new THREE.Raycaster(posicionPersonaje, new THREE.Vector3(-1,0,0),0,2));
    var obstaculos = this.getObstaculos();
    var armas = this.getTrampas();
    for(let rayo = 0 ; rayo < rayCaster.length ; rayo++){
      if (rayo == 0) rayCaster[rayo].far = 5 ;
      else rayCaster[rayo].far = 1 ;
      for (let i=0 ; i<armas.length && this.estado != MyScene.DEATH ; i++){
        var intersecciones = rayCaster[rayo].intersectObject(armas[i],false);
        if (intersecciones.length > 0){
          this.estado = MyScene.DEATH;
        }
      }
      if (this.estado != MyScene.DEATH){
        rayCaster[rayo].far = 5 ;
        for (let i=0 ; i<obstaculos.length ; i++){
        var intersecciones = rayCaster[rayo].intersectObject(obstaculos[i],false);
        if (intersecciones.length > 0){
          switch (rayo) {
            case 3:
              changed = true;
              if (this.saltos == MyScene.NOTSIDES) this.saltos = MyScene.LOCKED;
              this.saltos = MyScene.NOTFORWARD;
              break;

            case 1:
              changed = true;
              this.saltos = MyScene.NOTRIGHT;
            break;

            case 2:
              changed = true;
              if(this.saltos == MyScene.NOTRIGHT){
                this.saltos = MyScene.NOTSIDES;
              }
              else this.saltos = MyScene.NOTLEFT;
            break;
          
            default:
              break;
          }
        }
      }
    }
  }
    if (!changed) this.saltos = MyScene.IDLE;
    this.relojColisiones = Date.now();
    }


  getObstaculos(){
    return this.model2.getObstaculos();
  }

  getTrampas(){
    return this.model2.getTrampas();
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

   //Posibilidad de salto
   MyScene.NOTFORWARD = 5;
   MyScene.NOTRIGHT = 7;
   MyScene.NOTLEFT = 11;
   MyScene.NOTSIDES = 12;
   MyScene.LOCKED = 13;
  
  /// La función   main
  $(function () {
    
    // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
    var scene = new MyScene("#WebGL-output");
  
    // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
    window.addEventListener ("resize", () => scene.onWindowResize());
    window.addEventListener("keypress", () => scene.onKeyPressed());
    window.addEventListener("keydown", () => scene.onKeyDown());
    
    // Que no se nos olvide, la primera visualización.
    scene.update();
  });