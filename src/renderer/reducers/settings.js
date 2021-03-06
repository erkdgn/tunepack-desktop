import { createReducer } from 'utils/redux'
import { fromJS, List } from 'immutable'
import {
  INITIALIZE_REQUEST,
  ON_UPDATE_SETTINGS,
  SET_SETTINGS_REQUEST,
  TOGGLE_IS_BURNING,
  TOGGLE_DOWNLOAD_SELECT_BURNING,
  SET_SELECTED_FOR_BURNING,
  BURN_CONTINUE,
  BURN_REQUEST,
  GET_DRIVES_REQUEST,
  ON_BURN_PROGRESS,
  BURN_RESET,
  DOWNLOADS_REMOVE_REQUEST
} from 'actions/settings'
import { RESET_REQUEST } from '../actions/app'

const initialState = fromJS({
  isInitialized: false,
  isResetting: false,
  data: {},
  hasNewRelease: false,
  latestReleaseInfo: {},
  isBurning: false,
  selectedForBurning: [],
  isBurningContinued: false,
  isExecutingBurning: false,
  burningError: null,
  burnProgress: null,
  isBurned: false,
  drives: [],
  isExecutingGetDrives: false,
  getDrivesError: null,
  isRemovingDownloads: false
})

export default createReducer(initialState, {
  [BURN_RESET]: (state) => {
    return state.withMutations((state) => {
      return state
        .set('isBurning', false)
        .set('selectedForBurning', List())
        .set('isBurningContinued', false)
        .set('isExecutingBurning', false)
        .set('burningError', null)
        .set('burnProgress', null)
        .set('isBurned', false)
        .set('drives', List())
        .set('isExecutingGetDrives', false)
        .set('getDrivesError', null)
    })
  },
  [INITIALIZE_REQUEST.SUCCESS]: (state, { payload }) => {
    return state.withMutations((state) => {
      const { settings: data } = payload

      return state
        .set('isInitialized', true)
        .set('data', fromJS(data))
        .set('hasNewRelease', payload?.hasNewRelease || null)
        .set('latestReleaseInfo', fromJS(payload?.latestReleaseInfo || {}))
        .set('isBurning', false)
        .set('selectedForBurning', List())
        .set('isBurningContinued', false)
        .set('isExecutingBurning', false)
        .set('burningError', null)
        .set('burnProgress', null)
        .set('isBurned', false)
        .set('drives', List())
        .set('isExecutingGetDrives', false)
        .set('getDrivesError', null)
    })
  },
  [SET_SETTINGS_REQUEST.SUCCESS]: (state, { payload: data }) => {
    return state
      .set('data', fromJS(data))
  },
  [ON_UPDATE_SETTINGS]: (state, { payload: data }) => {
    return state
      .set('data', fromJS(data))
  },
  [RESET_REQUEST.START]: (state) => {
    return state.set('isResetting', true)
  },
  [TOGGLE_IS_BURNING]: (state, { payload: isBurning }) => {
    return state.withMutations((state) => {
      const currentIsBurning = state.get('isBurning')

      if (isBurning === false || currentIsBurning) {
        return state
          .set('isBurning', false)
          .set('selectedForBurning', List())
          .set('isBurningContinued', false)
          .set('isExecutingBurning', false)
          .set('burningError', null)
          .set('burnProgress', null)
          .set('isBurned', false)
          .set('drives', List())
          .set('isExecutingGetDrives', false)
          .set('getDrivesError', null)
      }

      return state
        .set('isBurning', true)
    })
  },
  [TOGGLE_DOWNLOAD_SELECT_BURNING]: (state, { payload: trackId }) => {
    const selectedForBurning = state.get('selectedForBurning')

    if (selectedForBurning.includes(trackId)) {
      return state.set('selectedForBurning', selectedForBurning.filter(i => i !== trackId))
    }

    return state.set('selectedForBurning', selectedForBurning.push(trackId))
  },
  [SET_SELECTED_FOR_BURNING]: (state, { payload: selectedForBurning }) => {
    return state.set('selectedForBurning', List(selectedForBurning))
  },
  [BURN_CONTINUE]: (state, { payload: isBurningContinued }) => {
    return state.withMutations((state) => {
      if (isBurningContinued === false) {
        return state
          .set('selectedForBurning', List())
          .set('isBurningContinued', false)
          .set('isExecutingBurning', false)
          .set('burningError', null)
          .set('burnProgress', null)
          .set('isBurned', false)
          .set('drives', List())
          .set('isExecutingGetDrives', false)
          .set('getDrivesError', null)
      }

      return state
        .set('isBurningContinued', true)
    })
  },
  [BURN_REQUEST.START]: (state) => {
    return state
      .set('isExecutingBurning', true)
      .set('burningError', null)
  },
  [BURN_REQUEST.SUCCESS]: (state) => {
    return state
      .set('isExecutingBurning', false)
      .set('isBurned', true)
  },
  [BURN_REQUEST.ERROR]: (state, { payload: error }) => {
    return state
      .set('isExecutingBurning', false)
      .set('burningError', error)
  },
  [GET_DRIVES_REQUEST.START]: (state) => {
    return state
      .set('isExecutingGetDrives', true)
      .set('burningError', null)
  },
  [GET_DRIVES_REQUEST.SUCCESS]: (state, { payload: drives }) => {
    return state
      .set('isExecutingGetDrives', false)
      .set('drives', List(drives))
  },
  [GET_DRIVES_REQUEST.ERROR]: (state, { payload: error }) => {
    return state
      .set('isExecutingGetDrives', false)
      .set('getDrivesError', error)
  },
  [ON_BURN_PROGRESS]: (state, { payload: { progress } }) => {
    return state
      .set('burnProgress', progress)
  },
  [DOWNLOADS_REMOVE_REQUEST.START]: (state) => {
    return state
      .set('isRemovingDownloads', true)
      .set('isBurned', false)
  },
  [DOWNLOADS_REMOVE_REQUEST.SUCCESS]: (state) => {
    return state
      .set('isRemovingDownloads', false)
  },
  [DOWNLOADS_REMOVE_REQUEST.ERROR]: (state) => {
    return state
      .set('isRemovingDownloads', false)
  }
})
