
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import * as THREE from 'three';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create a glowing sphere
    const geometry = new THREE.IcosahedronGeometry(5, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x9b87f5,
      metalness: 0.3,
      roughness: 0.5,
      emissive: 0x9b87f5,
      emissiveIntensity: 0.5,
      wireframe: true,
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x9b87f5, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Add point lights for glow effect
    const pointLight1 = new THREE.PointLight(0x1EAEDB, 2, 20);
    pointLight1.position.set(-10, 0, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xF97316, 2, 20);
    pointLight2.position.set(10, 0, 10);
    scene.add(pointLight2);
    
    // Position camera
    camera.position.z = 15;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate sphere
      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(sphere);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-20 overflow-hidden">
      {/* Background canvas for 3D animation */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      {/* Cyber grid background with overlay */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 -z-20"></div>
      
      {/* Content */}
      <div 
        ref={containerRef} 
        className="container mx-auto px-4 z-10 text-center"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-neon-pulse">
          <span className="text-cyberPurple">DEV</span>CATION
          <span className="block mt-2 text-cyberOrange">2025</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
          The ultimate cyberpunk developer conference. Join us in the digital frontier.
        </p>
        
        <div className="mb-12 font-mono text-cyberBlue">
          <p className="text-lg mb-2">May 15-18, 2025</p>
          <p className="text-lg">Neo Tokyo Convention Center</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-cyberPurple hover:bg-cyberPurple-dark text-white text-lg px-6 py-6">
            Register Now
          </Button>
          <Button variant="outline" className="border-cyberBlue text-cyberBlue hover:bg-cyberBlue/10 text-lg px-6 py-6">
            View Schedule
          </Button>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="glass-panel px-6 py-3">
            <p className="text-sm text-gray-400 font-mono">
              <span className="text-cyberOrange">{'>'}</span> Early bird registration ends in: 
              <span className="text-cyberBlue ml-2">42 days : 07 hours : 13 minutes</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white/70">Scroll to explore</span>
        <svg className="w-6 h-12 mt-2 animate-float" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
