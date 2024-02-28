import './style.css'
import React
 from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Interface from './Interface'

const root = ReactDOM.createRoot(document.getElementById('root')!)

function App() {  
  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Experience />
      </Canvas>

      <Interface />
    </>
  )
}

root.render(
  <App />
)