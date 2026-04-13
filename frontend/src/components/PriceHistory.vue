<template>
    <div class="w-full h-75 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 shadow-sm">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
const { productId } = defineProps({
    productId: {
        type: String,
        required: true,
    },
});

import { onMounted, computed } from "vue";
import { useHistoric } from "@/composables/useHistoric.js";

import { Line } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

// Registrar componentes necesarios
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: true,
        title: {
            display: true,
            text: "Historico de precios",
        },
    },
};

// Datos
const { historic, loadHistoric } = useHistoric();

const chartData = computed(() => ({
    labels: historic.value.map((item) => item.fecha_muestreo.substring(0, 10)),
    datasets: [
        {
            label: "Precio",
            data: historic.value.map((item) => item.unit_price),
            borderColor: "#006a37",
            backgroundColor: "rgba(0, 106, 55, 0.08)",
            tension: 0.4,
        },
    ],
}));

onMounted(() => {
    loadHistoric(productId);
});
</script>
