export const state = () => ({
  character: {
    src: require('~/assets/images/char-jenan.svg'),
    name: 'jenan',
    char: require('~/assets/images/jenan.svg'),
  }
})

export const getters = {
  character(state) {
    return state.character
  }
}

export const mutations = {
  SET_CHARACTER(state, payload) {
    state.character = payload
  }
}

export const actions = {
  setCharacter({commit}, payload) {
    commit("SET_CHARACTER", payload)
  }
}

