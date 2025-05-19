<template>
    <!-- Contenedor principal con fondo degradado y centrado -->
    <main class="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-6 font-sans">
        <!-- Sección del formulario con padding, sombra y borde -->
        <section
            class="bg-white rounded-3xl shadow-smooth border border-gray-200 max-w-xl sm:max-w-lg md:max-w-2xl w-full p-8 md:p-10 space-y-8">

            <!-- Encabezado del formulario -->
            <header class="text-center">
                <h1 class="text-3xl font-extrabold text-gray-800 mb-2">Formulario Ciudadano Rafel Delgado</h1>
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
                            <option value="">Selecciona un barrio</option>
                            <option value="Primer barrio">Primer barrio</option>
                            <option value="Segundo barrio">Segundo barrio</option>
                            <option value="Tercer barrio">Tercer barrio</option>
                            <option value="Cuarto barrio">Cuarto barrio</option>
                            <option value="Quinto barrio">Quinto barrio</option>
                            <option value="Sexto barrio">Sexto barrio</option>
                            <option value="Novillero">Novillero</option>
                            <option value="Jalapilla">Jalapilla</option>
                            <option value="Omiquila">Omiquila</option>
                            <option value="Tzoncolco">Tzoncolco</option>
                            <option value="El vidrio">El vidrio</option>
                            <option value="Boquerpn">Boquerón</option>
                            <option value="Las sirenas">Las sirenas</option>
                            <option value="La Luz">La Luz</option>
                            <option value="La Joya">La Joya</option>
                        </select>
                    </div>
                </div>

                <!-- Preguntas opcionales para recoger opinión -->
                <div>
                    <label class="label">¿Qué cambiarías en tu barrio/colonia para sentirte más a gusto?</label>
                    <textarea v-model="form.pregunta1" maxlength="400" rows="2" class="input resize-none" />
                </div>

                <div>
                    <label class="label">¿Qué idea o proyecto crees que mejoraría tu comunidad?</label>
                    <textarea v-model="form.pregunta2"  maxlength="400" rows="2" class="input resize-none" />
                </div>

                <!-- Pregunta obligatoria sobre necesidad específica -->
                <div>
                    <label class="label">¿Cuál es la necesidad más urgente en tu barrio/colonia?</label>
                    <input v-model="form.necesidad" maxlength="400" required class="input" />
                </div>

                <!-- Botón de envío -->
                <button type="submit" aria-label="Enviar formulario ciudadano" :disabled="yaRespondido || cargando"
                    class="w-full py-3 px-4 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <svg v-if="cargando" class="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span>{{ cargando ? 'Enviando...' : 'Enviar respuesta' }}</span>
                </button>



                <!-- Mensaje legal o de aviso -->
                <p class="text-[11px] text-gray-500 text-center">
                    Esta información es anónima. No pedimos datos personales y solo se usará para mejorar el municipio.
                </p>

                <!-- Mensaje de confirmación o error -->
                <p v-if="mensaje" class="text-green-600 text-center font-medium">{{ mensaje }}</p>
            </form>
        </section>
    </main>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'

// Datos del formulario
const form = ref({
    edad: null,
    colonia: '',
    pregunta1: '',
    pregunta2: '',
    necesidad: ''
})

const mensaje = ref('')
const yaRespondido = ref(false)
const cargando = ref(false)

// Verifica si ya respondió (al cargar)
onMounted(() => {
    yaRespondido.value = localStorage.getItem("formRespondido") === "true"
})

// Envío del formulario al backend
const submitForm = async () => {
    // Validación de edad si se proporciona
    if (form.value.edad !== null && (form.value.edad < 10 || form.value.edad > 100)) {
        mensaje.value = 'Ingresa una edad valida.'
        return
    }

    cargando.value = true
    try {
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
            localStorage.setItem("formRespondido", "true")
            yaRespondido.value = true
            form.value = { edad: null, colonia: '', pregunta1: '', pregunta2: '', necesidad: '' }
        }
    } catch {
        mensaje.value = 'Error al enviar.'
    } finally {
        cargando.value = false
    }
}

</script>

  
<style scoped>
.input {
    @apply w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200;
}

.label {
    @apply block mb-1 text-sm font-semibold text-gray-700;
}
</style>