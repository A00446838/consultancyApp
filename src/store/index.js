import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import appReducer from './reducers/AppReducer';
import rootSaga from './sagas/index';
import {applyMiddleware, createStore, compose} from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
    key: 'store',
    storage: storage,
    whitelist: ['loginReducer']
};

const persistedReducer = persistReducer(persistConfig, appReducer);
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

// then run the saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);