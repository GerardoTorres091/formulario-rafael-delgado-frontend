/**
 * Configuración de Tailwind CSS para el proyecto del formulario ciudadano.
 * Se definen rutas de escaneo, una fuente personalizada y una sombra suave reutilizable.
 */

export default {
  // Rutas donde Tailwind busca clases para generar estilos
  content: [
    "./index.html", // archivo base de Vite
    "./src/**/*.{vue,js,ts,jsx,tsx}", // todos los archivos del frontend
  ],

  theme: {
    extend: {
      // Fuente principal del sistema, visualmente más limpia
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      // Sombra personalizada usada en contenedores principales
      boxShadow: {
        smooth: "0 10px 30px rgba(0,0,0,0.05)",
      },
    },
  },

  // No se agregan plugins por ahora, pero se puede extender fácil después
  plugins: [],
};