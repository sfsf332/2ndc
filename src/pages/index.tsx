


import localFont from '@next/font/local'
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Header from '../components/Header'
import { useTranslation } from "react-i18next";
import router from 'next/router';

const myFont = localFont({ src: '../assets/BlockZone.ttf' })
let renderer: THREE.WebGLRenderer,
  scene: any,
  camera: any,
  circle: THREE.Object3D<THREE.Event>,
  skelet: THREE.Object3D<THREE.Event>,
  particle: THREE.Object3D<THREE.Event>;

export default function Home() {
  const { t } = useTranslation();

  const canvasInit = () => {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    let canvasDom = document.getElementById('canvas');
    if (!canvasDom) {
      return
    } else {
      canvasDom.innerHTML = ''
      canvasDom.appendChild(renderer.domElement);
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 200;
    scene.add(camera);

    circle = new THREE.Object3D();
    skelet = new THREE.Object3D();
    particle = new THREE.Object3D();

    scene.add(circle);
    scene.add(skelet);
    scene.add(particle);

    var geometry = new THREE.TetrahedronGeometry(2, 1);
    var geom = new THREE.IcosahedronGeometry(4, 8);
    // const geom = new THREE.BoxGeometry(8, 8, 8);


    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      // shading: THREE.FlatShading
    });

    for (var i = 0; i < 1000; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      mesh.position.multiplyScalar(90 + (Math.random() * 700));
      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
      particle.add(mesh);
    }

    var mat = new THREE.MeshPhongMaterial({
      color: '#000',

    });

    var mat2 = new THREE.MeshPhongMaterial({
      wireframe: true,
      side: THREE.DoubleSide

    });

    var planet = new THREE.Mesh(geom, mat);
    planet.scale.x = planet.scale.y = planet.scale.z = 16;
    circle.add(planet);

    // var planet2 = new THREE.Mesh(geom2, mat2);
    // planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
    // skelet.add(planet2);

    var ambientLight = new THREE.AmbientLight('#000', 0.5);
    scene.add(ambientLight);

    var lights = [];
    lights[0] = new THREE.DirectionalLight('#fff', 1);
    lights[0].position.set(1, 0, 0);
    lights[1] = new THREE.DirectionalLight('#5e0101', 1);
    lights[1].position.set(0.75, 1, 0.5);
    lights[2] = new THREE.DirectionalLight('#5e0101', 1);
    lights[2].position.set(-0.75, -1, 0.5);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);


    // window.addEventListener('resize', onWindowResize, false);

  };

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  const canvasAnimate = () => {
    requestAnimationFrame(canvasAnimate);
   
    particle.rotation.x += 0.0000;
    particle.rotation.y -= 0.0040;
    circle.rotation.x -= 0.0000;
    circle.rotation.y -= 0.0030;
    skelet.rotation.x -= 0.0010;
    skelet.rotation.y += 0.0020;
    renderer.clear();
    

    renderer.render(scene, camera)
  };
  useEffect(() => {
    canvasInit();
    canvasAnimate();

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return (
    <div className="max-w-full w-full mx-auto md:flex-row min-h-screen  relative">
      <div className=' w-full absolute top-0 left-0 min-h-screen z-999'>
        <div className="w-[1280px] h-full mx-auto mt-[8%]">
          <div className=" w-[480px] mx-0 bg-[rgba(21,21,21,1)]  md:py-10  md:px-10 rounded-2xl  text-base ">
            <h1>{t('index_title')}</h1>
            <h1>{t('index_subtitle')}</h1>
            <h3>{t('index_intro')}</h3>
            <h1 className="py-4 text-red">{t('index_line')}</h1>
            <h2>{t('index_desc')}</h2>
            <h2>{t('index_desc_1')}</h2>

            <button className="py-2 bg-white px-8 mt-6 text-black rounded-full">
              <a className='hover:text-red'   onClick={() => router.push('/passport')}>{t('join_btn')}</a>
            </button>

          </div>
        </div>
      </div>
      <div className=" w-full absolute z-0 top-0 left-0 h-full pointer-events-none" id="canvas"></div>
    </div>
  )
}

