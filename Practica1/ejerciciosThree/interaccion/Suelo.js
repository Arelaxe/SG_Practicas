class Suelo extends THREE.Object3D {
    constructor(scene, aWidth, aDeep, aMaterial, aBoxSize) {
        super();

        this.scene = scene;
        this.width = aWidth;
        this.deep = aDeep;
        this.material = aMaterial;
        this.boxSize = aBoxSize;
        
        this.suelo = null;
        this.boxes = null;

        this.box = null;
        this.raycaster = new THREE.Raycaster ();

        var geometriaSuelo = new THREE.BoxGeometry (this.width, 0.2, this.deep, 1, 1, 1);
        geometriaSuelo.translate(0,-0.1,0);
        this.suelo = new THREE.Mesh (geometriaSuelo, this.material);
        this.suelo.receiveShadow = true;
        this.add (this.suelo);
            
        this.boxes = new THREE.Object3D();
        this.add (this.boxes);
    }

    getPointOnGround (event) {
        var mouse = this.getMouse (event);
        this.raycaster.setFromCamera (mouse, this.scene.getCamera());
        var surfaces = [this.suelo];
        var pickedObjects = this.raycaster.intersectObjects (surfaces);
        if (pickedObjects.length > 0) {
            return new THREE.Vector2 (pickedObjects[0].point.x, pickedObjects[0].point.z);
        }
        else
            return null;
    }
      
    addBoxes(event, action){
        if (action == MyScene.END_ACTION && this.box != null){
            this.box = null;
            return;
        }

        var pointOnGround = this.getPointOnGround (event);
        if (pointOnGround !== null) {
            if (action == MyScene.NEW_BOX) {
                this.box = new THREE.Mesh (
                    new THREE.BoxGeometry (this.boxSize, this.boxSize, this.boxSize),
                    new THREE.MeshPhongMaterial ({color: Math.floor (Math.random()*16777215)})); 
                this.box.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.boxSize/2, 0));
                this.box.position.x = pointOnGround.x;
                this.box.position.y = 0;
                this.box.position.z = pointOnGround.y;
                this.box.receiveShadow = true;
                this.box.castShadow = true;
                this.boxes.add (this.box);
                this.updateHeightBoxes(this.boxes.children.length-1);
            }
        }
    }

    moveBoxes(event, action){
        switch (action) {
            case MyScene.END_ACTION:
                if (this.box !== null) {
                    this.box.material.transparent = false;
                    this.box = null;
                }
            break;

            case MyScene.MOVE_BOX:
                var pointOnGround = this.getPointOnGround (event);
                if (pointOnGround !== null) {
                    if (this.box !== null) {
                        this.box.position.x = pointOnGround.x;
                    this.box.position.z = pointOnGround.y;
                    this.updateHeightBoxes(this.boxes.children.length-1);
                    }
                }
            break;

            case MyScene.SELECT_BOX :
                var mouse = this.getMouse(event);
                this.raycaster.setFromCamera(mouse, this.scene.getCamera());
                var pickedObjects = this.raycaster.intersectObjects(this.boxes.children);
                if (pickedObjects.length > 0){
                    this.box = pickedObjects[0].object;
                    this.box.material.transparent = true;
                    this.box.material.opacity = 0.5;
                    var indexOfBox = this.boxes.children.indexOf (this.box);
                    this.boxes.remove (this.box);
                    this.boxes.add(this.box);
                    this.updateHeightBoxes(indexOfBox);
                }
            break;

            case MyScene.ROTATE_BOX :
                if (this.box !== null) {
                    this.box.rotation.y += (event.wheelDelta ? event.wheelDelta/20 : -event.detail);
                }
            break;
        }
    }

    intersectBoxes (b1, b2) {
        var vectorBetweenBoxes = new THREE.Vector2();
        vectorBetweenBoxes.subVectors (new THREE.Vector2 (b1.position.x, b1.position.z),
                                        new THREE.Vector2 (b2.position.x, b2.position.z));
        return (vectorBetweenBoxes.length() < this.boxSize);
    }

    updateHeightBoxes (k) {
        for (var i = k; i < this.boxes.children.length; i++) {
            this.boxes.children[i].position.y = 0;
            for (var j = 0; j < i; j++) {
                if (this.intersectBoxes(this.boxes.children[j], this.boxes.children[i])){
                    this.boxes.children[i].position.y = this.boxes.children[j].position.y + this.boxes.children[j].geometry.parameters.height;
                }
            }
        }
    }

    getMouse (event) {
        var mouse = new THREE.Vector2 ();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
        return mouse;
    }
}