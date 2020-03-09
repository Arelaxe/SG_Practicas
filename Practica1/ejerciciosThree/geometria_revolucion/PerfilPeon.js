class PerfilPeon extends THREE.Object3D {
    constructor(){
        super();

        var ejes = this.createAxis();
        this.perfilPeon = this.createPerfilPeon();

        this.add (ejes);
        this.add(this.perfilPeon);
    }

    createAxis(){
        this.axis = new THREE.AxesHelper (5);
        this.add (this.axis);
    }

    createPerfilPeon(){
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

        var material = new THREE.MeshNormalMaterial()

        var linea = new THREE.Geometry();
        linea.vertices = points;
        var line = new THREE.Line (linea, material);

        return line;
    }

    update(){

    }
}