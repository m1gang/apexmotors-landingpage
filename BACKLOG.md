# Backlog — Apex Motors Landing Page

> Metodología: Vertical Slices + Pair Programming (Navigator = dueño del producto, Driver = ejecución).
> Cada historia es una entrega chiquita, probable y usable. Sin SDD, sin planificación en cascada.
> El refinamiento (criterios de aceptación, plan mínimo, out of scope) se hace recién al elegir cada historia.

## Sistema visual (fijado por Navigator)

- **Colores primordiales (si o si):** `#B83A5E` (rosa de marca) · `#E1E7F5` (claro) · `#0B1215` (fondo oscuro). Nada de negro puro ni blanco puro: el oscuro es `#0B1215` y el claro es `#E1E7F5`.
- **Tipografía:** Inter (el detector de diseño la marca como sobreusada; revisable como decisión de marca).
- **Layout:** no tradicional — navegación **vertical** (no horizontal) y momentos creativos.

## Historias de Usuario

| # | Historia | Estado |
|---|----------|--------|
| H1 | Como visitante quiero ver el logo de la marca y una propuesta de valor clara en español en el hero para entender en segundos qué es Apex Motors. | ✅ commit `0e0a527` (pendiente: wordmark con fuente 'Dodger' sin vectorizar) |
| H2 | Como visitante quiero un CTA principal en el hero que me lleve al modelo 3D para explorar el producto. | ⬜ |
| H3 | Como visitante quiero ver un modelo 3D (un motor u objeto del rubro automotriz) en el hero que reaccione al mouse para sentir la precisión técnica de la marca. | ✅ aprobada por el Navigator — hero 3D completo: GLB provisto, despiece animado, giro con drag, metal con colores originales, legibilidad nube+halos (primer avance) |
| H4 | Como visitante quiero cambiar el color del modelo 3D para ver el producto en mis variantes preferidas. | ⬜ |
| H5 | Como visitante quiero dejar mis datos en un formulario para que el equipo me contacte. | ⬜ (destino de leads por definir) |
| H6 | Como visitante quiero ver videos de la marca (showroom, detalle de motor) para confiar en la calidad antes de contactar. | 🔄 placeholders (typo `grouprelative` pendiente) |
| H7 | Como visitante quiero un footer con contacto, redes y legales para tener todas las vías al pie. | ⬜ |
| H8 | Como visitante quiero una navegación vertical no convencional para sentir que la marca es audaz y distinta. | ⬜ |
| H9 | Como visitante quiero momentos creativos (cursor custom, animaciones al scroll, tipografía oversized) para recordar la marca. | ⬜ se refina al elegirla |
| H10 | Como visitante quiero una jerarquía tipográfica cuidada (familia, tamaños y espaciados consistentes) para leer cada sección con claridad y ritmo. | ⬜ plantada por el Navigator al aprobar H3: "todavia falta mejorar la tipografia los tamaños de las letras entre otras cosas" — absorbe la decisión de marca sobre Inter (hoy marcada como sobreusada) y otros refinamientos visuales que surjan |

## Slices técnicas

- **T1** — Unificar Tailwind v4 con tokens en `@theme`. ✅
- **T2** — SVGs de logo resolviendo + copy en español. ✅
- **T3** — Re-tintado con la paleta primordial: fondo `#0B1215` (reemplaza negro puro), texto `#E1E7F5` (reemplaza blanco puro), los 3 colores registrados en `@theme` y `DESIGN.md`. ✅ (botones de play de videos → rosa de marca, intención original; token `apex-accent` eliminado por sin uso)

## Refinamiento H3 (Fase 2)

**Historia:** Como visitante quiero ver un modelo 3D (un motor u objeto del rubro automotriz) en el hero que reaccione al mouse para sentir la precisión técnica de la marca.

**Decisiones del Navigator:**
- Modelo: **Motor V8** — archivo provisto por el Navigator en `public/models/v8_engine.glb` (Sketchfab, 7.37 MB, 128 mallas, 1 material lambert2, 1 animación embebida "Take 001": despiece/ensamblado de 27 s, 331 canales sobre 127+ piezas). Reemplazable por el modelo propio definitivo cuando exista.
- Composición (CORREGIDA por el Navigator tras revisar H3-a): ~~asimétrica~~ → **3D centrado como fondo del hero, copy y logo centrados como en H1**. Segunda corrección: el velo radial opaco tapaba el motor → reemplazado por nube de legibilidad solo detrás del copy. Tercera corrección (oscuridad): luces subidas ~3× (clave 800, rim rosa 1000, relleno frontal 3, ambiente 0.5, exposure 1.35). Cuarta corrección (DEFINITIVA, orden del Navigator): la nube se percibe como fondo que oscurece modelo y letras → **QUITADA**; la legibilidad se resuelve con drop-shadow sobre el texto, sin capas visibles.
- Colores del modelo (quinta corrección, orden del Navigator: "restablecelos a como estaba en un inicio o a un color metálico"): el material original `lambert2` es difuso puro (sin especulares) — se veía plano/oscuro y las luces fuertes + tinte rosa deformaban el color. Solución: `MeshStandardMaterial` conservando la textura original del GLB (metalness 0.85, roughness 0.35, envMapIntensity 1.2) + luces neutralizadas (relleno 1.6, clave 500, rim rosa como acento sutil 350, ambiente 0.3, exposure 1.1).
- Legibilidad del texto sobre el 3D (sexta corrección, Navigator: "el texto se pierde un poco en el modelo 3d"): refuerzo SIN capas — h1 con stack de text-shadow (ceñida 0-2px + halos 18px/42px en #0B1215), logo con doble drop-shadow que abraza su forma, CTA con vidrio propio (bg-apex-dark/70 + backdrop-blur-md, control esmerilado). Séptima corrección (decisión final del Navigator: "sí, agrega un fondo como estaba antes"): **nube de legibilidad re-agregada** (apex-dark/70, blur-2xl, insets -x-6/y-10) — vista la alternativa sin fondo, el Navigator la aprueba explícitamente; halos y CTA esmerilado se conservan encima.
- Movimiento: **usar la animación embebida del GLB** (el Navigator la vio en su previsualización y la quiere) — absorbe el micro-paso H3-b.
- Interacción (aclaración del Navigator: "al hacer click sin soltar y arrastrar, hacer girar el modelo"): **girar el MODELO**, no orbitar la cámara — click sostenido + arrastre en cualquier parte del hero (también sobre el texto); giro Y libre, inclinación X acotada (±26°), inercia con decaimiento 0.95; `touch-pan-y` permite scroll vertical táctil mientras el drag horizontal gira; click simple sin arrastre no gira (el CTA sigue cliqueable).

**Criterios de Aceptación:**
- C1: El motor V8 se ve renderizado en el hero **centrado como fondo** (composición corregida por el Navigator), con copy (logo + titular + CTA) superpuesto y legible (≥ 4.5:1 sobre la nube aprobada + halos).
- C2: Si WebGL falla o el modelo tarda, el copy del hero queda completo y usable (el 3D es progresivo, nunca bloquea).
- C3: En 375px el hero apila sin overflow horizontal y con el motor en escala razonable.
- C4: La escena 3D es decorativa: aria-hidden, sin foco, sin bloquear clicks del CTA.
- C5: Paleta primordial en la escena: lienzo transparente sobre `#0B1215`, luces con rosa de marca y claro `#E1E7F5`.
- C6: El motor se auto-centra y escala por bounding box (fit consistente aunque cambie el modelo).
- C7: Build pasa, render verificado en dev y captura para revisión del Navigator.

**Plan Mínimo (micro-pasos):**
- **H3-a** ✅ — Escena 3D con GLB + luces de estudio con acento de marca + fit/centrado. Re-hecha con composición corregida (fondo centrado).
- **H3-b** ✅ — Animación embebida del GLB activada (loop 27 s despiece/ensamblado).
- **H3-c** ✅ (rehecha) — Girar el modelo: click sostenido + arrastre en todo el hero rota el grupo del modelo (Y libre, X ±26°, inercia 0.95); cursor grab/grabbing; touch-pan-y.
- **H3-d** ✅ — Colores y legibilidad finales (rondas 5-7): material metálico conservando la textura original del GLB, luces neutralizadas, nube de legibilidad re-agregada con aprobación explícita del Navigator, halos de text-shadow en titular, doble drop-shadow en logo, CTA esmerilado.

**Out of Scope:** cambiar el color del modelo (H4); nav vertical (H8); momentos creativos (H9); optimización Draco/KTX2 (recién con el modelo propio definitivo); typo `grouprelative` (H6).

## Notas

- Copy de la página: **español**.
- 3D: Three.js + @react-three/fiber ya instalados; primera incursión 3D → micro-pasos cortos.
- Pendiente de Navigator: modelo 3D propio (GLB) o placeholder CC0 de motor.
- Pendiente de Navigator: re-exportar logo con texto convertido a curvas (fuente 'Dodger' no está en las máquinas de los visitantes) o decidir isotipo + texto HTML.
