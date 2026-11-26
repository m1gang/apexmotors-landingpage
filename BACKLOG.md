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
| H3 | Como visitante quiero ver un modelo 3D (un motor u objeto del rubro automotriz) en el hero que reaccione al mouse para sentir la precisión técnica de la marca. | ⬜ placeholder CC0 hasta conseguir modelo propio (GLB) |
| H4 | Como visitante quiero cambiar el color del modelo 3D para ver el producto en mis variantes preferidas. | ⬜ |
| H5 | Como visitante quiero dejar mis datos en un formulario para que el equipo me contacte. | ⬜ (destino de leads por definir) |
| H6 | Como visitante quiero ver videos de la marca (showroom, detalle de motor) para confiar en la calidad antes de contactar. | 🔄 placeholders (typo `grouprelative` pendiente) |
| H7 | Como visitante quiero un footer con contacto, redes y legales para tener todas las vías al pie. | ⬜ |
| H8 | Como visitante quiero una navegación vertical no convencional para sentir que la marca es audaz y distinta. | ⬜ |
| H9 | Como visitante quiero momentos creativos (cursor custom, animaciones al scroll, tipografía oversized) para recordar la marca. | ⬜ se refina al elegirla |

## Slices técnicas

- **T1** — Unificar Tailwind v4 con tokens en `@theme`. ✅
- **T2** — SVGs de logo resolviendo + copy en español. ✅
- **T3** — Re-tintado con la paleta primordial: fondo `#0B1215` (reemplaza negro puro), texto `#E1E7F5` (reemplaza blanco puro), los 3 colores registrados en `@theme` y `DESIGN.md`. ✅ (botones de play de videos → rosa de marca, intención original; token `apex-accent` eliminado por sin uso)

## Notas

- Copy de la página: **español**.
- 3D: Three.js + @react-three/fiber ya instalados; primera incursión 3D → micro-pasos cortos.
- Pendiente de Navigator: modelo 3D propio (GLB) o placeholder CC0 de motor.
- Pendiente de Navigator: re-exportar logo con texto convertido a curvas (fuente 'Dodger' no está en las máquinas de los visitantes) o decidir isotipo + texto HTML.
