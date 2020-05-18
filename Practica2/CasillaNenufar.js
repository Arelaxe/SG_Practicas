class CasillaNenufar extends THREE.Object3D {
    constructor(x, y, z) {
      super();
  
      this.casilla = this.createCasilla(x,y,z);

      this.add(this.casilla);
    }
    
    createCasilla(x,y,z){
      var boxGeom = new THREE.BoxGeometry (4.5,0.25,4.5);

      var textura = new THREE.TextureLoader().load('imgs/nenufar.png');
      var boxMat = new THREE.MeshPhongMaterial({map:textura});
    
      var box = new THREE.Mesh (boxGeom, boxMat);

      box.position.x = x;
      box.position.y = y;
      box.position.z = z;
  
      var casilla = new THREE.Object3D();
      casilla.add(box);
  
      return casilla;
    }
    
    update () {
    }
  }