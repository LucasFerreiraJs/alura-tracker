<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="" />
    </h1>

    <div>
      <button class="button" v-on:click="alterarTema">
        {{ textoBotao }}
      </button>
    </div>
    <nav class="panel mt-05">
      <ul>
        <li>
          <router-link class="link" to="/" >
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link >
        </li>
        <li>
          <router-link class="link" to="/projetos">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link >
        </li>
      </ul>
    </nav>
  </header>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },

  computed: {
    textoBotao(): string {
      if (this.modoEscuroAtivo) {
        return "Desativar modo escuro";
      }

      return "Ativar modo escuro";
    },
  },
  methods: {
    alterarTema(): void {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
    },
  },
});
</script>


<style scoped>
/*estilo do componente */

header {
  padding: 1rem;
  background-color: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}


.link li{
  margin: 8px 0;

}

.link{
  color :#fff
}

.link:hover{

  color :#FAF0CA
}

.link.router-link-active{
  color: #FAF0CA;
}
</style>