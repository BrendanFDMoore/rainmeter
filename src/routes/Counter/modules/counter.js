import { combineReducers } from 'redux'
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_RESET = 'COUNTER_RESET'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const SHOW_RAIN = 'SHOW_RAIN'
export const HIDE_RAIN = 'HIDE_RAIN'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return (dispatch, getState) => {
    dispatch({
      type    : SHOW_RAIN,
    })
    dispatch({
      type    : COUNTER_INCREMENT,
      payload : value
    })
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : HIDE_RAIN,
        })
        resolve()
      }, 5000)
    })
  }
}

export function reset () {
  return {
    type    : COUNTER_RESET,
  }
}

export const actions = {
  increment,
  reset
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const initialState = 0
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_RESET]    : (state, action) => initialState,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,
}

const LAST_INCREMENT_ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => (new Date()).getTime(),
}

const SHOW_RAIN_ACTION_HANDLERS = {
  [SHOW_RAIN]    : (state, action) => state + 1,
  [COUNTER_RESET]    : (state, action) => 0,
}

const HIDE_RAIN_ACTION_HANDLERS = {
  [HIDE_RAIN]    : (state, action) => state + 1,
  [COUNTER_RESET]    : (state, action) => 0,
}

// ------------------------------------
// Reducer
// ------------------------------------
const lastIncrementReducer = (state = 0, action) => {
  const handler = LAST_INCREMENT_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

const counterReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

const showRainReducer = (state = 0, action) => {
  const handler = SHOW_RAIN_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

const hideRainReducer = (state = 0, action) => {
  const handler = HIDE_RAIN_ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export default combineReducers({
  total: counterReducer,
  lastIncrement: lastIncrementReducer,
  showRain: showRainReducer,
  hideRain: hideRainReducer,
})
