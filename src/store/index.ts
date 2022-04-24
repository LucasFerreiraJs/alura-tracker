import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";


//interfaces
import { INotificacao } from "@/interfaces/INotificacao";

import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import http from "@/http";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "./tipo-acoes";
import { NOTIFICAR, DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from "./tipo-mutacoes";


export interface Estado {
  notificacoes: INotificacao[]
  tarefas : ITarefa[]
  projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol();

//valores iniciais 
export const store = createStore<Estado>({

  state: {
    notificacoes: [],
    tarefas: [],
    projeto: {
      projetos: []
    }
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {

      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
      }, 3000);

    },

    //tarefas
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]){
      state.tarefas = tarefas

    },

    [ADICIONA_TAREFA](state, tarefa:ITarefa){
      state.tarefas.push(tarefa)

    },


    [ALTERA_TAREFA](state, tarefa: ITarefa){

      const index = state.tarefas.findIndex(item => item.id == tarefa.id)
      state.tarefas[index] = tarefa

    }

  },
  actions: {
     //TAREFAS
    [OBTER_TAREFAS]({commit}, filtro: string){

      let url = "/tarefas"
      if(filtro){

        url += `?descricao=${filtro}`

      }

      console.log("url", url)
      http.get(url)
        .then(res => commit(DEFINIR_TAREFAS, res.data))   
    },


    [CADASTRAR_TAREFA]({commit}, tarefa: ITarefa){
      return http.post(`/tarefas`,tarefa)
        .then(res => commit(ADICIONA_TAREFA, res.data))
    },

    [ALTERAR_TAREFA]({commit}, tarefa: ITarefa){
      return http.put(`/tarefas/${tarefa.id}`)
        .then(() => commit(ALTERA_TAREFA, tarefa))
    }
   
  },
  modules: {
    projeto
  }
})



export function useStore(): Store<Estado> {

  return vuexUseStore(key)
} 
