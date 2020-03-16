class Trebol extends THREE.Object3D {
    constructor() {
      super();
  
      this.trebol = this.createTrebol();
  
      this.add(this.trebol);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
    }

    createPuntos(){
        var points = [];

        points.push (new THREE.Vector3 (0.0,0.0,0.0));
        points.push (new THREE.Vector3 (1.0,0.0,0.0));
        points.push (new THREE.Vector3 (0.5,6.0,0.0));
        points.push (new THREE.Vector3 (0.0,6.0,0.0));

        return points ;
    }
  
    createTrebol(){
        var contorno = new THREE.Shape();

        contorno.moveTo(0,2);
        
        contorno.bezierCurveTo(-1,-0.5,-4,-1,-4.5,1);
        contorno.bezierCurveTo(-2,0,-4,0,-4.5,1);
        contorno.bezierCurveTo(-5,2,-5.5,4,-1,4);
        contorno.bezierCurveTo(-4,6,-3,8,0,9);
        contorno.bezierCurveTo(3,8,4,6,1,4);
        contorno.bezierCurveTo(1,4,5.5,4,5,2);
        contorno.bezierCurveTo(4.5,1,4,0,0,2);

        var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 5, steps: 5, bevelSize: 1, bevelThickness: 1 };

        var geometry = new THREE.ExtrudeBufferGeometry( contorno, extrudeSettings );

        //geometry.translate(0,-6.5,0);

        var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color : 0x0000ff}) );

        var puntos = this.createPuntos();
        var latGeom = new THREE.LatheGeometry(puntos, 20) ;

        latGeom.translate(0,-10,0);

        var base = new THREE.Mesh(latGeom, new THREE.MeshPhongMaterial({color : 0x0000ff}));

        var group = new THREE.Group();
        group.add(mesh);
        group.add(base);
      
        return (group);
    }

    
    update () {
        //this.position.set(-20,-7.5,0);
    }
  }