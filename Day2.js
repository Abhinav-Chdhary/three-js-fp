import * as THREE from "three";
// must haves: scnene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45, //field of view
  window.innerWidth / window.innerHeight, //aspect ratio
  0.1, //near clippping
  500 //far clipping
);
camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Cube
const geometry = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Torus
const Pyramid_geometry = new THREE.TorusGeometry(5, 0.25);
const Pyramid_material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const torus3 = new THREE.Mesh(Pyramid_geometry, Pyramid_material);
const torus4 = new THREE.Mesh(Pyramid_geometry, Pyramid_material);
scene.add(torus3);
scene.add(torus4);

//Lines
const lineMaterial = new THREE.LineBasicMaterial({ color: "#ff0000" });
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(new THREE.Vector3(0, -10, 0));
points.push(new THREE.Vector3(-10, 0, 0));

const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);

torus3.rotation.x += 0.5;
//camera.position.z = 15; //moving camera initially at zero

function animate() {
  requestAnimationFrame(animate); //recursive call
  cube.rotation.x += 0.01;
  cube.rotation.y -= 0.01;
  torus3.rotation.x -= 0.01;
  torus4.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
