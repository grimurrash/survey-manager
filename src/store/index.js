import { createStore } from 'vuex'
import axios from 'axios'

const FORM_FIRST_STEP = 1
// const FORM_SECOND_STEP = 2
// const FORM_THIRD_STEP = 3
// const FORM_FOURTH_STEP = 4
// const FORM_FIFTH_STEP = 5

export default createStore({
  state: {
    formStep: FORM_FIRST_STEP,
    surveyInfo: {
      id: 0,
      backgroundImage: ''
    },
    surveySlug: '',
    errorMessage: '',
    isLoading: false
  },
  getters: {
    surveyInfo ({ surveyInfo }) {
      return surveyInfo
    },
    formStep ({ formStep }) {
      return formStep
    },
    host () {
      return process.env.NODE_ENV === 'production' ? 'https://manager.cpvs.moscow' : 'http://127.0.0.1:8000'
    },
    isLoading ({ isLoading }) {
      return isLoading
    },
    errorMessage ({ errorMessage }) {
      return errorMessage
    }
  },
  mutations: {
    setErrorMessage (state, error) {
      state.errorMessage = error
    },
    setLoading (state, loading) {
      state.isLoading = loading
    },
    setSurveyUrl (state, url) {
      state.surveySlug = url
    },
    setFormStep (state, step) {
      state.formStep = step
    },
    setSurveyInfo (state, survey) {
      state.surveyInfo = survey
    }
  },
  actions: {
    getSurveyInfo ({ commit, getters }, surveySlug) {
      commit('setErrorMessage', '')
      commit('setLoading', true)
      commit('setSurveyUrl', surveySlug)
      axios.get(getters.host + '/surveysmanager/survey/' + surveySlug)
        .then(res => {
          if (res.data.status) {
            commit('setSurveyInfo', res.data.info)
          } else {
            commit('setErrorMessage', res.data.message)
          }
        })
        .catch(res => {
          commit('setErrorMessage', res.data.message)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    saveAnswer ({ commit, getters, state }, data) {
      commit('setErrorMessage', '')
      commit('setLoading', true)
      const formData = new FormData()
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })

      axios.post(getters.host + '/surveysmanager/survey/' + state.surveySlug + '/answer', formData)
        .then(res => {
          if (res.data.status) {
            commit('setFormStep', 5)
          } else {
            commit('setErrorMessage', res.data.message)
          }
        })
        .catch(res => {
          commit('setErrorMessage', res.data.message)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  modules: {}
})
