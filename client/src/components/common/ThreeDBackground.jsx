import { useEffect, useRef } from 'react';

const ThreeDBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Track mouse
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Center coordinates of canvas
      const cx = rect.left + width / 2;
      const cy = rect.top + height / 2;
      // Get offset from center, scaled
      mouse.targetX = (e.clientX - cx) * 0.05;
      mouse.targetY = (e.clientY - cy) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Particles
    const numParticles = 80;
    const particles = [];
    const focalLength = 300; // perspective focal length

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        z: Math.random() * 800,
        r: Math.random() * 1.5 + 1,
        color: i % 2 === 0 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(221, 214, 254, 0.6)', // white / primary-200
      });
    }

    // 3D Wireframe Objects (Cubes / Octahedrons)
    // Create vertex list for a cube
    const cubeVertices = [
      { x: -80, y: -80, z: -80 },
      { x: 80, y: -80, z: -80 },
      { x: 80, y: 80, z: -80 },
      { x: -80, y: 80, z: -80 },
      { x: -80, y: -80, z: 80 },
      { x: 80, y: -80, z: 80 },
      { x: 80, y: 80, z: 80 },
      { x: -80, y: 80, z: 80 },
    ];
    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // back face
      [4, 5], [5, 6], [6, 7], [7, 4], // front face
      [0, 4], [1, 5], [2, 6], [3, 7], // connection edges
    ];

    // Create vertex list for an Octahedron
    const octaVertices = [
      { x: 0, y: -90, z: 0 },
      { x: 90, y: 0, z: 0 },
      { x: 0, y: 0, z: -90 },
      { x: -90, y: 0, z: 0 },
      { x: 0, y: 0, z: 90 },
      { x: 0, y: 90, z: 0 },
    ];
    const octaEdges = [
      [0, 1], [0, 2], [0, 3], [0, 4], // top pyramid
      [5, 1], [5, 2], [5, 3], [5, 4], // bottom pyramid
      [1, 2], [2, 3], [3, 4], [4, 1], // middle square
    ];

    // 3D Object instances
    const mesh1 = {
      vertices: cubeVertices.map(v => ({ ...v })),
      edges: cubeEdges,
      posX: -250,
      posY: -100,
      posZ: 400,
      rotX: 0.005,
      rotY: 0.003,
      rotZ: 0.002,
      currentRotX: Math.random() * Math.PI,
      currentRotY: Math.random() * Math.PI,
      currentRotZ: 0,
      color: 'rgba(255, 255, 255, 0.08)',
    };

    const mesh2 = {
      vertices: octaVertices.map(v => ({ ...v })),
      edges: octaEdges,
      posX: 280,
      posY: 120,
      posZ: 350,
      rotX: -0.004,
      rotY: 0.006,
      rotZ: 0.001,
      currentRotX: Math.random() * Math.PI,
      currentRotY: Math.random() * Math.PI,
      currentRotZ: 0,
      color: 'rgba(196, 181, 253, 0.09)', // primary-300 tone
    };

    // Rotation math helper
    const rotateX = (point, angle) => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const y = point.y * cos - point.z * sin;
      const z = point.y * sin + point.z * cos;
      return { ...point, y, z };
    };

    const rotateY = (point, angle) => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const x = point.x * cos + point.z * sin;
      const z = -point.x * sin + point.z * cos;
      return { ...point, x, z };
    };

    const rotateZ = (point, angle) => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const x = point.x * cos - point.y * sin;
      const y = point.x * sin + point.y * cos;
      return { ...point, x, y };
    };

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Base rotations influenced by mouse
      const baseRotY = 0.001 + mouse.x * 0.0001;
      const baseRotX = 0.0005 + mouse.y * 0.0001;

      // 1. Draw and animate 3D Particles
      particles.forEach((p) => {
        // Rotate particle in Y axis (orbiting)
        let rotated = rotateY(p, baseRotY);
        rotated = rotateX(rotated, baseRotX);

        p.x = rotated.x;
        p.y = rotated.y;
        p.z = rotated.z;

        // Apply depth wrapping
        if (p.z <= -focalLength) p.z += 800;
        if (p.z > 800) p.z -= 800;

        // Projection
        const scale = focalLength / (focalLength + p.z);
        const projX = p.x * scale + width / 2;
        const projY = p.y * scale + height / 2;

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          const size = Math.max(0.2, p.r * scale);
          const opacity = Math.min(1, Math.max(0, (1 - p.z / 800) * 0.8));

          ctx.beginPath();
          ctx.arc(projX, projY, size, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(/[\d\.]+\)$/, `${opacity})`);
          ctx.fill();
        }
      });

      // 2. Draw particle connection lines (3D constellation)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Connect if they are close in 3D space
          if (dist < 120) {
            const scale1 = focalLength / (focalLength + p1.z);
            const scale2 = focalLength / (focalLength + p2.z);

            const x1 = p1.x * scale1 + width / 2;
            const y1 = p1.y * scale1 + height / 2;
            const x2 = p2.x * scale2 + width / 2;
            const y2 = p2.y * scale2 + height / 2;

            // Connection opacity depends on 3D distance and depth
            const avgZ = (p1.z + p2.z) / 2;
            const depthOpacity = Math.min(1, Math.max(0, (1 - avgZ / 800)));
            const distOpacity = (1 - dist / 120);
            const finalOpacity = distOpacity * depthOpacity * 0.15;

            if (finalOpacity > 0.01) {
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = `rgba(221, 214, 254, ${finalOpacity})`; // primary-200 connection color
              ctx.stroke();
            }
          }
        }
      }

      // 3. Draw & Animate 3D wireframe mesh objects
      const drawMesh = (mesh) => {
        mesh.currentRotX += mesh.rotX;
        mesh.currentRotY += mesh.rotY;
        mesh.currentRotZ += mesh.rotZ;

        // Project and transform vertices
        const projectedVertices = mesh.vertices.map((v) => {
          // Local rotation of the 3D model
          let p = rotateX(v, mesh.currentRotX);
          p = rotateY(p, mesh.currentRotY);
          p = rotateZ(p, mesh.currentRotZ);

          // Position the model in 3D world space (add offset position)
          // Incorporate slight mouse movement offset for interactive depth
          const worldX = p.x + mesh.posX + mouse.x * 2.5;
          const worldY = p.y + mesh.posY + mouse.y * 2.5;
          const worldZ = p.z + mesh.posZ;

          // Projection
          const scale = focalLength / (focalLength + worldZ);
          const x = worldX * scale + width / 2;
          const y = worldY * scale + height / 2;

          return { x, y, scale };
        });

        // Draw edges
        ctx.strokeStyle = mesh.color;
        ctx.lineWidth = 1;
        mesh.edges.forEach(([vStart, vEnd]) => {
          const pStart = projectedVertices[vStart];
          const pEnd = projectedVertices[vEnd];

          // Fade out based on average scale/depth
          const avgScale = (pStart.scale + pEnd.scale) / 2;
          ctx.beginPath();
          ctx.moveTo(pStart.x, pStart.y);
          ctx.lineTo(pEnd.x, pEnd.y);
          ctx.stroke();
        });
      };

      drawMesh(mesh1);
      drawMesh(mesh2);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ThreeDBackground;
