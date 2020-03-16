class Diamante extends THREE.Object3D {
    constructor() {
      super();
  
      this.diamante = this.createDiamante();
  
      this.add(this.diamante);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
    }
  
    createDiamante(){
      
        var contorno = new THREE.Shape() ;

        contorno.lineTo(10,12.5) ;
        contorno.lineTo(0,25) ;
        contorno.lineTo(-10,12.5) ;
        contorno.lineTo(0,0) ;


        var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

        var geometry = new THREE.ExtrudeBufferGeometry( contorno, extrudeSettings );

        var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color : 0xff0000}) );

        return (mesh);
    }

    
    update () {
    }
  }