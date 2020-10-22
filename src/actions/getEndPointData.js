import Config from '../config/Config';
import TEST_DATA from '../config/TestData';

const REQUEST_DATA = 'REQUEST_DATA';
const REQUEST_DATA_FAILURE = 'REQUEST_DATA_FAILURE';
const REQUEST_DATA_SUCCESS = 'REQUEST_DATA_SUCCESS';

export { REQUEST_DATA, REQUEST_DATA_FAILURE, REQUEST_DATA_SUCCESS };

let headersData = new Headers({
  'User-Agent': Config.userAgent,
  // 'Accept': 'application/json',
  // 'Cache-Control': 'no-store, no-cache, must-revalidate',
  // 'Referer': 'APP',
  // 'Expires': 0,
  'apiKey': Config.apiKey
});

function dataRequest () {
  return {
    type: REQUEST_DATA
  };
}

function dataSuccess (response) {
  return {
    type: REQUEST_DATA_SUCCESS,
    response
  };
}
function dataError (error) {
  return {
    type: REQUEST_DATA_FAILURE,
    error
  };
}

export function getEndPointData (data) {
  return (dispatch) => {
    return dispatch(dataRequestFunction({data}));
  };
}

function dataRequestFunction(data) {
  let country = data.data.country || 'us';
  // console.log('country', JSON.stringify(data) + data.data.country + ' / ' + country);
  let sources = data.data.sources ? '&sources=' + data.data.sources : '';
  let searchTerm = data.data.searchTerm ? '&q=' + data.data.searchTerm : '';
  let category = data.data.category ? '&category=' + data.data.category : '';
  let pageSize = data.data.pageSzie ? '&pageSize=' + data.data.pageSzie : '';

  let url = 'https://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=' + Config.apiKey + sources + searchTerm + category + pageSize;
  let request = {
    headers: headersData
  };
  return dispatch => {
    if (Config.USE_TEST_DATA)
    {
      let c = data.data.category;
      let c1 = TEST_DATA['DATA_CATEGORY'];
      let c2 = TEST_DATA['DATA'];
      // console.log('c1[data.data.category] ' + c, c1[c]);

      return dispatch(dataSuccess(category ? c1[c] : c2));
    }

    return fetch(url, request)
      .then(response => response.json())
      .then(articles => dispatch(dataSuccess(articles)))
      .catch(error => dispatch(dataError(error)));
  };
  // throw response;
}