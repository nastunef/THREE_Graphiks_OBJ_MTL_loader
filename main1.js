
let SCENE;
let CAMERA;
let RENDERER;
let CSSRENDERER;
let LOADING_MANAGER;
let IMAGE_LOADER;
let OBJ_LOADER;
let MTL_Loader;
let OBJ_LOADER2;
let MTL_Loader2;
let OBJ_LOADER3;
let MTL_Loader3;
let CONTROLS;
let MOUSE;
let RAYCASTER;

const _IS_ANIMATED = Symbol('is animated');
const _IS_VISIBLE = Symbol('is visible');

main();


function main() {
    init();
    animate();
}


function init() {
    initScene();
    initCamera();
    initRenderer();
    initCSSRenderer();
    initLoaders();

    initControls();
    initRaycaster();
    //initWorld();
    initTexture();
    initCube();
    loadTexture();
    loadModel();

    initEventListeners();
    initPopups();

    document.querySelector('.canvas-container').appendChild(RENDERER.domElement);
    document.querySelector('.canvas-container').appendChild(CSSRENDERER.domElement);
}


function initScene() {
    SCENE = new THREE.Scene();
    SCENE.background = new THREE.Color (0x000000);
    initLights();
}


function initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    SCENE.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 100, 100);
    directionalLight.castShadow = true;

    directionalLight.shadow.camera.left   = -50;
    directionalLight.shadow.camera.right  =  50;
    directionalLight.shadow.camera.top    =  50;
    directionalLight.shadow.camera.bottom = -50;

    var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    SCENE.add(helper);

    SCENE.add(directionalLight);
}


function initCamera() {
    CAMERA = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    CAMERA.position.z = 100;
}


function initRenderer() {
    RENDERER = new THREE.WebGLRenderer({ alpha: true });
    RENDERER.setPixelRatio(window.devicePixelRatio);
    RENDERER.setSize(window.innerWidth, window.innerHeight);

    RENDERER.shadowMap.enabled = true;
    RENDERER.shadowMapSort = true;
}


function initCSSRenderer() {
    CSSRENDERER = new THREE.CSS3DRenderer();
    CSSRENDERER.setSize(window.innerWidth, window.innerHeight);
    CSSRENDERER.domElement.style.position = 'absolute';
    CSSRENDERER.domElement.style.top = 0;
}

function initCube() {
    var geomatry = new THREE.BoxGeometry(100,100,100);
    var material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('box_texture.jpg'), side: THREE.DoubleSide});
    var mesh = new THREE.Mesh(geomatry,material);

    mesh.position.set(0,-50, -70);
    SCENE.add(mesh);



}
function initLoaders() {
    LOADING_MANAGER = new THREE.LoadingManager();
    IMAGE_LOADER = new THREE.ImageLoader(LOADING_MANAGER);
    OBJ_LOADER = new THREE.OBJLoader(LOADING_MANAGER);
    OBJ_LOADER2 = new THREE.OBJLoader(LOADING_MANAGER);
    OBJ_LOADER3 = new THREE.OBJLoader(LOADING_MANAGER);
    MTL_Loader = new THREE.MTLLoader(LOADING_MANAGER);
    MTL_Loader2 = new THREE.MTLLoader(LOADING_MANAGER);
    MTL_Loader3 = new THREE.MTLLoader(LOADING_MANAGER);
}


function initControls() {
    CONTROLS = new THREE.OrbitControls(CAMERA);
    CONTROLS.minPolarAngle = Math.PI * 1 / 4;
    CONTROLS.maxPolarAngle = Math.PI * 3 / 4;
    CONTROLS.minDistance = 10;
    CONTROLS.maxDistance = 150;
    //CONTROLS.autoRotate = true;
    CONTROLS.autoRotateSpeed = -1.0;
    CONTROLS.update();

    MOUSE = new THREE.Vector2();
}


function initRaycaster() {
    RAYCASTER = new THREE.Raycaster();
}


function initTexture() {
    TEXTURE = new THREE.Texture();
}


function initWorld() {
    const sphere = new THREE.SphereGeometry(500, 64, 64);
    sphere.scale(-1, 1, 1);

    const texture = new THREE.Texture();

    const material = new THREE.MeshBasicMaterial({
        map: texture
    });

    IMAGE_LOADER.load('./world1.jpg', (image) => {
        texture.image = image;
        texture.needsUpdate = true;
    });

    SCENE.add(new THREE.Mesh(sphere, material));
}


function loadTexture() {
    IMAGE_LOADER.load('box_texture.jpg', (image) => {
        TEXTURE.image = image;
        TEXTURE.needsUpdate = true;
    });
}


function loadModel() {

    MTL_Loader.load('./street/Street environment_V01.mtl', (materials) => {
        materials.preload()
        OBJ_LOADER.setMaterials(materials)
        OBJ_LOADER.load('./street/Street environment_V01.obj', (object) => {
            object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            object.scale.x = 1;
            object.scale.y = 1;
            object.scale.z = 1;
            object.position.set(0,0,-70);

            SCENE.add(object)
        });
    });

        MTL_Loader2.load('./models/dog/12226_Dog_v2_l3.mtl', (materials) => {
            materials.preload()
            OBJ_LOADER2.setMaterials(materials)
            OBJ_LOADER2.load('./models/dog/12226_Dog_v2_l3.obj', (object2) => {
                object2.traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                object2.scale.x = 0.1;
                object2.scale.y = 0.1;
                object2.scale.z = 0.1;
                object2.position.set(0,0,-70);
                object2.rotateX(- Math.PI / 2 );
                object2.rotateZ( - Math.PI/4);

                SCENE.add(object2)
            });
        });
            MTL_Loader3.load('./models/cat/cat.mtl', (materials) => {
                materials.preload()
                OBJ_LOADER3.setMaterials(materials)
                OBJ_LOADER3.load('./models/cat/cat.obj', (object2) => {
                    object2.traverse(function(child) {
                        if (child instanceof THREE.Mesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    object2.scale.x = 0.1;
                    object2.scale.y = 0.1;
                    object2.scale.z = 0.1;
                    object2.position.set(-15,10,-39);
                    //object2.rotateX(- Math.PI / 2 );

                    SCENE.add(object2)
                });
            });


/*
            var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
            var plane = new THREE.Mesh( geometry, material );
            plane.position.set(0,0,0);
            plane.rotateX( - Math.PI / 2 );
            SCENE.add( plane );
            */


}


function initEventListeners() {
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    onWindowResize();
}


function onWindowResize() {
    CAMERA.aspect = window.innerWidth / window.innerHeight;
    CAMERA.updateProjectionMatrix();

    RENDERER.setSize(window.innerWidth, window.innerHeight);
    CSSRENDERER.setSize(window.innerWidth, window.innerHeight);
}


function onMouseMove(event) {
    MOUSE.x = (event.clientX / window.innerWidth) * 2 - 1;
    MOUSE.y = -(event.clientY / window.innerHeight) * 2 + 1;
}


function initPopups() {
    const popupSource = document.querySelector('.popup-3d');

    popupSource[_IS_VISIBLE] = true;

    const popup = new THREE.CSS3DObject(popupSource);

    popup.position.x = 0;
    popup.position.y = -10;
    popup.position.z = 30;
    popup.scale.x = 0.05;
    popup.scale.y = 0.05;
    popup.scale.z = 0.05;

    SCENE.add(popup);
}


function animate() {
    requestAnimationFrame(animate);
    CONTROLS.update();
    render();
}


function render() {
    CAMERA.lookAt(SCENE.position);

    RAYCASTER.setFromCamera(MOUSE, CAMERA);
    updatePopups();

    RENDERER.render(SCENE, CAMERA);
    CSSRENDERER.render(SCENE, CAMERA);
}


function updatePopups() {
    const popupSource = document.querySelector('.popup-3d');
    const angle = CONTROLS.getAzimuthalAngle();

    if (Math.abs(angle) > .9 && popupSource[_IS_VISIBLE]) {
        anime({
            targets: popupSource,
            opacity: 0,
            easing: 'easeInOutQuad'
        });
        popupSource[_IS_VISIBLE] = false;
    } else if (Math.abs(angle) < .9 && !popupSource[_IS_VISIBLE]) {
        anime({
            targets: popupSource,
            opacity: 1,
            easing: 'easeInOutQuad'
        });
        popupSource[_IS_VISIBLE] = true;
    }
}
