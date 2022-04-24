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
import { computed, defineComponent, ref } from "vue";
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

  methods: {},
  setup(props, contexto) {
    const store = useStore(key);

    const descricao = ref("");
    const idProjeto = ref("");
    const projetos = computed(() => store.state.projeto.projetos);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      contexto.emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find((proj) => proj.id == idProjeto.value),
      });
      descricao.value = "";
    };

    return {
      descricao,
      idProjeto,
      finalizarTarefa,
      projetos,
    };
  },
});
</script>


<style >
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>