import 'react-native-gesture-handler';
import React from 'react';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider as StoreProvider} from 'react-redux';
import {ThemeProvider, lightTheme as theme} from './theme';
import RootNavigator from './navigation';
import createStore from './store/Store';
import {LocalizationProvider} from './locale/LocalizationContext';

//setup AXIOS INTERCEPTOR
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

const {persistor, store} = createStore();
const onBeforeLift = () => {};

axios.defaults.baseURL = 'https://uat.firmpay.com/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

let networkConnectivityCheck = false;
let showModalOnce = false;

axios.interceptors.request.use(
  async function (config) {
    await NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        showModalOnce = true;
        networkConnectivityCheck = true;
      } else {
        showModalOnce = false;
        networkConnectivityCheck = false;
      }
    });

    if (!networkConnectivityCheck) {
      if (!showModalOnce) {
        // store.dispatch(hideLoader());
        // store.dispatch(showNetInfo());
      }
    } else {
      let endpoint = config.url;
      const token = await AsyncStorage.getItem('accessToken');
      if (token != null && !endpoint.includes('renewtoken')) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('config', config);

      return config;
    }
  },
  function (err) {
    console.log('interceptors request.use', err);
    return Promise.reject(err);
  },
);

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter((callback) => callback(access_token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    // Do something with response error
    if (networkConnectivityCheck) {
      if (error.response.status === 400) {
        return error.response;
      }
      // we have the error
      // we focus on token expired
      const message = error.response.data.message;
      const statusCode = error.response.status;
      const originalRequest = error.config;
      if (statusCode === 401 && message === 'Unauthorized') {
        // time to ask for fresh token
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true;
          // TODO:Generate new access Token if expired
          // store
          //   .dispatch(getNewAccessToken())
          //   .then((res) => {
          //     if (res.status === 200) {
          //       isAlreadyFetchingAccessToken = false;
          //       AsyncStorage.setItem('accessToken', res.data.token);
          //       onAccessTokenFetched(res.data.token);
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        }

        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber((access_token) => {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            resolve(axios(originalRequest));
          });
        });
        return retryOriginalRequest;
      }
      return Promise.reject(error.response);
    }
    return Promise.reject(error.response);
  },
);

const App = () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider>
        <PersistGate
          loading={null}
          onBeforeLift={onBeforeLift}
          persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </LocalizationProvider>
    </ThemeProvider>
  </StoreProvider>
);

export default App;
