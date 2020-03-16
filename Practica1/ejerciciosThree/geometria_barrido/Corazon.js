class Corazon extends THREE.Object3D {
    constructor() {
      super();
  
      this.corazon = this.createCorazon();
  
      this.add(this.corazon);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
    }
  
    createCorazon(){
      var contorno = new THREE.Shape();

      contorno.bezierCurveTo(-0.5,1,-1,3,-5,5);
      contorno.bezierCurveTo(-7,6,-7.5,8,-7,9);
      contorno.bezierCurveTo(-6,12,-4,13,0,9);
      contorno.bezierCurveTo(4,13,6,12,7,9);
      contorno.bezierCurveTo(7.5,8,7,6,5,5);
      contorno.bezierCurveTo(1,3,0.5,1,0,0);

      var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 5, steps: 5, bevelSize: 1, bevelThickness: 1 };

      var geometry = new THREE.ExtrudeBufferGeometry( contorno, extrudeSettings );

      geometry.translate(0,6.5,0);

      var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color : 0xff0000}) );

      return (mesh);
    }

    
    update () {
      this.position.set(20,-20,0);
    }
  }
