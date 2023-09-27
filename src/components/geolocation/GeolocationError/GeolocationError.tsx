import React, { FC, memo } from 'react';
import { GeolocationErrorProps } from './GeolocationError.types';
import { getKey } from '../../../i18n';
import styles from './GeolocationError.module.css';

const GeolocationError: FC<GeolocationErrorProps> = props => {
    const { error } = props;

    return (
        <div className={styles['geolocation-error-container']}>
            <h1>{getKey('label.oops')}</h1>
            {<p>{getKey(`error.${error}`)}</p>}
        </div>
    );
};

export default memo(GeolocationError);
