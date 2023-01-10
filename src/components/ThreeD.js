import React, { Suspense, useRef, useState, useEffect } from 'react'
import {
    Canvas,
    useFrame,
    useLoader,
    useThree,
    extend
} from '@react-three/fiber'
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

import './styles.css';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import im1 from "../assets/images/sky2.jpg";
import barrel from "../assets/models/LDT-just-Tube-colored.glb";
import yoke from "../assets/models/LDT-just-Yoke-colored.glb";
import dome_bottom from "../assets/models/LDT-Dome-base.glb";
import dome_top from "../assets/models/LDT-Dome-top.glb";
import floor from "../assets/images/lawn.jpg";
import left_shutter from "../assets/models/LDT-Dome-left-shutter.glb";
import right_shutter from "../assets/models/LDT-Dome-right-shutter.glb";



// Extend will make OrbitControls available as a JSX element
// called orbitControls for us to use.
extend({ OrbitControls });

function PWBarrel() {

    const b = useLoader(GLTFLoader, barrel)
    b.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.side = THREE.DoubleSide;
            object.material.color.set(0x080808);
            object.castShadow = true;
            // object.receiveShadow = true;
            // object.material.opacity = 0.9;
        }
    });
    return <primitive object={b.scene} position={[0, 0, 0]}
        rotation={[0 * 0.0174533, 0 * 0.0174533, 0 * 0.0174533]}
        castShadow />
}

function PWYoke() {
    const b = useLoader(GLTFLoader, yoke)
    b.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.side = THREE.DoubleSide;
            object.material.color.set(0x0f0f2f);
            // object.castShadow = true;
            object.receiveShadow = true;
            // object.material.opacity = 0.9;
        }
    });
    return <primitive object={b.scene} position={[0, -8, 0]}
        castShadow />
}

function DomeBottom() {
    const b = useLoader(GLTFLoader, dome_bottom)
    b.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.format = THREE.RGBAFormat;
            //object.material.side = THREE.DoubleSide;
            object.material.color.set(0x2f2f2f);
            // object.castShadow = true;
            object.material.transparent = true;
            object.material.opacity = 0.5;
        }
    });
    return <primitive object={b.scene} position={[0, -8, 0]}
        receiveShadow />
}

function DomeTop() {
    const b = useLoader(GLTFLoader, dome_top)
    // const xyz = new THREE.MeshStandardMaterial({
    // })
    b.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.format = THREE.RGBAFormat;
            // object.material.alphaMode = "BLEND";
            // object.material.alphaTest = 0;
            // object.material.alphaWrite = true;
            // object.material.depthWrite = false;
            object.material.color.set(0xffffff);
            // object.material.side = THREE.DoubleSide;
            // object.receiveShadow = true;
            object.material.transparent = true;
            object.material.opacity = 0.3;
        }
    });
    return <primitive object={b.scene} position={[0, -8, 0]}
        receiveShadow />
}

function DomeShutterLeft() {
    const leftS = useLoader(GLTFLoader, left_shutter)


    leftS.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.format = THREE.RGBAFormat;
            object.material.color.set(0xffffff);
            object.material.transparent = true;
            object.material.opacity = 0.3;
        }
    });

    return <primitive object={leftS.scene} position={[0, -8, -0.2]}
        receiveShadow />
}

function DomeShutterRight() {

    const rightS = useLoader(GLTFLoader, right_shutter)


    rightS.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.format = THREE.RGBAFormat;
            object.material.color.set(0xffffff);
            object.material.transparent = true;
            object.material.opacity = 0.3;
        }
    });
    return <primitive object={rightS.scene} position={[0, -8, 0.2]}
        receiveShadow />
}

/* const GetInfo = () => {
    const { gl } = useThree();
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap
    useEffect(() => {
        // gl === WebGLRenderer
        // gl.info.calls
        gl.shadowMap.enabled = true;
        console.log(gl.info);
    });
    return null;
}; */

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
        camera,
        gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame((state) => controls.current.update());
    return <orbitControls ref={controls} args={[camera, domElement]} zoomSpeed={0.1}
        rotateSpeed={0.1} />;
};

function Dome(props) {
    const domeGroup = useRef()
    const leftShutGroup = useRef()
    const rightShutGroup = useRef()
    var dome_az = props.dome_az;

    const texture = useLoader(THREE.TextureLoader, im1)

    var dome_shut = props.dome_shut;

    useFrame(state => {
        // dome_az = 0.
        domeGroup.current.rotation.y = (dome_az) * 0.0174533
        leftShutGroup.current.position.z = -0.02 + (dome_shut) * 0.033
        rightShutGroup.current.position.z = 0.02 + (dome_shut) * -0.033
    })

    const ref = useRef();
    return (
        <>
            <object3D ref={domeGroup}>
                <object3D>
                    <DomeBottom receiveShadow currentColor={"Red"} />
                </object3D>
                <object3D>
                    <DomeTop receiveShadow currentColor={"Red"} />
                </object3D>
                <object3D ref={leftShutGroup}>
                    <DomeShutterLeft receiveShadow currentColor={"Red"} />
                </object3D>
                <object3D ref={rightShutGroup}>
                    <DomeShutterRight receiveShadow currentColor={"Red"} />
                </object3D>

            </object3D>
            <object3D>
                <DomeBottom receiveShadow currentColor={"Red"} />
            </object3D>
            <object3D>
                <mesh
                    {...props}
                    ref={ref} >
                    <sphereBufferGeometry attach="geometry" args={[300, 360, 90]} />

                    <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
                </mesh>
            </object3D>
        </>
    )
}

function Telescope(props) {
    // This reference will give us direct access to the THREE.Mesh object

    // const ref = useRef()
    //const mountRef = useRef()
    //const mountRef2 = useRef()
    const floorRef = useRef()
    const cylRef = useRef()
    const group = useRef()
    const mountGroup = useRef()
    const floorGroup = useRef()

    var azimuth = props.azimuth;
    var elevation = props.elevation;

    const ftexture = useLoader(TextureLoader, floor);
    ftexture.wrapS = ftexture.wrapT = THREE.RepeatWrapping;
    ftexture.repeat.set(16, 16);
    ftexture.anisotropy = 16;

    // GetInfo()


    useFrame(state => {
        // azimuth = 180. - azimuth
        // elevation = 10.0
        group.current.position.x = 0.0
        group.current.position.y = 0.0
        group.current.position.z = 0.0
        // group.current.rotation.y = (azimuth) * 0.0174533
        group.current.rotation.z = ((elevation) - 90) * 0.0174533
        floorGroup.current.rotation.y = 0 * 0.0174533
        floorGroup.current.rotation.x = 90 * 0.0174533
        floorGroup.current.rotation.z = 0 * 0.0174533
        floorGroup.current.position.y = -7.9
        mountGroup.current.rotation.y = (azimuth) * 0.0174533
        mountGroup.current.position.y = 3.5

    })

    // const [width, setWidth] = useState(window.innerWidth);

    // Return the view, these are regular Threejs elements expressed in JSX
    return (


        <object3D>
            {/* <object3D ref={group}>
                <PWBarrel receiveShadow currentColor={"Red"} />
            </object3D> */}


            <object3D ref={mountGroup}>
                <PWYoke receiveShadow />
                <object3D ref={group}>
                    <PWBarrel receiveShadow currentColor={"Red"} />
                </object3D>
            </object3D>

            <object3D ref={floorGroup}>
                <mesh
                    ref={floorRef}
                    scale={1.0}
                    position={[10, 10, 0]} >
                    <planeGeometry args={[300, 300]} />

                    <meshStandardMaterial side={THREE.DoubleSide}
                        opacity={1.0} color={'rgb(100,100,100)'} attach="material"
                        map={ftexture} repeat={[.2, .2]} />
                </mesh>
                <mesh
                    ref={cylRef}
                    scale={1.0}
                    position={[0, 0, -2.0]}
                    rotation={[90 * 0.0174533, 0, 0]}>
                    <cylinderGeometry attach="geometry" args={[9.1, 9.1, 3, 16]} />
                    <meshBasicMaterial attach="material" color={'rgb(80,80,80)'}
                        transparent="true" opacity={0.8} />
                    {/* object.material.transparent = true;
            object.material.opacity = 0.3; */}
                </mesh>
                <mesh
                    ref={floorRef}
                    scale={1.0}
                    position={[0, 0, -0.5]} >
                    <circleGeometry args={[10, 50]} />

                    <meshStandardMaterial side={THREE.DoubleSide}
                        opacity={1.0} color={'rgb(50,60,60)'} />
                </mesh>
            </object3D>
        </object3D>

    )
}

function ThreeD({ azimuth, elevation, dome_az, dome_shut, trackOn }) {
    return (
        <div id="threedcdiv" >
            <Suspense fallback={<div>Loading... </div>}>
                <Canvas shadows colorManagement camera={{ scale: 1, fov: 75, position: [0, 0, 20] }} onCreated={({ gl }) => {
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = THREE.PCFShadowMap;
                }}>

                    <CameraControls enableZoom={false} enablePan={false} enableDamping
                        dampingFactor={20.2} autoRotate rotateSpeed={-0.5} />
                    <ambientLight
                    />
                    <directionalLight
                        intensity={0.3}
                        position={[20, 40, 30]} />
                    <pointLight
                        intensity={1}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        shadow-camera-near={0.5}
                        shadow-camera-far={500}
                        position={[-15, 40, 0]} />
                    <pointLight
                        intensity={1}
                        color={"#999999"}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[20, 40, 30]} />
                    <pointLight
                        intensity={.3}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[0, -6, 0]} />
                    <pointLight
                        intensity={.5}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[10, -5, 0]} />
                    <pointLight
                        intensity={0.5}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[-10, -5, -10]} />

                    <pointLight
                        intensity={0.5}
                        color={"#ffffff"}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[0, -4, -20]} />
                    <pointLight
                        intensity={0.5}
                        color={"#ffffff"}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        position={[20, -4, 0]} />
                    <Dome position={[0, -10.0, 0]} dome_az={dome_az} dome_shut={dome_shut} />
                    <Telescope position={[0.0, -5, 0]} azimuth={azimuth} elevation={elevation} />
                </Canvas>
            </Suspense>

        </div>
    );
}

export default ThreeD;