import * as THREE from "three";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, //field of view
  window.innerWidth / window.innerHeight, //aspect ratio
  0.1, //near clippping
  1000 //far clipping
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Torus
const Pyramid_geometry = new THREE.TorusGeometry(1, 0.05);
const Pyramid_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const torus1 = new THREE.Mesh(Pyramid_geometry, Pyramid_material);
const torus2 = new THREE.Mesh(Pyramid_geometry, Pyramid_material);
const torus3 = new THREE.Mesh(Pyramid_geometry, Pyramid_material);
const torus4 = new THREE.Mesh(Pyramid_geometry, Pyramid_material);
//scene.add(torus1);
//scene.add(torus2);
scene.add(torus3);
scene.add(torus4);

torus3.rotation.x += 0.5;
camera.position.z = 5; //moving camera initially at zero

function animate() {
  requestAnimationFrame(animate); //recursive call
  cube.rotation.x += 0.01;
  cube.rotation.y -= 0.01;
  torus3.rotation.x -= 0.01;
  torus4.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
