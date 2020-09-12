export const state = () => ({
  transverse: 12
});

export const mutations = {
  addTransverse(state, value) {
    state.transverse = value;
  }
};