
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Venue = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Set up Three.js scene for 3D map
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mapContainerRef.current!.clientWidth / mapContainerRef.current!.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(mapContainerRef.current!.clientWidth, mapContainerRef.current!.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create a "city" with glowing buildings
    const cityGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cityGroup = new THREE.Group();
    
    // Create multiple buildings with different heights and positions
    const buildings = 50;
    const citySize = 30;
    
    for (let i = 0; i < buildings; i++) {
      const height = Math.random() * 5 + 0.5;
      const width = Math.random() * 1.5 + 0.5;
      const depth = Math.random() * 1.5 + 0.5;
      
      const buildingGeo = new THREE.BoxGeometry(width, height, depth);
      
      // Randomly choose color scheme for each building
      let color;
      const colorRand = Math.random();
      
      if (colorRand < 0.33) {
        color = new THREE.Color(0x9b87f5); // Purple
      } else if (colorRand < 0.66) {
        color = new THREE.Color(0x1EAEDB); // Blue
      } else {
        color = new THREE.Color(0xF97316); // Orange
      }
      
      const buildingMat = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.8,
        roughness: 0.3,
        emissive: color,
        emissiveIntensity: 0.4
      });
      
      const building = new THREE.Mesh(buildingGeo, buildingMat);
      
      // Position buildings in a grid-like pattern but with some randomness
      building.position.x = (Math.random() * citySize) - citySize / 2;
      building.position.z = (Math.random() * citySize) - citySize / 2;
      building.position.y = height / 2; // Place on "ground"
      
      cityGroup.add(building);
    }
    
    // Add a central, larger "convention center" building
    const centerGeo = new THREE.BoxGeometry(7, 8, 7);
    const centerMat = new THREE.MeshStandardMaterial({
      color: 0xF97316,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xF97316,
      emissiveIntensity: 0.6
    });
    
    const centerBuilding = new THREE.Mesh(centerGeo, centerMat);
    centerBuilding.position.y = 4; // Half height
    cityGroup.add(centerBuilding);
    
    // Add a "marker" above the convention center
    const markerGeo = new THREE.ConeGeometry(1, 2, 32);
    const markerMat = new THREE.MeshStandardMaterial({
      color: 0x9b87f5,
      emissive: 0x9b87f5,
      emissiveIntensity: 1,
    });
    
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.y = 10;
    cityGroup.add(marker);
    
    // Add "ground" plane
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1A1F2C,
      roughness: 0.8,
    });
    
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    cityGroup.add(ground);
    
    // Add "grid" lines for cyberpunk effect
    const gridHelper = new THREE.GridHelper(100, 50, 0x9b87f5, 0x9b87f5);
    gridHelper.position.y = 0.1; // Slight offset from ground
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    cityGroup.add(gridHelper);
    
    scene.add(cityGroup);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    // Add point lights for glow effect
    const pointLight1 = new THREE.PointLight(0x9b87f5, 1, 50);
    pointLight1.position.set(-20, 15, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xF97316, 1, 50);
    pointLight2.position.set(20, 15, -10);
    scene.add(pointLight2);
    
    // Position camera
    camera.position.set(30, 30, 30);
    camera.lookAt(0, 0, 0);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Slowly rotate the city
      cityGroup.rotation.y += 0.003;
      
      // Animate marker
      marker.position.y = 10 + Math.sin(Date.now() * 0.003) * 0.5;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!mapContainerRef.current || !canvasRef.current) return;
      
      camera.aspect = mapContainerRef.current.clientWidth / mapContainerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mapContainerRef.current.clientWidth, mapContainerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      cityGeometry.dispose();
      scene.remove(cityGroup);
    };
  }, []);

  return (
    <section id="venue" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid-bg opacity-10 -z-10"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyberOrange/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-cyberPurple/10 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 glow-text">
          <span className="text-cyberPurple">Venue</span> Information
        </h2>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
          Neo Tokyo Convention Center - where the digital and physical realms converge
        </p>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="cyber-box mb-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Neo Tokyo Convention Center</h3>
              <p className="text-gray-300 mb-6">
                Located in the heart of the city's innovation district, the Neo Tokyo Convention Center is a state-of-the-art facility designed specifically for tech events and digital showcases.
              </p>
              <p className="text-gray-300 mb-6">
                The venue features adaptive spaces, immersive presentation halls, and integrated technologies that create a seamless conference experience for all attendees.
              </p>
              
              <div className="space-y-4 font-mono">
                <div className="flex items-start">
                  <div className="text-cyberOrange mr-3 mt-1">📍</div>
                  <div>
                    <p className="text-white">123 Quantum Boulevard</p>
                    <p className="text-gray-400">Neo Tokyo, NT 20490</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-cyberOrange mr-3 mt-1">🌐</div>
                  <p className="text-cyberBlue">www.neotokyoconvention.com</p>
                </div>
                
                <div className="flex items-start">
                  <div className="text-cyberOrange mr-3 mt-1">📱</div>
                  <p className="text-white">+1 (800) 555-2077</p>
                </div>
              </div>
            </div>
            
            <div className="cyber-box">
              <h3 className="text-xl font-bold mb-4 text-white">Transportation</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-cyberBlue font-medium mb-2">Public Transit</h4>
                  <p className="text-gray-300">
                    The venue is directly accessible via the Neon Line subway (Central Station) and Hyperloop pods from all major transportation hubs.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-cyberBlue font-medium mb-2">Airport Shuttle</h4>
                  <p className="text-gray-300">
                    Complimentary shuttles will run every 30 minutes from Neo Tokyo International Airport to the convention center and partner hotels.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-cyberBlue font-medium mb-2">Parking</h4>
                  <p className="text-gray-300">
                    Automated parking facilities are available on-site with pre-registration required through the conference portal.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[500px] relative">
            {/* 3D Map */}
            <div 
              ref={mapContainerRef}
              className="h-full w-full rounded-lg overflow-hidden cyber-box p-0"
            >
              <canvas 
                ref={canvasRef}
                className="w-full h-full"
              />
              
              {/* Map overlay with marker info */}
              <div className="absolute top-4 left-4 glass-panel px-4 py-2 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-cyberPurple animate-glow"></div>
                  <p className="font-mono text-white text-sm">Neo Tokyo Convention Center</p>
                </div>
                <p className="text-xs text-gray-400">Interactive 3D Map</p>
              </div>
              
              {/* Controls hint */}
              <div className="absolute bottom-4 right-4 glass-panel px-3 py-1">
                <p className="text-xs text-gray-400">Map auto-rotates</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="cyber-box">
            <h3 className="text-lg font-bold mb-3 text-white">Accommodations</h3>
            <p className="text-gray-300 text-sm">
              Special conference rates available at our partner hotels within walking distance of the venue.
            </p>
            <a href="#" className="block mt-4 text-cyberBlue text-sm hover:text-cyberBlue-light">
              View Hotel Options →
            </a>
          </div>
          
          <div className="cyber-box">
            <h3 className="text-lg font-bold mb-3 text-white">Dining</h3>
            <p className="text-gray-300 text-sm">
              The venue features multiple dining options, with all-inclusive meals for conference attendees.
            </p>
            <a href="#" className="block mt-4 text-cyberBlue text-sm hover:text-cyberBlue-light">
              View Dining Information →
            </a>
          </div>
          
          <div className="cyber-box">
            <h3 className="text-lg font-bold mb-3 text-white">Accessibility</h3>
            <p className="text-gray-300 text-sm">
              The Neo Tokyo Convention Center is fully accessible with assistive technologies throughout the facility.
            </p>
            <a href="#" className="block mt-4 text-cyberBlue text-sm hover:text-cyberBlue-light">
              View Accessibility Features →
            </a>
          </div>
          
          <div className="cyber-box">
            <h3 className="text-lg font-bold mb-3 text-white">Virtual Access</h3>
            <p className="text-gray-300 text-sm">
              Can't attend in person? Experience Devcation 2025 through our immersive virtual platform.
            </p>
            <a href="#" className="block mt-4 text-cyberBlue text-sm hover:text-cyberBlue-light">
              Learn About Virtual Attendance →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
