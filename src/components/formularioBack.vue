<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="qual tarefa deseja criar?"
          v-model="descricao"
        />
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="" disabled>Selecione o projeto</option>
            <option 
              v-for="projeto in projetos"
              v-bind:value="projeto.id"
              v-bind:key="projeto.id"
            >
              {{ projeto.nome }}
            
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <Temporizador v-on:aoTemposizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { computed, defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

//store
import { useStore } from "vuex";
//key
import { key } from "@/store";

export default defineComponent({
  name: "FormularioTeste",
  emits: ["aoSalvarTarefa"],

  components: {
    Temporizador,
  },

  data() {
    return {
      descricao: "",
      idProjeto: ""
    };
  },
  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.projeto.projetos),
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: this.projetos.find(proj => proj.id == this.idProjeto)
      });
      this.descricao = "";
    },
  },
});
</script>


<style >
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>