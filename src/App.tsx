import React from 'react';
import { cond, T } from 'ramda';
import useGeolocation from './hooks/useGeolocation';
import Loader from './components/common/Loader/Loader';
import GeolocationError from './components/geolocation/GeolocationError/GeolocationError';
import styles from './App.module.css';

const App = () => {
    const { loading, error } = useGeolocation();

    return (
        <div className={styles['app-container']}>
            {cond([
                [() => loading, () => <Loader />],
                [() => !!error, () => <GeolocationError error={error} />],
                [T, () => null],
            ])()}
        </div>
    );
};

export default App;
