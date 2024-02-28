import { useHelper } from '@react-three/drei';
import React, { useRef } from 'react'
import { DirectionalLight, DirectionalLightHelper, /*SpotLight, SpotLightHelper,*/ Vector3 } from 'three';
import Show from './Show';

interface LightProps {
  isDebug?: boolean;
  intensity?: number;
  position: Vector3;
};

const PointLight = ({
  isDebug = false,
  intensity = 1,
  position,
}: LightProps) => {
  return <>
    <Show when={isDebug}>
      <mesh position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </Show>

    <pointLight
      intensity={intensity}
      color="#e07951"
      castShadow
      shadow-mapSize-height={1024}
      shadow-mapSize-width={1024}
      position={position}
    />
  </>
};

const SpotLight = ({
  isDebug = false,
  intensity = 1,
  position,
}: LightProps) => {
  return <>
    <Show when={isDebug}>
      <mesh position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </Show>

    <spotLight
      intensity={intensity}
      color="#02f744"
      castShadow
      shadow-mapSize-height={1024}
      shadow-mapSize-width={1024}
      position={position}
    />
  </>
};

interface LightsProps {
  isDebug: boolean;
  isDay?: boolean; // is day or night ?
};

export default function Lights({
  isDebug,
  isDay = true,
}: LightsProps) {
  const dirLight = useRef<DirectionalLight>(null);

  if(isDebug) {
    // @ts-ignore
    useHelper(dirLight, DirectionalLightHelper, 1, "red");
  }

  // const sLightRef = useRef<SpotLight>(null);
  // const shadowCameraRef = useRef<Camera>(null);
  // useHelper(sLightRef, SpotLightHelper);
  // useHelper(shadowCameraRef, CameraHelper);
  
  return (
    <>
      <directionalLight
        castShadow
        position={[4, 4, 1]}
        intensity={isDay ? 1.5 : 0.1}
        shadow-mapSize={[1024, 1024]}
        //shadow-camera-near={1}
        //shadow-camera-far={10}
        //shadow-camera-top={10}
        //shadow-camera-right={10}
        //shadow-camera-bottom={-10}
        //shadow-camera-left={-10}
        ref={dirLight}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[
            -20,  // left
            20,   // right
            20,   // top
            -20   // bottom
          ]} />
      </directionalLight>

      {/* <PointLight 
        position={ new Vector3(10, 2, 5) }
        isDebug={ isDebug }
      /> */}
      
      {/* <Wrapper showPivotControls={isDebug}> */}
        {/* <SpotLight 
          position={ new Vector3(5, 2, 10) }
          isDebug={ isDebug }
          intensity={ 3 }
        /> */}
      {/* </Wrapper> */}

      {/* <spotLight
        castShadow
        ref={sLightRef}
        position={[10, 2, 5]}
        color={"#ff0000"}
        intensity={1.5}
        args={[
          "#ff0000",
          0.4,
          3, 
          Math.PI * 0.3
        ]}
        >
         <perspectiveCamera ref={shadowCameraRef} attach="shadow-camera" />
       </spotLight> */}

      <ambientLight intensity={isDay ? 0.5 : 0.3} />
    </>
  )
}
