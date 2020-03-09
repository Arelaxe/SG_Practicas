class Toro extends THREE.Object3D{
    constructor (gui, titleGui){
        super();

    this.createGUI(gui,titleGui);
      
      var ejes = this.createAxis();
  
      this.toro = this.createToro();
  
      this.add(ejes);
      this.add(this.toro);
    }

    createGUI (gui,titleGui){
        var that = this;

        this.guiControls = new function (){
            this.mainRadius = 2.0;
            this.tubeRadius = 0.5;
            this.torusSegments = 3.0; 
            this.tubeSegments = 3.0;

        this.reset = function () {
            this.mainRadius = 2.0;
            this.tubeRadius = 0.5;
            this.torusSegments = 3.0; 
            this.tubeSegments = 3.0;

            that.remove(that.toro);
            that.toro = that.createToro();
            that.add (that.toro);
        }
    }

        var folder = gui.addFolder (titleGui)

        folder.add (this.guiControls, 'mainRadius',2.0,5.0,0.1).name ('Radio principal:').listen()
        .onChange(function(){
            that.modifyToro();
        }) ;
        folder.add (this.guiControls, 'tubeRadius',0.1,3.0,0.1).name ('Radio del tubo:').listen()
        .onChange(function(){
            that.modifyToro();
        }) ;
        folder.add (this.guiControls, 'tubeSegments',3,50,1.0).name ('Resolución del tubo:').listen()
        .onChange(function(){
            that.modifyToro();
        }) ;
        folder.add (this.guiControls, 'torusSegments',3,50,1.0).name ('Resolución del toro:').listen()
        .onChange(function(){
            that.modifyToro();
        }) ;
        folder.add (this.guiControls, 'reset').name ('[ Reset ]').onChange(
            function(){
              that.modifyToro();
        });
    }

    createAxis(){
        this.axis = new THREE.AxesHelper (5);
        this.add (this.axis);
    }

    createToro(){
        var torusGeom = new THREE.TorusGeometry (this.guiControls.mainRadius,this.guiControls.tubeRadius,this.guiControls.torusSegments,this.guiControls.tubeSegments);

        var torusMat = new THREE.MeshNormalMaterial();

        var torus = new THREE.Mesh (torusGeom, torusMat);

        var toro = new THREE.Object3D();
        toro.add(torus);

        return toro;
    }

    modifyToro(){
        var torusGeom = new THREE.TorusGeometry(this.guiControls.mainRadius,this.guiControls.tubeRadius,this.guiControls.torusSegments,this.guiControls.tubeSegments);
        this.toro.children[0].geometry = torusGeom;
    }

    update () {
      this.position.set (10,7,0);
      this.toro.rotation.y += 0.01;
      this.toro.rotation.x += 0.01;
      this.toro.rotation.z += 0.01;
    }
}