class Esfera extends THREE.Object3D {
    constructor(radio, material, segmentos,x,y,z) {
      super();
  
      this.esfera = this.createEsfera(radio,material,segmentos,x,y,z);
      this.add(this.esfera);
    }
  
    createEsfera(radio, material, segmentos, x, y , z){
      // Un Mesh se compone de geometría y material
      var sphGeom = new THREE.SphereGeometry (radio,segmentos,segmentos);

      sphGeom.translate(x,y,z);
      
      var sphMat = material;
      
      // Ya podemos construir el Mesh
      var sphere = new THREE.Mesh (sphGeom, sphMat);
  
      var esfera = new THREE.Object3D();
      esfera.add(sphere);
  
      return esfera;
    }
    
    update () {
    }
  }