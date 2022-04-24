<template>
  <!-- ROTAS -->
  <Formulario v-on:aoSalvarTarefa="salvarTarefa" />

  <div class="lista">

    <div class="field">

      <!-- <div class="input"> -->
        
      <p class="control has-icon-left">
        <input type="text" class="input" placeholder="Digite para filtrar"  v-model="filtro">
        <!-- <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span> -->
      <!-- </div> -->
      </p>
    </div>

    <Tarefa
      v-for="(tarefa, index) in tarefas"
      v-bind:key="index"
      v-bind:tarefa="tarefa"
      v-on:aoTarefaClicada="selecionarTarefa"
    />

    <div
      class="modal"
      v-bind:class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div v-on:click="fecharModal" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando tarefa</p>
          <button
            v-on:click="fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoTarefa" class="label"> Descrição </label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" v-on:click="alterarTarefa">
            Salvar alterações
          </button>
          <button v-on:click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>

    <Box v-show="listaEstavVazia"> Você não está muito produtivo hoje :( </Box>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";

//components
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";

// interfaces
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "TarefasView",
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  computed: {
    listaEstavVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref("")

    console.log("store.state.tarefas", store.state.tarefas)
    // const tarefas = computed(() => store.state.tarefas)
    // const tarefas = computed(() => store.state.tarefas.filter(
    //   (t) => !filtro.value || t.descricao.includes(filtro.value)
    // ))


    watchEffect(()=>{
      // console.log(filtro.value)
      store.dispatch(OBTER_TAREFAS, filtro.value)

    })

    
    return {
      tarefas: computed(() => store.state.tarefas),
      store,
      filtro
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store
        .dispatch(CADASTRAR_TAREFA, tarefa)
        .then(() => console.log("opa"));
    },

    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },

    fecharModal(): void {
      this.tarefaSelecionada = null;
    },

    alterarTarefa(): void {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  mounted() {
    console.log("tarefa on");
  },
});
</script>