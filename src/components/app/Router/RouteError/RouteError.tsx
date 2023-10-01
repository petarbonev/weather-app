import React, { FC, memo, useMemo } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { getKey } from '../../../../i18n';
import styles from './RouteError.module.css';

const RouteError: FC = () => {
    const error = useRouteError();
    const message = useMemo(() => isRouteErrorResponse(error) ? error.statusText : (error as string), [error]);

    return (
        <div className={styles['route-error']}>
            <h1>{getKey('label.oops')}</h1>
            <p className={styles['description']}>
                {getKey('error.UnexpectedError')}
            </p>
            <p className={styles['error']}>
                <i>{message}</i>
            </p>
        </div>
    );
};

export default memo(RouteError);
