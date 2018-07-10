import axios from 'axios'
import { token } from '../../config'

export const getData = () => {
  return dispatch => {
    dispatch(loadingData())
    axios.get('https://ext.qlue.id/example/top_report', {
      headers: { token: token }
    })
    .then((mapData) => {
      dispatch(setMapData(mapData))
      dispatch(loadingDataDone())
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const getAlertData = () => {
  return dispatch => {
    axios.get('http://35.187.248.19/feeder/update/vFDlJkLMJ4RKjjqFs5yLO33T3tHvsqF7.json')
    .then((data) => {
      dispatch(setAlertData(data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

const setMapData = (mapData) => ({
  type: 'SET_MAP_DATA',
  payload: mapData
})

const setAlertData = (alertData) => ({
  type: 'SET_ALERT_DATA',
  payload: alertData
})

const loadingData = () => ({
  type: 'LOADING_DATA'
})

const loadingDataDone = () => ({
  type: 'LOADING_DATA_DONE'
})