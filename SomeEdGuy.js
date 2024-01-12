import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const sizes = {
  height: window.innerHeight,
  width: window.innerWidth,
};
//scene
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  500
);
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);

//light
const light = new THREE.PointLight(0xffffff, 200, 100);
light.position.set(0, 0, 10);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const lightHelper = new THREE.PointLightHelper(light);
scene.add(lightHelper);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

//Moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

//sphere
const moonGeometry = new THREE.SphereGeometry(3, 64, 64);
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
  normalMap: normalTexture,
});
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moonMesh);

//sun
// const sunGeometry = new THREE.SphereGeometry(4, 64, 64);
// const sunMesh = new THREE.Mesh(
//   sunGeometry,
//   new THREE.MeshStandardMaterial({ color: "#F3F9B1" })
// );
// sunMesh.position.z = 10;
// scene.add(sunMesh);

//resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.1;

//add stars
function addStar() {
  const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  moonMesh.rotation.y += 0.001;
  renderer.render(scene, camera);
}

animate();
