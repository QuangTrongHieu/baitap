import './Scene3D.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { useState } from 'react'

// Component cho các hình khối
function Shape({ geometry, position, color, onClick }) {
  return (
    <mesh 
      position={position} 
      onClick={onClick}
      castShadow 
      receiveShadow
    >
      {geometry}
      <meshPhysicalMaterial 
        color={color}
        metalness={0.1}
        roughness={0.2}
      />
    </mesh>
  )
}

function Scene3D() {
  const [shapes, setShapes] = useState([])
  const [selectedShape, setSelectedShape] = useState('box')

  // Các hằng số để cấu hình grid
  const SPACING = 2        // Khoảng cách giữa các hình
  const ROW_LENGTH = 5     // Số hình tối đa trên một hàng
  const GRID_START_X = -4  // Điểm bắt đầu của grid theo trục X
  const GRID_START_Z = -4  // Điểm bắt đầu của grid theo trục Z

  const addShape = () => {
    const currentIndex = shapes.length
    const row = Math.floor(currentIndex / ROW_LENGTH)
    const col = currentIndex % ROW_LENGTH

    const newShape = {
      id: Date.now(),
      type: selectedShape,
      position: [
        GRID_START_X + (col * SPACING),  // X tăng theo cột
        0.5,                               // Y luôn = 0
        GRID_START_Z + (row * SPACING)   // Z tăng theo hàng
      ],
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    }
    setShapes([...shapes, newShape])
  }

  const removeShape = (id) => {
    setShapes(shapes.filter(shape => shape.id !== id))
  }

  return (
    <div className="scene-container">
      <div className="controls-panel">
        <select 
          value={selectedShape} 
          onChange={(e) => setSelectedShape(e.target.value)}
          className="shape-select"
        >
          <option value="box">Hình hộp</option>
          <option value="sphere">Hình cầu</option>
          <option value="cylinder">Hình trụ</option>
          <option value="cone">Hình nón</option>
          <option value="pyramid">Hình chóp tam giác</option>
        </select>
        <button onClick={addShape} className="add-button">Thêm hình</button>
      </div>

      <Canvas 
        camera={{ position: [10, 10, 10], fov: 50 }}
        shadows
      >
        <color attach="background" args={['#1e1e1e']} />
        
        <ambientLight intensity={0.3} />
        
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1} 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        <pointLight position={[10, 5, 10]} intensity={0.6} />
        <pointLight position={[-10, 5, -10]} intensity={0.4} color="#b1e1ff" />

        <OrbitControls />
        
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <shadowMaterial opacity={0.2} />
        </mesh>

        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={1}
          cellColor="#6f6f6f"
          sectionSize={5}
          sectionThickness={1.5}
          sectionColor="#9d4b4b"
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={true}
        />

        {shapes.map((shape) => {
          let geometry;
          switch (shape.type) {
            case 'box':
              geometry = <boxGeometry args={[1, 1, 1]} />
              break;
            case 'sphere':
              geometry = <sphereGeometry args={[0.5, 32, 32]} />
              break;
            case 'cylinder':
              geometry = <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
              break;
            case 'cone':
              geometry = <coneGeometry args={[0.5, 1, 32]} />
              break;
            case 'pyramid':
              geometry = <coneGeometry args={[0.7, 1, 4]} />
              break;
            default:
              geometry = <boxGeometry />
          }

          return (
            <Shape
              key={shape.id}
              geometry={geometry}
              position={shape.position}
              color={shape.color}
              onClick={() => removeShape(shape.id)}
            />
          )
        })}
      </Canvas>
    </div>
  )
}

export default Scene3D
