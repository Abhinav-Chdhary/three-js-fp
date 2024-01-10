import * as THREE from "three";
import "./style.css";

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
  100
);
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);
//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

//light
const light = new THREE.PointLight(0xffffff, 50, 100);
light.position.set(0, 10, 10);
scene.add(light);

//sphere
const sphereGeometery = new THREE.SphereGeometry(3, 64, 64);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: "#00ff83" });
const sphereMesh = new THREE.Mesh(sphereGeometery, sphereMaterial);
scene.add(sphereMesh);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

//resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
});
