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

const setMapData = (mapData) => ({
  type: 'SET_MAP_DATA',
  payload: mapData
})

const loadingData = () => ({
  type: 'LOADING_DATA'
})

const loadingDataDone = () => ({
  type: 'LOADING_DATA_DONE'
})