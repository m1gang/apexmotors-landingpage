import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, Environment, Lightformer, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_URL = '/models/v8_engine.glb'

// Cámara: pose por defecto del hero y pose acercada del modo exploración (H2-a)
const CAM_DEFAULT = [1.6, 0.6, 4.5]
const CAM_EXPLORE = [1.15, 0.5, 3.3]

// Dolly-in/out de cámara del modo exploración. Sin OrbitControls: la cámara
// es estática, así que el tween actualiza posición Y lookAt en cada frame.
// Con prefers-reduced-motion el cambio es directo, sin tween.
function ExploreRig({ explore }) {
  const camera = useThree((s) => s.camera)
  const tween = useRef(null)

  useEffect(() => {
    const target = explore ? CAM_EXPLORE : CAM_DEFAULT
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tween.current = null
      camera.position.set(target[0], target[1], target[2])
      camera.lookAt(0, 0, 0)
      return
    }
    tween.current = {
      from: camera.position.clone(),
      to: new THREE.Vector3(target[0], target[1], target[2]),
      start: performance.now(),
    }
  }, [explore, camera])

  useFrame(() => {
    const t = tween.current
    if (!t) return
    const p = Math.min((performance.now() - t.start) / 900, 1)
    const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
    camera.position.lerpVectors(t.from, t.to, e)
    camera.lookAt(0, 0, 0)
    if (p >= 1) tween.current = null
  })

  return null
}

// Auto-centers and scales any GLB to a consistent size (bounding-box fit),
// so swapping the placeholder for a definitive model needs no manual tuning.
// Also plays the embedded animation clip (baked exploded-view loop).
function FittedModel({ url, targetSize = 3.6, explore = false }) {
  const { scene, animations } = useGLTF(url)
  const group = useRef()
  const { actions } = useAnimations(animations, group)

  // Material metálico: el GLB trae "lambert2" (difuso puro, sin reflejos) y se ve plano/oscuro.
  // Se preserva la textura original del GLB y se le da acabado metálico estándar.
  useMemo(() => {
    const toMetal = (m) =>
      new THREE.MeshStandardMaterial({
        map: m?.map ?? null,
        color: m?.map ? 0xffffff : 0x9aa1a8,
        metalness: 0.85,
        roughness: 0.35,
        envMapIntensity: 1.2,
      })
    scene.traverse((obj) => {
      if (!obj.isMesh || obj.userData.apexMetal) return
      obj.material = Array.isArray(obj.material)
        ? obj.material.map(toMetal)
        : toMetal(obj.material)
      obj.userData.apexMetal = true
    })
  }, [scene])

  // drag-to-spin: click sostenido + arrastre gira el modelo (el Navigator lo pidió así)
  const spin = useRef({ dragging: false, lastX: 0, lastY: 0, vy: 0, vx: 0 })

  const scale = useMemo(() => {
    scene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3()).length()
    return targetSize / size
  }, [scene, targetSize])

  useEffect(() => {
    actions[animations[0]?.name]?.play()
  }, [actions, animations])

  // Modo exploración (H2-a): pausa el despiece en el frame actual;
  // al salir, la animación se reanuda desde donde quedó (nunca desde cero).
  useEffect(() => {
    const action = actions[animations[0]?.name]
    if (action) action.paused = explore
  }, [actions, animations, explore])

  // El drag se bindea a la sección del hero (id="hero") para que también
  // funcione arrastrando sobre el texto; click simple (sin mover) no gira.
  useEffect(() => {
    const section = document.getElementById('hero')
    if (!section) return
    const s = spin.current

    const onDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return
      s.dragging = true
      s.lastX = e.clientX
      s.lastY = e.clientY
      s.vy = 0
      s.vx = 0
    }
    const onMove = (e) => {
      if (!s.dragging) return
      const dx = e.clientX - s.lastX
      const dy = e.clientY - s.lastY
      s.lastX = e.clientX
      s.lastY = e.clientY
      s.vy = dx * 0.005
      s.vx = dy * 0.002
      group.current.rotation.y += dx * 0.005
      group.current.rotation.x = THREE.MathUtils.clamp(
        group.current.rotation.x + dy * 0.002,
        -0.45,
        0.45
      )
    }
    const onUp = () => {
      s.dragging = false
    }

    section.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      section.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  // inercia: sigue girando un instante tras soltar y se frena suave
  useFrame(() => {
    const s = spin.current
    if (s.dragging || !group.current) return
    s.vy *= 0.95
    s.vx *= 0.95
    group.current.rotation.y += s.vy
    group.current.rotation.x = THREE.MathUtils.clamp(
      group.current.rotation.x + s.vx,
      -0.45,
      0.45
    )
  })

  return (
    <group ref={group} scale={scale}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

export default function Hero3D() {
  const [explore, setExplore] = useState(false)

  // El CTA (script de index.astro) es la fuente del modo; la escena solo reacciona.
  useEffect(() => {
    const onExplore = (e) => setExplore(Boolean(e.detail?.active))
    window.addEventListener('apex:explore', onExplore)
    // catch-up: el modo pudo activarse antes de que la escena montara
    if (window.__apexExploreState) setExplore(true)
    return () => window.removeEventListener('apex:explore', onExplore)
  }, [])

  // marker de verificación: la escena YA está en modo exploración
  useEffect(() => {
    window.__apexExplore = explore
  }, [explore])

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: CAM_DEFAULT, fov: 38 }}
      gl={{ antialias: true, alpha: true, toneMappingExposure: 1.1 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} color="#E1E7F5" />
      {/* relleno frontal: levanta el metal sin lavar el color original */}
      <directionalLight position={[2, 3, 6]} intensity={1.6} color="#E1E7F5" />
      <spotLight
        position={[4, 6, 4]}
        angle={0.5}
        penumbra={1}
        intensity={500}
        color="#E1E7F5"
      />
      {/* rim rosa: acento de marca sutil en los bordes, sin teñir el modelo */}
      <spotLight
        position={[-6, 2, -4]}
        angle={0.6}
        penumbra={1}
        intensity={350}
        color="#B83A5E"
      />
      <Suspense fallback={null}>
        <FittedModel url={MODEL_URL} explore={explore} />
      </Suspense>
      <ExploreRig explore={explore} />
      {/* estudio generado en escena: sin dependencias de CDN externo */}
      <Environment resolution={64}>
        <Lightformer
          intensity={2.5}
          position={[0, 5, 0]}
          rotation-x={Math.PI / 2}
          scale={[8, 8, 0.5]}
          color="#E1E7F5"
        />
        <Lightformer
          intensity={3}
          position={[-5, 1, -2]}
          rotation-y={Math.PI / 2}
          scale={[6, 2, 0.5]}
          color="#B83A5E"
        />
      </Environment>
    </Canvas>
  )
}
