import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';

let container;
let camera, scene, renderer, clock;
let uniforms;


init("shader4.frag"); // Cambia este nombre para probar otros

function init(shaderPath) {
  container = document.getElementById("container");

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  const geometry = new THREE.PlaneGeometry(2, 2);


  uniforms = {
    u_time: { value: 1.0 },
    u_resolution: { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2() },
  };

  fetch(shaderPath)
    .then(res => res.text())
    .then(fragmentShader => {
      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: fragmentShader,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      onWindowResize();
      window.addEventListener("resize", onWindowResize);



    document.onmousemove = function (e) {
  uniforms.u_mouse.value.x = e.pageX * window.devicePixelRatio;
  uniforms.u_mouse.value.y = window.innerHeight * window.devicePixelRatio - e.pageY * window.devicePixelRatio;
};


      // Eventos táctiles para móviles
document.addEventListener("touchmove", function (e) {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    uniforms.u_mouse.value.x = touch.pageX * window.devicePixelRatio;
    uniforms.u_mouse.value.y = window.innerHeight * window.devicePixelRatio - touch.pageY * window.devicePixelRatio;
  }
}, { passive: true });

document.addEventListener("touchstart", () => {
  document.documentElement.requestFullscreen().catch(() => {});
}, { once: true });


document.addEventListener("touchstart", function (e) {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    uniforms.u_mouse.value.x = touch.pageX * window.devicePixelRatio;
    uniforms.u_mouse.value.y = window.innerHeight * window.devicePixelRatio - touch.pageY * window.devicePixelRatio;
  }
}, { passive: true });


      animate();
    });
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  uniforms.u_time.value += clock.getDelta();
  renderer.render(scene, camera);
}
