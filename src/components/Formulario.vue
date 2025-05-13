<template>
    <!-- Contenedor principal con fondo degradado y centrado -->
    <main class="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-6 font-sans">
        <!-- Sección del formulario con padding, sombra y borde -->
        <section
            class="bg-white rounded-3xl shadow-smooth border border-gray-200 max-w-xl sm:max-w-lg md:max-w-2xl w-full p-8 md:p-10 space-y-8">

            <!-- Encabezado del formulario -->
            <header class="text-center">
                <h1 class="text-3xl font-extrabold text-orange-600 mb-2">🧡 Formulario Ciudadano</h1>
                <p class="text-gray-600 text-sm">
                    Cuéntanos tu opinión sobre tu barrio/colonia y cómo podemos mejorar juntos.
                </p>
            </header>

            <!-- Formulario como tal -->
            <form @submit.prevent="submitForm" class="space-y-6">
                <!-- Edad y colonia se agrupan en 2 columnas desde md -->
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="label">Edad (opcional)</label>
                        <input v-model="form.edad" type="number" class="input" />
                    </div>

                    <div>
                        <label class="label">Barrio o colonia</label>
                        <!-- Select con opciones predefinidas del municipio -->
                        <select v-model="form.colonia" required class="input">
                            <option value="" disabled selected>Selecciona tu colonia o barrio</option>
                            <option>Rafael Delgado</option>
                            <option>Jalapilla</option>
                            <option>Tzoncolco</option>
                            <option>Omiquila</option>
                            <option>Las Sirenas</option>
                            <option>Hacienda de Jalapilla</option>
                            <option>Barrio Primero</option>
                            <option>Sexto Barrio</option>
                            <option>Ejido Rafael Delgado</option>
                            <option>Congregación Tzoncolco</option>
                            <option>Congregación Omiquila</option>
                            <option>Colonia Quinto</option>
                            <option>Colonia Novillero Chic</option>
                        </select>
                    </div>
                </div>

                <!-- Preguntas opcionales para recoger opinión -->
                <div>
                    <label class="label">¿Qué cambiarías en tu barrio/colonia para sentirte más a gusto?</label>
                    <textarea v-model="form.pregunta1" rows="2" class="input resize-none" />
                </div>

                <div>
                    <label class="label">¿Qué idea o proyecto crees que mejoraría tu comunidad?</label>
                    <textarea v-model="form.pregunta2" rows="2" class="input resize-none" />
                </div>

                <!-- Pregunta obligatoria sobre necesidad específica -->
                <div>
                    <label class="label">¿Cuál es la necesidad más urgente en tu barrio/colonia?</label>
                    <input v-model="form.necesidad" required class="input" />
                </div>

                <!-- Botón de envío -->
                <button type="submit" aria-label="Enviar formulario ciudadano"
                    class="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md">
                    Enviar respuesta
                </button>

                <!-- Mensaje de confirmación o error -->
                <p v-if="mensaje" class="text-green-600 text-center font-medium">{{ mensaje }}</p>
            </form>
        </section>
    </main>
</template>
  
<script setup>
import { ref } from 'vue'

// Datos del formulario
const form = ref({
    edad: null,
    colonia: '',
    pregunta1: '',
    pregunta2: '',
    necesidad: ''
})

const mensaje = ref('')

// Envío del formulario al backend
const submitForm = async () => {
    try {
        //
        const res = await fetch(`${import.meta.env.VITE_API_URL}/responder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value)
        })

        const data = await res.json()
        mensaje.value = res.ok
            ? 'Gracias por tu respuesta.'
            : data.detail || 'Ya has respondido antes.'

        if (res.ok) {
            // Limpia el formulario después de enviar
            form.value = { edad: null, colonia: '', pregunta1: '', pregunta2: '', necesidad: '' }
        }
    } catch {
        mensaje.value = 'Error al enviar.'
    }
}
</script>

  
<style scoped>
.input {
    @apply w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200;
}

.label {
    @apply block mb-1 text-sm font-semibold text-gray-700;
}
</style>