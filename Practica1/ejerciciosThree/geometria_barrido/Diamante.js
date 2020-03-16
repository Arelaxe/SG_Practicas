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

        contorno.lineTo(5,6.25) ;
        contorno.lineTo(0,12.5) ;
        contorno.lineTo(-5,6.25) ;
        contorno.lineTo(0,0) ;


        var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 5, steps: 5, bevelSize: 1, bevelThickness: 1 };

        var geometry = new THREE.ExtrudeBufferGeometry( contorno, extrudeSettings );

        geometry.translate(0,5,0);

        var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color : 0xff0000}) );

        return (mesh);
    }

    
    update () {
      this.position.set(-20,10,0);
    }
  }