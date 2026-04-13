<template>
    <div v-if="product" class="w-full">
        <div class="relative group">
            <transition name="fade" mode="out-in">
                <img
                    :key="currentIndex"
                    :src="getPhotos()[currentIndex].regular"
                    :alt="product.nombre"
                    class="w-full h-auto object-contain rounded-2xl block"
                />
            </transition>

            <template v-if="getPhotos().length > 1">
                <button
                    @click="prev"
                    class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                    ‹
                </button>
                <button
                    @click="next"
                    class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                    ›
                </button>
            </template>
        </div>

        <div v-if="getPhotos().length > 1" class="flex gap-2 mt-3 justify-center">
            <button
                v-for="(_, i) in getPhotos()"
                :key="i"
                @click="currentIndex = i"
                class="w-1.5 h-1.5 rounded-full transition-all duration-200"
                :class="i === currentIndex ? 'bg-primary w-4' : 'bg-outline-variant'"
            />
        </div>
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
            currentIndex: 0,
        };
    },
    methods: {
        getPhotos() {
            if (!this.product.details?.photos?.length) {
                return [{ regular: this.product.imagen || "" }];
            }
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
