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
| H8 | Como visitante quiero una navegación vertical no convencional para sentir que la marca es audaz y distinta. | ✔️→H11 implementada como riel vertical (patrón A); el Navigator luego eligió TotemNav como nav única — `VerticalNav.astro` eliminado |
| H9 | Como visitante quiero momentos creativos (cursor custom, animaciones al scroll, tipografía oversized) para recordar la marca. | ⬜ se refina al elegirla |
| H10 | Como visitante quiero una jerarquía tipográfica cuidada (familia, tamaños y espaciados consistentes) para leer cada sección con claridad y ritmo. | 🔄 séptima vuelta (vigente): Zen Dots (títulos) + Exo 2 (descripciones) + JetBrains Mono (auxiliar); h1 en caja normal; nube con `-z-10` — implementada y verificada, esperando revisión/commit del Navigator |
| H11 | Componente `TotemNav.astro`: navegación flotante tipo píldora con logo que se expande en vertical con resorte y muestra hasta 5 iconos con etiquetas en hover. | ✅ aprobada por el Navigator ("perfecto") — es la nav única de la página; `VerticalNav` (H8) eliminado; items = secciones reales (Inicio, Videos) |
| H12 | Como visitante quiero reconocer la pestaña del sitio entre otras (favicon con el isotipo) para identificar Apex Motors al instante. | 🔲 pendiente |

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

### H8 — Navegación vertical (patrón A: texto rotado editorial)

**Decisión del Navigator:** "en el menu vertical quiero hacer algo parecido como esta en las imagenes ... me parece innovador el navbar estilo vertical" (con 2 imágenes de referencia que el Driver no puede ver) — elección del Navigator: **A, texto rotado editorial** (nombres de sección corriendo en vertical por el borde izquierdo, rotados 90°, hover en rosa). El Navigator adelantó H8 sobre H2 (su decisión).

**Alcance:** rail fijo izquierdo (lg+) con las secciones existentes (Inicio, Videos — la lista crece cuando entren H4/H5/H7); scroll-spy con IntersectionObserver marca la sección activa en #B83A5E; click → scroll suave (`scroll-behavior: smooth` global); velo degradado para legibilidad sobre cualquier fondo (mismo patrón aprobado de la nube del hero); mobile (<lg) hamburger arriba-derecha + overlay fullscreen con links grandes.

**Criterios de Aceptación:**
- C1: Desktop (lg+): rail izquierdo fijo con secciones en texto rotado 90° (Zen Dots 11px uppercase, tracking amplio); hover → rosa; sección activa → rosa (scroll-spy al scrollear).
- C2: Click en un ítem → scroll suave hasta la sección.
- C3: Mobile (<lg): hamburger fijo arriba-derecha → overlay fullscreen oscuro con links Zen Dots 2xl; cierra con link o Escape.
- C4: No rompe el hero aprobado (H3): composición central intacta; el rail no tapa contenido (offset lg:pl-20 en videos).
- C5: Build pasa; verificación programática (scroll-spy cambia clase activa; overlay abre/cierra) + capturas desktop top/videos y mobile con menú abierto.

## Refinamiento H10 — Tipografía

**Historia:** Como visitante quiero una jerarquía tipográfica cuidada (familia, tamaños y espaciados consistentes) para leer cada sección con claridad y ritmo.

**Decisión del Navigator:**
1. "Outfit Semi Bold + Switzer Light" (Fontshare, H10-a implementada) — desechada: "no me convence la tipografía".
2. "para los titulos utilices Zen Dots, para las decripciones utilices Inter Tight, y para la letra auxiliar pone una letra estilo mono" (H10-b: Zen Dots + Inter Tight + Martian Mono) — desechada: "no me convence".
3. "ponle esta letras Títulos: Orbitron, Descripción: Exo 2, Links y texto auxiliar (mono): JetBrains Mono" (H10-c: Orbitron 600 + Exo 2 + JetBrains Mono) — desechada tras verla: "cambia la letra del titulo".
4. "cambia la letra del titulo por Michroma font" (H10-d: Michroma + Exo 2 + JetBrains Mono) — desechada: "todavia no cambia la fuente de los titulos por zen dots".
5. VIGENTE: "todavia no [convence]; cambia la fuente de los titulos por zen dots" — **Zen Dots 400** (títulos, peso único) + **Exo 2 300-500** (descripciones) + **JetBrains Mono 400-500** (auxiliar: CTA y labels), todas Google Fonts.

**Notas de adaptación:** Zen Dots no tiene pesos (400 único) → títulos sin `font-semibold` (nada de bold sintético). Es MUY ancha (~1.6× Inter) → h1 text-2xl/sm:4xl/md:5xl, h2 md:4xl, h3 2xl; titular verificado en 3 líneas sin overflow horizontal. Si el Navigator no ve cambios de fuente en su navegador: hard refresh (Ctrl+Shift+R) — el dev cachea CSS.

**Caja del h1 (vuelta 6):** "que sea el titulo del hero en minusculas y mayusculas todo esta en mayusculas has este cambio" — el copy pasa de "EL RENDIMIENTO AUTOMOTRIZ EN SU FORMA MAS PURA." a "El rendimiento automotriz en su forma más pura." (caja normal; se aplica tilde en "más" por ortografía — reversible si el Navigator pide "mas"). CTA y labels siguen en mayúsculas por clase CSS (design de botones/labels, sin cambio).

**Corrección de pintado (vuelta 7):** "el titulo del hero que este encima parece que esta detras del fondo medio oscuro como lo está el logo" — causa raíz confirmada: la nube de legibilidad es un elemento posicionado (`absolute`, z auto) y en CSS pinta por ENCIMA de todo contenido no posicionado: velaba al logo, al h1 y al CTA con `bg-apex-dark/70 blur-2xl`. A 72px caps se disimulaba; a 48px caja normal quedó evidente. Fix: `-z-10` en la nube — el copy pinta encima (nítido) y la nube sigue atenuando el motor 3D detrás del bloque (su propósito, aprobado en H3-r7). Verificación: luminancia del área del título antes/después + capturas.

**Criterios de Aceptación:**
- C1: Títulos (h1-h3) en Zen Dots 400; texto de lectura en Exo 2 300/400; CTA y labels en JetBrains Mono 500; fallbacks de sistema si el CDN falla.
- C2: Carga con `font-display: swap` (el texto nunca queda invisible esperando la fuente).
- C3: La paleta no cambia; tamaños de títulos ajustados para el ancho de Orbitron (decisión registrada arriba).
- C4: Build pasa; verificación programática de computed styles + capturas para revisión del Navigator.

**Plan Mínimo (micro-pasos):**
- **H10-a** ✅ (reemplazada) — Outfit SemiBold + Switzer Light vía Fontshare; el Navigator la desechó.
- **H10-b** ✅ (reemplazada) — Zen Dots + Inter Tight + Martian Mono vía Google Fonts; el Navigator la desechó.
- **H10-c** ✅ (reemplazada) — Orbitron + Exo 2 + JetBrains Mono vía Google Fonts; el Navigator la desechó tras verla.
- **H10-d** ✅ (reemplazada) — Michroma + Exo 2 + JetBrains Mono; el Navigator la desechó tras verla.
- **H10-e** — `--font-display` pasa a Zen Dots (peso único, sin semibold; tamaños de títulos ajustados a su ancho) + link de Google Fonts actualizado.

**Out of Scope:** redefinir tamaños por sección (se afina en revisión visual — puede abrir H10-b); self-hosting de las fuentes (refinamiento futuro); traducir captions de videos al español (va con H6).

## Notas

- Copy de la página: **español**.
- 3D: Three.js + @react-three/fiber ya instalados; primera incursión 3D → micro-pasos cortos.
- Pendiente de Navigator: modelo 3D propio (GLB) o placeholder CC0 de motor.
- Pendiente de Navigator: re-exportar logo con texto convertido a curvas (fuente 'Dodger' no está en las máquinas de los visitantes) o decidir isotipo + texto HTML.

## Refinamiento H11 — TotemNav (navegación flotante tipo tótem)

**Pedido verbatim del Navigator (2025, turno de spec completa):**

> Actúa como un desarrollador frontend senior experto en Astro, CSS moderno y microinteracciones. Crea un componente para mi landing page en Astro llamado `TotemNav.astro`. Es una navegación flotante que vive dentro de un solo botón con mi logo.
>
> **Concepto:** La página se mantiene limpia: solo se ve una píldora flotante con el logo, fija en un borde lateral de la pantalla. Al pasar el cursor (o al hacer tap en móvil), la píldora se expande en vertical con una animación tipo resorte y muestra una pila de hasta 5 iconos de navegación. Al pasar el cursor sobre cada icono, su etiqueta sale como una píldora independiente hacia el centro de la página.
>
> **Requisitos técnicos:** Astro con CSS con ámbito (`<style>` dentro del componente) y un `<script>` mínimo en vanilla JS. Sin React ni librerías de animación. Compatible con TypeScript. Define las props con una interfaz `Props`. Posición `fixed`, centrado verticalmente (`top: 50%; translate: 0 -50%`) y pegado al borde elegido, con un margen configurable (por defecto 24px). `z-index` alto.
>
> **Props:** `logo`, `logoAlt?`, `items` (máx 5, ignora extras y avisa en consola en dev), `side?` ('left'|'right', por defecto 'left'), `fill?`, `hoverBg?`, `border?`, `labelColor?`, `labelBg?` — colores como custom properties `--totem-*` vía `style` en el contenedor.
>
> **Estructura:** `<nav aria-label="Navegación principal">` → `<button>` disparador (`aria-expanded`, `aria-controls`) + `<ul>` con enlaces (icono + `<span class="label">`). Píldora: `border-radius: 999px`, superficie sólida (SIN `backdrop-filter`), borde 1px, sombra suave.
>
> **Interacción:** cerrada ≈56×56px (`grid-template-rows: 0fr` o `max-height: 0`, `opacity: 0`); apertura por `:hover`, `:focus-within` o `.is-open` con curva spring `linear(...)` + fallback `cubic-bezier(0.34, 1.56, 0.64, 1)`, ~450ms; cascada `opacity 0→1` + `translateY(-6px) scale(0.8)→0/1` con retraso `--i * 40ms` (cierre sin retraso); etiquetas como píldora independiente (padding 6×12px, `white-space: nowrap`, opacity + translateX ~8px, 200ms, `data-side` invierte dirección sin duplicar estilos); hover del icono cambia fondo a `--totem-hover` y escala 1.05.
>
> **Móvil y a11y:** `@media (hover: none)` tap alterna `.is-open`; tap fuera o Escape cierran; teclado completo (Tab abre por focus-within, foco visible, Escape devuelve foco al logo); `aria-expanded` sincronizado; nombre accesible en cada enlace; iconos `alt="" aria-hidden="true"`; `prefers-reduced-motion: reduce` = fundido corto sin rebote ni cascada; `aria-current="page"` comparando href con `Astro.url.pathname` + estilo activo sutil.
>
> **Entregables:** 1) `src/components/TotemNav.astro` completo; 2) ejemplo en `src/layouts/Layout.astro` con 5 enlaces (Inicio, Trabajo, Sobre mí, Blog, Contacto) e iconos en `/public/icons/`; 3) nota sobre colores/lado/tamaño y soporte de `linear()`/`interpolate-size`.

**Criterios de aceptación:** píldora cerrada ≈56×56; hover/focus/tap abre con rebote sutil y cascada; etiquetas hacia el centro según lado; Escape devuelve foco; aria-current en Inicio; reduced-motion sin cascada.

**Decisiones del Driver:** ejemplo montado con `side="right"` para convivir con el riel H8 (izquierda) sin superponerse y demostrar la prop — el Navigator decidirá si TotemNav reemplaza al riel. Animación de altura vía `max-height` + `calc(var(--totem-count) * 50px)` (universal) en vez de `interpolate-size` (solo Chrome 129+; en otros navegadores la transición a keyword salta en seco). Etiquetas ocultas en táctil (queda limpio; `aria-label` lleva el nombre). Iconos de ejemplo SVG propios en `/public/icons/` (los SVG de marca no se tocan; el logo se referencia con `?url`).

**Out of Scope:** decidir si reemplaza a VerticalNav (H8) — decisión del Navigator; wire a secciones reales (H4/H5/H7).

**Ronda 2 — decisión del Navigator (verbatim):** "perfecto quiero usar el totemNav coomo nav vertical el otro que hiciste antes borralo".
**Acciones:** `VerticalNav.astro` eliminado (y su render + `lg:pl-20` en `index.astro`, reemplazado por `lg:pr-28` para despejar el tótem a la derecha); items del ejemplo (Trabajo, Sobre mí, Blog, Contacto) sustituidos por las secciones reales (Inicio `/`, Videos `#videos`); iconos de ejemplo no usados eliminados, agregado `play.svg`. `scroll-behavior: smooth` de H8 se conserva (lo aprovecha `#videos`).

**Ronda 3 — refinamiento del Navigator (verbatim):** "perfecto ahora mejoremos el TotemNav elimina el icono de la casita ya que en vez de eso el logo sera un boton cambia el icono por @ISOTIPO 2.svg y tambien al hacer hover que aparezca el nombre de la seccion al costado como Inicio, Videos".
**Acciones:** el ítem Inicio/home sale del menú — el logo es ahora el botón de Inicio: nuevas props `logoHref` (navega en click de desktop; en táctil, segundo tap con menú abierto) y `logoLabel` ("Inicio" en hover del logo, con `aria-label` y `aria-current="page"` cuando coincide con la página); gatillo usa `ISOTIPO 2.svg` (Vite lo inlinea como data-URI); menú queda con 1 ítem (Videos, play.svg). Labels en hover para logo e iconos. Verificación: 20/20 PASS (incluye navegación a Inicio en desktop y segundo-tap táctil).

**Ronda 4 — refinamiento del Navigator (verbatim):** "ok mejoramoslo mas cuando presionas el icono de inicio te debe lleavaar al hero tambien agrega el texto al boton de videos al hacer hover y el icono del logo en el nvatotem hazlo mas pequeño que los iconos del navbar tengan el mismo tamaño y tambien agregale color del hover".
**Acciones:** (1) click en Inicio = volver al hero: misma página → `scrollTo` suave al top (sin recarga, respeta `prefers-reduced-motion`); otra página → navega; el foco se libera con `blur()` para que `focus-within` no deje el menú abierto tras el click. (2) Los nombres de sección ("Inicio", "Videos") aparecen mientras el tótem está abierto por hover/teclado (`.totem:hover/.focus-within/.is-open .label`), no solo sobre cada icono. (3) Isotipo a 20px = mismo tamaño que los iconos del menú. (4) El logo ahora también toma el fondo brand `#B83A5E` + escala 1.05 en hover/focus. Verificación: 23/23 PASS (incluye "vuelve al hero SIN recargar" en desktop y táctil con marker intacto).

**Ronda 5 — refinamiento del Navigator (verbatim):** "mejoras que faltan el texto al costado solo debe aparecer al hacer hover sobre el boton lo mismo con videos que todavia no aparece nada tambien quiero que cambies la letra auxiliar a IBM Plex Mono uniformiza estilo de los botones tienen que ser los mismos".
**Acciones:** (1) **Bug raíz encontrado**: `.totem__menu` tenía `overflow: hidden` y las labels de los ítems sobresalen a la izquierda del menú → quedaban **recortadas** (nunca fueron visibles; "Inicio" se veía porque su label vive en el botón, fuera del menú). Fix: `clip-path: inset(0 -160px 0 -160px)` — recorta el colapso vertical igual que antes pero deja pintar las labels a los costados. (2) Labels **solo del botón en hover/focus** (se revierte el "todas visibles al abrir" de la ronda 4). (3) Fuente auxiliar → **IBM Plex Mono 400/500** (Google Fonts + `--font-aux` + fallback del componente). (4) Botones uniformes: trigger y links comparten caja 44×44, iconos 20px, transición `background-color/scale 200ms` idéntica, hover brand + escala 1.05, foco y `aria-current` iguales. Verificación: 29/29 PASS — incluye "label Videos PINTADA" (elementFromPoint confirma que no hay clipping) y "solo la del botón en hover".

**Ronda 6 — refinamiento del Navigator (verbatim):** "ok pero ahora reemplaza por esta letra ibm plex mono por Plus Jakarta Sans me parece mejor".
**Acciones:** fuente auxiliar → **Plus Jakarta Sans 400/500** (Google Fonts + `--font-aux` con fallback sans + fallback del componente). Cero referencias a IBM Plex Mono en `src/`. Nota: es proporcional (no mono); labels y CTA conservan `uppercase` + tracking. Verificación: 29/29 PASS (labels computan "Plus Jakarta Sans" y la fuente carga), build 2.41s.

**Ronda 7 — refinamiento del Navigator (verbatim):** "regresa a ibm plex mono".
**Acciones:** revertida la fuente auxiliar a **IBM Plex Mono 400/500** (Google Fonts + `--font-aux` con fallback mono + fallback del componente). Cero referencias a Plus Jakarta Sans en `src/`. Verificación: 29/29 PASS, build 2.47s. **Decisión de tipografía auxiliar cerrada: IBM Plex Mono 400/500.**


## H12 — Favicon con el isotipo

**Pedido del Navigator (verbatim):** "quiero que pongas el favicon el logo @'APEX MOTORS/src/assets/svg/ISOTIPO 1.svg' has este cambio".

**Acciones:** `public/favicon.svg` = copia byte a byte de `ISOTIPO 1.svg` (glifo `#E1E7F5` sobre transparente; los assets de marca quedan intactos — re-sincronizar con `cp` si se re-exporta); `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` en `Layout.astro`; defaults del scaffold eliminados (`favicon.ico` de Astro y su `favicon.svg` viejo). **Verificación:** build OK; HTML servido contiene el link; `/favicon.svg` responde 200 `image/svg+xml` con el contenido del isotipo.

**Abierto para el Navigator:** el glifo es casi blanco — sobre una pestaña de navegador en tema claro queda invisible. Opción si molesta: variante de favicon con placa oscura `#0B1215` detrás del glifo (es un artefacto derivado; no toca el asset de marca).