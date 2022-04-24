<template>
  <BoxWrapper>
    <div
      class="columns clicavel" 
      v-on:click="tarefaClicada"
    >
      <div class="column is-4">
          {{ tarefa.descricao  || 'Tarefa sem descrição'}}
      </div>

      <div class="column is-3">
          {{tarefa.projeto?.nome || "N/D"}}

      </div>

      <div class="column">
        <Cronometro v-bind:tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </BoxWrapper>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";

import Cronometro from "./Cronometro.vue";
import BoxWrapper from "./Box.vue"
import ITarefa from "../interfaces/ITarefa";

export default defineComponent({
  name: "TarefaItem",
  emits: ["aoTarefaClicada"],
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  methods: {
    tarefaClicada():void {
      console.log("clicado", this.tarefa)
      this.$emit("aoTarefaClicada", this.tarefa)
    }

  },
  components: {
    Cronometro,
    BoxWrapper
  },
});
</script>


<style scoped>
.clicavel{
  cursor: pointer;
}
</style>