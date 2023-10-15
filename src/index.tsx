import './style.css'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { useProgress } from '@react-three/drei'
import Show from './components/Show'
import Interface from './Interface'

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
      >
        <Experience />
        

        {/* <Show when={progress === 100}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Show> */}
      </Canvas>

    <Interface />
    {/* <Show when={progress === 100}>
      <Interface />
    </Show> */}
    </>
  )
}

root.render(
  <App />
)
