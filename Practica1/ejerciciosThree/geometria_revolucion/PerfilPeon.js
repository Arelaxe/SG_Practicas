class PerfilPeon extends THREE.Object3D {
    constructor(gui,titleGui){
        super();

        this.createGUI(gui,titleGui);

        var ejes = this.createAxis();
        var ejes2 = this.createAxis();
        var ejes3 = this.createAxis() ;
        this.perfilPeon = this.createPerfilPeon();
        this.figuraPeon = this.createFiguraPeon() ;
        this.modificablePeon = this.createPeonModificable() ;

        this.add (ejes);
        this.add (ejes2);
        this.add(this.perfilPeon);
        this.add(this.figuraPeon);
        this.add(this.modificablePeon);

        console.log(this.modificablePeon);

    }

    createAxis(){
        this.axis = new THREE.AxesHelper (5);
        this.add (this.axis);
    }

    createPuntos(){
        var points = [];

        points.push (new THREE.Vector3 (0.0,0.0,0.0));
        points.push (new THREE.Vector3 (1.0,0.0,0.0));
        points.push (new THREE.Vector3 (1.0,0.3,0.0));
        points.push (new THREE.Vector3 (0.5,0.7,0.0));
        points.push (new THREE.Vector3 (0.4,1.1,0.0));
        points.push (new THREE.Vector3 (0.4,1.9,0.0));
        points.push (new THREE.Vector3 (0.5,2.0,0.0));
        points.push (new THREE.Vector3 (0.5,2.2,0.0));
        points.push (new THREE.Vector3 (0.55,2.4,0.0));
        points.push (new THREE.Vector3 (0.5,2.6,0.0));
        points.push (new THREE.Vector3 (0.3,2.8,0.0));
        points.push (new THREE.Vector3 (0.0,2.8,0.0));

        return points ;
    }

    createPerfilPeon(){
        var puntos = this.createPuntos() ;
        var material = new THREE.MeshNormalMaterial() ;

        var linea = new THREE.Geometry();
        linea.vertices = puntos;
        var line = new THREE.Line (linea, material);

        return line;
    }

    createFiguraPeon(){
        var puntos = this.createPuntos() ;
        var material = new THREE.MeshNormalMaterial();
        var latGeom = new THREE.LatheGeometry(puntos, this.guiControls.segments) ;

        var peonRevolucion = new THREE.Mesh(latGeom, material) ;

        return peonRevolucion ;
    }

    createPeonModificable(){
        var puntos = this.createPuntos() ;
        var material = new THREE.MeshNormalMaterial();
        var latGeom = new THREE.LatheGeometry(puntos, this.guiControls.segments, 0.0, 1.0) ;

        var peonModificable = new THREE.Mesh(latGeom, material) ;

        return peonModificable ;
    }

    createGUI (gui,titleGui) {

        var that = this ;
  
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
          this.angle = 1 ;
          this.segments = 3 ;
          
          // Un botón para dejarlo todo en su posición inicial
          // Cuando se pulse se ejecutará esta función.
          this.reset = function () {
            this.angle = 1 ;
            this.segments = 3;
          }
        } 
  
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui) ;
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'segments', 3, 20, 1).name ('Resolución : ').listen()
        .onChange(function(){
          that.modifyPeon();
      }) ;
      folder.add (this.guiControls, 'angle', 0.1, 2*Math.PI, 0.1).name ('Ángulo : ').listen()
        .onChange(function(){
          that.modifyPeon();
      }) ;
        folder.add (this.guiControls, 'reset').name ('[ Reset ]').onChange(
          function(){
            that.modifyPeon();
          });
      }

      modifyPeon(){
        var latGeomFijo = new THREE.LatheGeometry(this.createPuntos(),this.guiControls.segments);
        var latGeomMovil = new THREE.LatheGeometry(this.createPuntos(),this.guiControls.segments, 0.0, this.guiControls.angle);
        this.figuraPeon.geometry = latGeomFijo;
        this.modificablePeon.geometry = latGeomMovil;
        console.log(this.figuraPeon);
      }



    //Children[0] y Children[1] son los ejes.
    update(){
        this.perfilPeon.position.set(-10,0,0) ;
        this.children[0].position.set(-10,0,0) ;
        this.figuraPeon.position.set(10,0,0) ;
        this.children[1].position.set(10,0,0) ;
    }
}