export default store(function (/* { ssrContext } */) {
    const Store = createStore({
      state: {
        isAuthenticated: false,
        userRole: "",
        userId: "",
        userName: "", // Add this line
        profileData: {},
      },
      mutations: {
        setAuth(state, { isAuthenticated, userRole, userId, userName }) {
          state.isAuthenticated = isAuthenticated;
          state.userRole = userRole;
          state.userId = userId;
          state.userName = userName; // Add this line
        },
        setProfileData(state, profileData) {
          state.profileData = profileData;
        },
        clearAuth(state) {
          state.isAuthenticated = false;
          state.userRole = "";
          state.userId = "";
          state.profileData = {};
        },
        SET_PROFILE_IMAGE(state, imageUrl) {
          state.profileImage = imageUrl;
        },

      },
      actions: {
        login({ commit }, { isAuthenticated, userRole, userId, userName }) {
          commit("setAuth", { isAuthenticated, userRole, userId, userName });
        },
        logout({ commit }) {
          commit("clearAuth");
        },
        setProfile({ commit }, profileData) {
          commit("setProfileData", profileData);
        },
        actions: {
          updateProfileImage({ commit }, imageUrl) {
            commit('SET_PROFILE_IMAGE', imageUrl);
          },
        },

      },
      getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        userRole: (state) => state.userRole,
        userId: (state) => state.userId,
        userName: (state) => state.userName, // Add this line
        profileData: (state) => state.profileData,
        getProfileImage: (state) => state.profileImage,
      },
    });

    return Store;
  });
