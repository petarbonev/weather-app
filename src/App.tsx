import React from 'react';
import { cond, T } from 'ramda';
import { GeolocationContext } from './constants/geolocation';
import useGeolocation from './hooks/useGeolocation';
import Loader from './components/common/Loader/Loader';
import GeolocationError from './components/geolocation/GeolocationError/GeolocationError';
import Root from './components/app/Root/Root';
import styles from './App.module.css';

const App = () => {
    const { geolocation, loading, error } = useGeolocation();

    return (
        <GeolocationContext.Provider value={geolocation}>
            <div className={styles['app-container']}>
                {cond([
                    [() => loading, () => <Loader />],
                    [() => !!error, () => <GeolocationError error={error} />],
                    [T, () => <Root />],
                ])()}
            </div>
        </GeolocationContext.Provider>
    );
};

export default App;
