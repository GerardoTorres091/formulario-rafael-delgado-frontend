# Formulario Ciudadano - Rafael Delgado

Formulario web hecho con Vue 3 y Tailwind CSS para recopilar opiniones y necesidades de habitantes de Rafael Delgado, Veracruz.

El sistema permite que los usuarios seleccionen su colonia o barrio, expresen lo que les gusta, lo que mejorarían, y registren la necesidad más urgente de su comunidad.

---

## Tecnologías

- [Vue 3](https://vuejs.org/)
- [Tailwind CSS 3.4](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [PostgreSQL](https://www.postgresql.org/)
- Deploy: Netlify (frontend) + Render (backend)

---

## Estructura

```bash
.
├── src/
│   ├── assets/          # estilos globales (Tailwind)
│   ├── components/      # formulario principal
│   ├── App.vue          # raíz limpia, importa el formulario
│   └── main.js          # entrypoint de Vue
├── public/
├── tailwind.config.js   # configuración extendida (Inter, sombra)
├── vite.config.js
└── README.md