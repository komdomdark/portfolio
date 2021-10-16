import './style.css'

import * as THREE from 'three';
import { GridHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.TorusKnotGeometry( 10, 2, 115, 15)
const material = new THREE.MeshStandardMaterial( { color: 0x955 } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)
torus.position.z = -20;
torus.position.x = -20;
torus.position.y = 10;


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(2,0,200)
scene.add(pointLight)


const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  //pirmās zvaigzens
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xfffff1});
  const star = new THREE.Mesh( geometry, material );
  
  //Otrās zvaigznes
  const geometry1 = new THREE.SphereGeometry(0.2, 50, 24);
  const material1 = new THREE.MeshStandardMaterial({ color: 0x2ffff1})
  const star1 = new THREE.Mesh( geometry1, material1 );



  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  const [x1, y1, z1] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  star1.position.set(x1,y1,z1);
  scene.add(star)
  scene.add(star1)

}

Array(200).fill().forEach(addStar)

//Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//Avatar
const jurisTexture = new THREE.TextureLoader().load('Juris.jpg')

const juris = new THREE.Mesh(
  new THREE.BoxGeometry(12,20,12),
  new THREE.MeshBasicMaterial( { map: jurisTexture})
);

scene.add(juris);
juris.position.x = 20
juris.position.z = -20

// Earth

const earthTexture = new THREE.TextureLoader().load('earth.jpg')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6, 64, 64),
  new THREE.MeshStandardMaterial( {
    map: earthTexture,
  })
);
scene.add(earth);

//earth position
earth.position.z =30;
earth.position.setX(-10);
earth.position.y = -10

//camera movement
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.01;
  earth.rotation.y += 0.03;
  earth.rotation.z += 0.002;

  juris.rotation.y += 0.05;

  

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera


function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.005
  torus.rotation.y += 0.01
  torus.rotation.z += 0.003

  controls.update();

  renderer.render( scene, camera );
}

animate()