import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETOS, ALTERAR_PROJETOS, REMOVER_PROJETOS } from "@/store/tipo-acoes";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";




export interface EstadoProjeto{

  projetos: IProjeto[]

}

// <Estadoprojeto, estadoglobal>
export const projeto: Module<EstadoProjeto , Estado> = {

  mutations:{
    [ADICIONAR_PROJETO](state, nomeDoProjeto: string) {
      const projeto = <IProjeto>{
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      }
      state.projetos.push(projeto)
    },

    [ALTERAR_PROJETO](state, projeto: IProjeto) {
      
      const index = state.projetos.findIndex(proj => proj.id == projeto.id)
      state.projetos[index] = projeto

    },

    [EXCLUIR_PROJETO](state, id: string) {

      state.projetos = state.projetos.filter(proj => proj.id != id)

    },

    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {

      state.projetos = projetos

    },

    
  },
  actions:{
    [OBTER_PROJETOS]({ commit }) {
      http.get("/projetos")
        .then(async res =>{
          const data = await res.data

          commit(DEFINIR_PROJETOS, data)
        })

    },
    [CADASTRAR_PROJETOS](contexto, nomeDoProjeto: string){

      return http.post("/projetos", {
        nome: nomeDoProjeto
      
      })
    },
    [ALTERAR_PROJETOS](contexto, projeto: IProjeto){

      return http.put(`/projetos/${projeto.id}`, projeto)

    },

    [REMOVER_PROJETOS]({commit}, id: string){

      return http.delete(`/projetos/${id}`)
        .then(()=> commit(EXCLUIR_PROJETO, id))
    },
  }

}