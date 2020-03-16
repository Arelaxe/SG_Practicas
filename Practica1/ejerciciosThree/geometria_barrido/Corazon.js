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

        contorno.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
        contorno.bezierCurveTo( 30, 0, 30, 35,30,35 );
        contorno.bezierCurveTo( 30, 55, 10, 77, 25, 95 );
        contorno.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
        contorno.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
        contorno.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
        
        var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

        var geometry = new THREE.ExtrudeBufferGeometry( contorno, extrudeSettings );

        var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );

        return (mesh);
    }

    
    update () {
    }
  }
