import localFont from '@next/font/local'
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Header from '../components/Header'

const myFont = localFont({ src: '../assets/BlockZone.ttf' })

let renderer: THREE.WebGLRenderer,
    scene: any,
    camera: any,
    circle: THREE.Object3D<THREE.Event>,
    skelet: THREE.Object3D<THREE.Event>,
    particle: THREE.Object3D<THREE.Event>;


export default function Ticket() {
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
        // var geom = new THREE.IcosahedronGeometry(7, 12);
        const geom = new THREE.BoxGeometry(0.1, 16, 6);

        var geom2 = new THREE.IcosahedronGeometry(15, 1);

        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            // shading: THREE.FlatShading
        });

        for (var i = 0; i < 100; i++) {
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(Math.random() - 0.7, Math.random() - 0.7, Math.random() - 0.5).normalize();
            mesh.position.multiplyScalar(90 + (Math.random() * 700));
            mesh.rotation.set(Math.random() * 1, Math.random() * 1, Math.random() * 1);
            particle.add(mesh);
        }

        // var mat = new THREE.MeshPhongMaterial({
        //   color: '#000',
        //   // shading: THREE.FlatShading
        // });

        var mat = new THREE.MeshPhongMaterial({
            shininess: 60,
            map: new THREE.TextureLoader().load('./assets/silver.webp'),
            wireframe: false,
            specular: '#f1f1f1',

            flatShading: false,
            color: '#a6a6a6',
            emissive: '#000000',

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
        lights[1] = new THREE.DirectionalLight('#fff', 1);
        lights[1].position.set(0.75, 1, 0.5);
        lights[2] = new THREE.DirectionalLight('#fff', 1);
        lights[2].position.set(-0.75, -1, 0.5);
        scene.add(lights[0]);
        scene.add(lights[1]);
        scene.add(lights[2]);


        // window.addEventListener('resize', onWindowResize, false);

    };

    const canvasAnimate = () => {
        requestAnimationFrame(canvasAnimate);
        particle.rotation.x += 0.0000;
        particle.rotation.y -= 0.0040;
        circle.rotation.x -= 0.0020;
        circle.rotation.y -= 0.0030;
        skelet.rotation.x -= 0.0010;
        skelet.rotation.y += 0.0020;
        renderer.clear();
        renderer.render(scene, camera)
    };
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight*0.8);
      }
    useEffect(() => {
        canvasInit();
        canvasAnimate();
       
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, [])
    return (


        <main className={myFont.className + ' w-full h-[100vh] flex flex-col bg-[#000] overflow-hidden text-white '}>
            <div className="py-2" >
                <Header />
            </div>
            <div className="max-w-full w-full mx-auto md:flex-row min-h-screen  relative">
                <div className=' w-full absolute top-0 left-0 min-h-screen z-999'>
                    <div className="w-[1280px] h-full mx-auto mt-[8%]">
                        <div className=" w-[360px] max-x-[360px] mx-0 bg-[#0f0e0e]  md:py-10  md:px-10 rounded-2xl  text-base ">
                            <div className="w-full text-base" >
                                <h1 className='text-red py-1'>铸造</h1>
                                <h2 className='text-lg py-2'>2ndc Genesis Pass</h2>
                                <h3 className=' py-1 underline decoration-wavy text-red'>功能描述&nbsp;&nbsp;</h3>
                                <ul className='text-sm leading-[1.6rem]'>
                                    <li className='text-sm'>-功能描述文案</li>
                                    <li className='text-sm'>-功能描述文案</li>
                                    <li className='text-sm'>-功能描述文案</li>
                                    <li className='text-sm'>-功能描述文案</li>
                                </ul>
                                <h3 className=' py-2 underline decoration-wavy text-red'>当前状态&nbsp;&nbsp;</h3>
                                <p className='flex justify-between'>
                                    <span className='text-sm'>-铸造进度</span>
                                    <span>222/321</span>
                                </p>
                                <button className="py-2 mx-auto bg-white flex justify-between px-8 mt-2 text-black rounded-full">
                                    <span className='text-red'>---</span><span>0.4 E</span><span className='text-red'>---</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className=" w-full absolute z-0 top-0 left-0 h-full pointer-events-none" id="canvas"></div>

            </div>
        </main>

    )
}

