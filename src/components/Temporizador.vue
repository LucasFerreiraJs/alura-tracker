<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro v-bind:tempoEmSegundos="tempoEmSegundos" />

    <button class="button" 
      v-on:click="iniciar"
      v-bind:disabled="cronometroRodando"
    >
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>


    <button class="button" 
      v-on:click="finalizar"
      v-bind:disabled="!cronometroRodando"
    >
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>


  </div>
</template>



<script lang="ts">
import Cronometro from "./Cronometro.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "TemposizadorFormulario",
  emits: [
    "aoTemposizadorFinalizado"

  ],
  components: {
    Cronometro,
  },
  data() {
    return {
      cronometro: 0,
      tempoEmSegundos: 0,
      cronometroRodando: false,
    };
  },
  methods: {
    iniciar() {

      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);

      console.log("iniciando");
    },
    finalizar() {
      this.cronometroRodando = false;
      console.log("zerado");
      clearInterval(this.cronometro);

      this.$emit("aoTemposizadorFinalizado", this.tempoEmSegundos)
      this.tempoEmSegundos = 0;
    },
  },
});
</script>