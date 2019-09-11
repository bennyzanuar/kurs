import { combineReducers } from 'redux'
import latestReducer from './latest'

export default combineReducers({
    latest: latestReducer
})

