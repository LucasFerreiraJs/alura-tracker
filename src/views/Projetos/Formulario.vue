


<template>
  <section>
    <!-- <h1 class="title">Projetos</h1> -->

    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field" type="subimit">
        <button class="button">Salvar</button>
      </div>
    </form>
  </section>
</template>



<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
// import { notificarMixin } from "@/mixins/notificar";
//interfaces
// import IProjeto from "../interfaces/IProjeto";

import useNotificador from "@/hook/notificador";
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

//components

export default defineComponent({
  name: "FormularioProjetos",
  props: {
    id: {
      type: String,
    },
  },

  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notificar } = useNotificador();

    //variavel reativa
    const nomeDoProjeto = ref("");

    if (props.id) {

      const projeto = store.state.projeto.projetos.find(
        proj => proj.id == props.id
      );
      console.log("projeto", projeto)
      nomeDoProjeto.value == projeto?.nome || "";
    }

    const lidarComSucesso = (): void => {
      nomeDoProjeto.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        "Excelente!",
        "O projeto foi cadastrado com sucesso"
      );
      router.push("/Projetos");
    };

    const salvar = (): void => {
      if (props.id) {
        //editar
        store
          .dispatch(ALTERAR_PROJETOS, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => lidarComSucesso());
      } else {
        store
          .dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
          .then(() => lidarComSucesso());
      }
    };

    return {

      nomeDoProjeto,
      salvar,
    };
  },
});
</script>


