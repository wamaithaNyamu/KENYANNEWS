const scene = new THREE.Scene();
const ratio = window.innerWidth / window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(100, ratio, 0.01, 1000);
camera.position.z = 300;

document.querySelector("body").appendChild(renderer.domElement);

// Resize and update camera
window.addEventListener('resize', function (e) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Axes helper
const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);



// --- Main part, load and parse SVG
// ---------------------------------

const svgMarkup = document.querySelector('svg').outerHTML;

// SVG Loader is not a part of the main three.js bundle
// We need to load it separately, it is included in this pen's Settings > JavaScript
// https://threejs.org/docs/#examples/en/loaders/SVGLoader
const loader = new THREE.SVGLoader();
const svgData = loader.parse(svgMarkup);

// Group we'll use for all SVG paths
const svgGroup = new THREE.Group();
// When importing SVGs paths are inverted on Y axis
// it happens in the process of mapping from 2d to 3d coordinate system
svgGroup.scale.y *= -1;

const material = new THREE.MeshNormalMaterial();

// Loop through all of the parsed paths
svgData.paths.forEach((path, i) => {
    const shapes = path.toShapes(true);

    // Each path has array of shapes
    shapes.forEach((shape, j) => {
        // Finally we can take each shape and extrude it
        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 20,
            bevelEnabled: false });


        // Create a mesh and add it to the group
        const mesh = new THREE.Mesh(geometry, material);

        svgGroup.add(mesh);
    });
});

// Meshes we got are all relative to themselves
// meaning they have position set to (0, 0, 0)
// which makes centering them in the group easy

// Get group's size
const box = new THREE.Box3().setFromObject(svgGroup);
const size = new THREE.Vector3();
box.getSize(size);

const yOffset = size.y / -2;
const xOffset = size.x / -2;

// Offset all of group's elements, to center them
svgGroup.children.forEach(item => {
    item.position.x = xOffset;
    item.position.y = yOffset;
});

// Finally we add svg group to the scene
scene.add(svgGroup);



// --- Animation loop
// ------------------

function animate() {
    renderer.render(scene, camera);

    // Rotate out group
    svgGroup.rotation.y += 0.0005;

    requestAnimationFrame(animate);
}

animate();