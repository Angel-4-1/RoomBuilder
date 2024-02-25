import './style.css'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Interface from './Interface'
import { Loader, useProgress } from '@react-three/drei'
import Show from './components/Show'

const root = ReactDOM.createRoot(document.getElementById('root')!)

function App() {
  const { progress } = useProgress();
  
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
        <Show when={progress === 100}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Show>
      </Canvas>

    <Loader />

    <Show when={progress === 100}>
      <Suspense fallback={null}>
        <Interface />
      </Suspense>
    </Show>
    </>
  )
}

root.render(
  <App />
)
