class FiguraPeon extends THREE.Object3D{
    constructor(){
        super() ;

        var ejes = this.createAxis(); 
        this.peon = this.createPeonRevolucion();
        this.peo

        this.add(ejes) ;
        this.add(this.peon) ;
    }

    createAxis(){
        this.axis = new THREE.AxesHelper (5);
        this.add (this.axis);
    }

    createPeonRevolucion(){
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

        var material = new THREE.MeshNormalMaterial();
        var latGeom = new THREE.LatheGeometry(points, 20) ;

        var peonRevolucion = new THREE.Mesh(latGeom, material) ;

        return peonRevolucion ;
    }

    update(){
        this.position.set (10,0,0) ;
    }

}