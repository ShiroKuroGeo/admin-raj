import { reactive, readonly } from 'vue'

const state = reactive({
  isAuthenticated: false,
  userRole: "",
  userId: "",
  userFirstName: "",
  userLastName: "",
  email: "",
  profileData: {},
})

const methods = {
  setAuth({ isAuthenticated, userRole, userId, userFirstName, userLastName, email }) {
    state.isAuthenticated = isAuthenticated
    state.userRole = userRole
    state.userId = userId
    state.userFirstName = userFirstName
    state.userLastName = userLastName
    state.email = email
  },
  setProfileData(profileData) {
    state.profileData = profileData
  },
  clearAuth() {
    state.isAuthenticated = false
    state.userRole = ""
    state.userId = ""
    state.userFirstName = ""
    state.userLastName = ""
    state.email = ""
    state.profileData = {}
  },
  reset() {
    Object.assign(state, {
      isAuthenticated: false,
      userRole: "",
      userId: "",
      userFirstName: "",
      userLastName: "",
      email: "",
      profileData: {},
    })
  },
}

const actions = {
  login(payload) {
    methods.setAuth(payload)
  },
  logout() {
    methods.clearAuth()
  },
  setProfile(profileData) {
    methods.setProfileData(profileData)
  },
  reset() {
    methods.reset()
  },
}

const getters = {
  isAuthenticated: () => state.isAuthenticated,
  userRole: () => state.userRole,
  userId: () => state.userId,
  userFirstName: () => state.userFirstName,
  userLastName: () => state.userLastName,
  email: () => state.email,
  profileData: () => state.profileData,
}

export const store = readonly({
  state,
  actions,
  getters,
})
