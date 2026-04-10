<template>
    <div v-if="product" class="flex flex-col items-center w-full">
        <div class="relative group bg-surface-container rounded-3xl overflow-hidden w-fit shadow-sm">
            <div class="flex items-center justify-center min-h-[400px] md:h-[550px]">
                <transition name="fade" mode="out-in">
                    <img
                        :key="currentIndex"
                        :src="getPhotos()[currentIndex].regular"
                        :alt="product.nombre"
                        class="h-full w-auto object-contain block"
                    />
                </transition>
            </div>

            <template v-if="getPhotos().length > 1">
                <button
                    @click="prev"
                    class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/10 hover:bg-black/30 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                    ‹
                </button>
                <button
                    @click="next"
                    class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/10 hover:bg-black/30 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                    ›
                </button>
            </template>
        </div>

        <div v-if="getPhotos().length > 1" class="flex gap-2 mt-4"></div>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            currentIndex: 0, // Controlamos qué foto se ve
        };
    },
    methods: {
        getPhotos() {
            if (!this.product.details?.photos?.length) {
                return [{ regular: this.product.imagen || "" }];
            }
            console.log(this.product.details.photos);
            return this.product.details.photos;
        },
        next() {
            const total = this.getPhotos().length;
            this.currentIndex = (this.currentIndex + 1) % total;
        },
        prev() {
            const total = this.getPhotos().length;
            this.currentIndex = (this.currentIndex - 1 + total) % total;
        },
    },
};
</script>

<style scoped>
/* Transición suave de desvanecimiento (Fade) */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Ocultar scrollbar por si acaso */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
