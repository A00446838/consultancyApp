import { Provider } from 'react-redux';
import React, { Component } from 'react';
import Routes from './route/Route';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/index';
import setupInterceptors from "./config/RestInterceptor";
import Header from "./component/Header/Header";
import themeColors from './assets/jscss/colors';
import './styles.scss';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

setupInterceptors();


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                        <Grid container spacing={0} direction='column'>

                            <Grid item xs={8} className={'header-padding'}>
                                <Header />
                            </Grid>

                            <Container maxWidth="md" style={{ height: '80vh', marginBottom: '20%' }}>
                                <Routes />
                            </Container>
                        </Grid>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;