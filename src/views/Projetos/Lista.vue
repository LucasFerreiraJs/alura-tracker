


<template>
  <section >
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Açoes</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="projeto in projetos" v-bind:key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link class="button" v-bind:to="`/projetos/${projeto.id}`">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>

            <button class="button ml-2 is-danger" v-on:click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>

          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>



<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { EXCLUIR_PROJETO} from "../../store/tipo-mutacoes";
import { OBTER_PROJETOS, REMOVER_PROJETOS } from "@/store/tipo-acoes";

//interfaces
// import IProjeto from "../interfaces/IProjeto";

//components

export default defineComponent({
  name: "ListaProjetos",

  setup() {
    const store = useStore();
    store.dispatch(OBTER_PROJETOS)
    
    return {
      projetos: computed(() => store.state.projeto.projetos),
      store
    };
  },
  methods:{

    excluir(id:string): void{

      this.store.dispatch(REMOVER_PROJETOS, id)
        
    }

  }
});
</script>


