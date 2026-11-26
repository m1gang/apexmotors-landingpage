# Backlog — Apex Motors Landing Page

> Metodología: Vertical Slices + Pair Programming (Navigator = dueño del producto, Driver = ejecución).
> Cada historia es una entrega chiquita, probable y usable. Sin SDD, sin planificación en cascada.
> El refinamiento (criterios de aceptación, plan mínimo, out of scope) se hace recién al elegir cada historia.

## Historias de Usuario

| # | Historia | Estado |
|---|----------|--------|
| H1 | Como visitante quiero ver el logo de la marca y una propuesta de valor clara en español en el hero para entender en segundos qué es Apex Motors. | 🔄 avanzada (hero minimalista blanco; incluye T1 y T2) |
| H2 | Como visitante quiero un CTA principal en el hero para saber cuál es el siguiente paso. | 🔄 botón visible; falta destino |
| H3 | Como visitante quiero ver un auto en 3D en el hero que responda al mouse para sentir la precisión técnica de la marca. | ⬜ |
| H4 | Como visitante quiero cambiar el color del auto para ver el producto en mis variantes preferidas. | ⬜ |
| H5 | Como visitante quiero dejar mis datos en un formulario para que el equipo me contacte. | ⬜ |
| H6 | Como visitante quiero ver videos de la marca (showroom, detalle de motor) para confiar en la calidad antes de contactar. | 🔄 placeholders |
| H7 | Como visitante quiero un footer con contacto, redes y legales para tener todas las vías al pie. | ⬜ |

## Slices técnicas (pegadas a H1)

- **T1** — Unificar Tailwind en v4 con tokens de `DESIGN.md` (`@theme`), sacar el CDN de `Layout.astro`.
- **T2** — Resolver los SVG de logo correctamente (hoy rutas rotas: viven en `src/assets/svg/` y el código busca en `public/`).

## Notas

- Copy de la página: **español**.
- 3D: Three.js + @react-three/fiber ya instalados; primera incursión 3D → micro-pasos cortos.
- Pendiente de Navigator: modelo 3D del auto (¿propio o placeholder CC0?).
