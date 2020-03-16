class Pica extends THREE.Object3D {
    constructor() {
      super();
  
      this.pica = this.createPica();
  
      this.add(this.pica);
      
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
  
    createPica(){
        var contorno = new THREE.Shape();

        contorno.bezierCurveTo(-0.5,1,-1,3,-5,5);
        contorno.bezierCurveTo(-7,6,-7.5,8,-7,9);
        contorno.bezierCurveTo(-6,12,-4,13,0,9);
        contorno.bezierCurveTo(4,13,6,12,7,9);
        contorno.bezierCurveTo(7.5,8,7,6,5,5);
        contorno.bezierCurveTo(1,3,0.5,1,0,0);
      
        var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 5, steps: 5, bevelSize: 1, bevelThickness: 1 };

        var geometry = new THREE.ExtrudeBufferGeometry( contorno, extrudeSettings );

        geometry.translate(0,-6.5,0);
        geometry.rotateZ(Math.PI);

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
        this.position.set(20,20,0);
    }
  }