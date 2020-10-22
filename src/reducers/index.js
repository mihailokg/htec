import {combineReducers} from 'redux';
import getEndPointData from './getEndPointData';

const appReducer = combineReducers({
  /* app’s top-level reducers */
  getEndPointData
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
