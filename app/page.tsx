"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { motion } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const [step, setStep] = useState(0);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (step !== 2) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.2;
    controls.minDistance = 1;
    controls.maxDistance = 10;

    const loader = new FBXLoader();
    loader.load(
      "models/wooden-chair.fbx",
      (object) => {
        object.scale.set(0.02, 0.02, 0.02);
        object.position.set(0, -1, 0);
        scene.add(object);
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    camera.position.set(0, 2, 5);
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }, [step]);

  useEffect(() => {
    if (step === 0) {
      const leafArray = Array.from({ length: 20 }).map(() => ({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        delay: Math.random() * 5,
        size: Math.random() * 40 + 20,
      }));
      setLeaves(leafArray);
    }
  }, [step]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {step === 0 && (
        <div
          className="absolute w-full h-full flex flex-col items-center justify-center bg-cover bg-center text-white"
          style={{ backgroundImage: "url('/tree-background4.jpg')" }}
          onClick={() => setStep(1)}
        >
          <motion.h1 
            initial={{ y: -100, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ type: "spring", stiffness: 100, damping: 10, duration: 1.5 }} 
            className="text-4xl font-bold text-center"
          >
            Welcome to Thachan Mart! <br /> Touch to Begin
          </motion.h1>

        </div>
      )}
      {step === 1 && (
        <div className="absolute w-full h-full flex flex-col items-center justify-center text-white bg-black">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="loader"></div>
            <p className="mt-4 text-xl">Processing wood to craft a chair...</p>
          </motion.div>
          {setTimeout(() => setStep(2), 3000)}
        </div>
      )}
      {step === 2 && (
        <div className="relative w-full h-full">
          <div ref={containerRef} className="w-full h-full" />
          <motion.div 
            className="absolute bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md text-sm opacity-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            Use mouse to rotate, scroll to zoom, and drag to move.
          </motion.div>
        </div>
      )}

      {/* Falling Leaves Animation */}
      {step === 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {leaves.map((leaf) => (
            <motion.img
              key={leaf.id}
              src="/leaf2.png"
              alt="falling leaf"
              className="absolute"
              initial={{ y: -10, x: leaf.x, opacity: 0 }}
              animate={{ y: "100vh", opacity: 1 }}
              transition={{ duration: 5 + leaf.delay, repeat: Infinity, ease: "linear" }}
              style={{ width: `${leaf.size}px`, height: `${leaf.size}px` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}






//993819 744927 c34c24 f5ba70 1f5916 1d7d19


/// plain home page

// "use client";
// import { useState } from 'react';
// import { motion } from 'framer-motion';

// export default function Home() {
//   return (
//     <div className="bg-white text-black min-h-screen font-sans">
//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/old-man-saw.jpg)' }}>
//         <div className="text-center text-white">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ duration: 1 }}
//             className="text-5xl font-semibold tracking-wide uppercase">
//             ThachanMart
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ duration: 1.5 }}
//             className="mt-4 text-lg">
//             Handcrafted Wooden Elegance
//           </motion.p>
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             transition={{ delay: 2, duration: 1 }}
//             className="mt-6">
//             <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
//               Shop Now
//             </button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Product Showcase */}
//   a    <section className="py-20 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//         {[1, 2, 3].map((item) => (
//           <motion.div 
//             key={item} 
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//             className="bg-gray-100 p-6 rounded-lg shadow-lg">
//             <img src={`/product-${item}.jpg`} alt="Product" className="w-full h-64 object-cover rounded-lg" />
//             <h2 className="mt-4 text-xl font-semibold">Wooden Art {item}</h2>
//             <p className="text-gray-600 mt-2">Beautifully handcrafted wooden item.</p>
//             <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
//               View Details
//             </button>
//           </motion.div>
//         ))}
//       </section>
//     </div>
//   );
// }

