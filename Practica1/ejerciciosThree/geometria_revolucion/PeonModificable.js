class PeonModificable extends THREE.Object3D {
    constructor(gui,titleGui){
        super();
        
        this.createGui(gui,titleGui);

        var ejes = this.createAxis();
        this.peonModificable = this.createPeonModificable();

        this.add (ejes);
        this.add(this.peonModificable);
    }

    createGui (gui,titleGui){
        var that = this;

        this.guiControls = new function () {
            this.segmentos = 3;
            this.angulo = 0;
        }

        var folder = gui.addFolder (titleGui)

        folder.add(this.guiControls, 'segmentos',3,30,1).name ('Segmentos: ').listen()
        .onChange(function(){
            that.modifyPeon();
        });
        folder.add(this.guiControls, 'angulo',0,2*3.14,0.1).name('Ángulo: ').listen()
        .onChange(function(){
            that.modifyPeon();
        });
    }

    modifyPeon(){
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

        var peonGeom = new THREE.Mesh(new THREE.LatheGeometry (points,3,0,3.14),material);
        this.peonModificable.children[0].geometry = peonGeom;
    }

    createAxis(){
        this.axis = new THREE.AxesHelper (5);
        this.add (this.axis);
    }

    createPeonModificable(){
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

        var latheObject = new THREE.Mesh(new THREE.LatheGeometry (points,3,0,3.14),material);

        var linea = new THREE.Geometry();
        linea.vertices = points;
        var line = new THREE.Line (linea, material);

        return latheObject;
    }

    update(){
        this.position.set (10,0,0);
    }
}