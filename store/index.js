export const state = () => ({
  character: {}
})

export const getters = {
  character(state) {
    return state.character
  }
}

export const mutations = {
  SET_CHARACTER(state, payload) {
    state.character = payload
    localStorage.setItem("char", JSON.stringify(payload))
  }
}

export const actions = {
  setCharacter({commit}, payload) {
    commit("SET_CHARACTER", payload)
  }
}

