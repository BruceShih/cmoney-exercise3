const employeeStore = {
  namespaced: true,
  state: () => ({
    selectedEmployeeIds: [],
  }),
  getters: {
    getEmployees(state) {
      return state.selectedEmployeeIds;
    },
  },
  mutations: {
    add(state, employeeId) {
      state.selectedEmployeeIds.push(employeeId);
    },
    remove(state, employeeId) {
      state.selectedEmployeeIds = state.selectedEmployeeIds.filter(
        (id) => id !== employeeId,
      );
    },
    clearSelection(state) {
      state.selectedEmployeeIds = [];
    },
  },
};

export default employeeStore;
