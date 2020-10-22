'use strict';

const REQUEST_DATA = 'REQUEST_DATA';
const REQUEST_DATA_FAILURE = 'REQUEST_DATA_FAILURE';
const REQUEST_DATA_SUCCESS = 'REQUEST_DATA_SUCCESS';

export { REQUEST_DATA, REQUEST_DATA_FAILURE, REQUEST_DATA_SUCCESS };

const initialState = {
  isProcessing: null,
  error: null,
  status: null,
  timestamp: null
};

export default function getEndPointData (state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        isProcessing: true,
        error: null,
        status: 'processing',
        timestamp: new Date().toUTCString()
      };
    case REQUEST_DATA_SUCCESS:
      // console.log('DBE_API_ASK_PHOTO_QUEUE_SUCCESS REDUCER:', state, action);
      return {
        ...state,
        isProcessing: false,
        status: 'success',
        timestamp: new Date().toUTCString()
      };
    case REQUEST_DATA_FAILURE:
      // console.log('DBE_API_ASK_PHOTO_QUEUE_FAILURE REDUCER:', state, action);
      return {
        ...state,
        isProcessing: false,
        error: action.error,
        status: 'failed',
        timestamp: new Date().toUTCString()
      };
    default:
      return state;
  }
}
