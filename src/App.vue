<template>
  <main 
    class="columns is-gapless is-multiline"
    v-bind:class="{ 'modo-escuro' : modoEscuroAtivo}"
    >
    <div class="column is-one-quarter">

      <BarraLateral 
        v-on:aoTemaAlterado="trocarTema"
      />
    </div>
    <div class="column is-three-quarter conteudo">

      <Notificacoes />
      <!-- ROTAS -->
      <router-view>
      </router-view>

    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//components
import BarraLateral from "./components/BarraLateral.vue";
import Notificacoes from "./components/Notificacoes.vue"

export default defineComponent({
  name: "App",
  components: {
    BarraLateral,
    Notificacoes
  },


  data() {
    return {
      // tarefas: [] as ITarefa[]
      // tarefas: new Array<ITarefa>(),
      modoEscuroAtivo:false 
    };
  },
  methods:{
    
    trocarTema(modoRecebido:boolean) : void{
      this.modoEscuroAtivo = modoRecebido
      console.log("trocar tema")

    },

  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main{
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro{
  
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}


.conteudo{
  background-color: var(--bg-primario);
}

</style>
