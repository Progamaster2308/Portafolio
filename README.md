# Crónicas de Bryan

Portafolio profesional convertido en una experiencia MMORPG medieval oscura. El jugador explora un mundo cenital por casillas, descubre aptitudes, combate guardianes y desbloquea proyectos enlazados a GitHub.

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Controles

- `WASD` o flechas: movimiento por casillas.
- `E`: interactuar con santuarios y cofres.
- Clic sobre un enemigo cercano: ataque automático.
- `C`: abrir o cerrar el grimorio del personaje.
- `Esc`: cerrar paneles.

## Estructura

- `src/scenes/PortfolioScene.js`: mundo, movimiento, combate, partículas y minimapa.
- `src/data/projects.json`: proyectos, tecnologías y enlaces de GitHub.
- `src/data/skills.json`: atributos y árbol técnico.
- `src/data/world.js`: santuarios, enemigos y configuración del mapa.
- `src/ui.js`: HUD, grimorio y modales.
- `src/styles.css`: interfaz medieval responsive.

## Proyectos incluidos

Los datos de Frieren Delivery, Dandadan Express, Chickencitos y Grúas Pino se encuentran en `src/data/projects.json`. Cada entrada puede incluir el sitio publicado y, cuando corresponde, el repositorio de GitHub.
