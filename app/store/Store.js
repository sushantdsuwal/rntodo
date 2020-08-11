import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './rootReducer';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  blackList: [],
};

const reducer = persistReducer(config, rootReducer);
const middleware = composeWithDevTools(applyMiddleware(thunk));

export default (data) => {
  const store = createStore(reducer, middleware);
  const persistor = persistStore(store);
  return {persistor, store};
};
