import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
console.log(OrbitControls);
// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

//initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.z = 5;
// create an orthographic camera
// const aspectRatio = window.innerWidth / window.innerHeight;

// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// );
// camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true, // enable antialiasing
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // set the pixel ratio to the device pixel ratio
const maxPixelRatio = Math.min(window.devicePixelRatio, 2); // limit the pixel ratio to 2
renderer.setPixelRatio(maxPixelRatio); // set the pixel ratio to the maximum pixel ratio
//initialize the orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.autoRotate = true; // enable auto-rotation

window.addEventListener("resize", () => {
  // update the camera aspect ratio and renderer size on window resize
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//instantiate the renderer
const renderloop = () => {
  // update the camera aspect ratio and renderer size on window resize
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // update the controls
  controls.update();
  // render the scene
  renderer.render(scene, camera);

  // call the next frame
  window.requestAnimationFrame(renderloop);
};
// start the render loop
renderloop();
