const initialState = {
  mapData: [],
  alertData: [],
  loading: true
}

const map = (state = {...initialState}, action) => {
  switch(action.type) {
    case 'SET_MAP_DATA': {
      return ({ ...state, mapData: action.payload })
    }
    case 'LOADING_DATA': {
      return ({ ...state, loading: true })
    }
    case 'LOADING_DATA_DONE': {
      return({ ...state, loading: false })
    }
    case 'SET_ALERT_DATA': {
      return ({...state, alertData: action.payload})
    }
    default:
      return state;
  }
}

export default map;