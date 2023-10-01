import React, { FC, memo } from 'react';
import { ErrorProps } from './Error.types';
import { getKey } from '../../../i18n';
import styles from './Error.module.css';

const Error: FC<ErrorProps> = props => {
    const { error } = props;

    return (
        <div className={styles['error-container']}>
            <h1>{getKey('label.oops')}</h1>
            <p className={styles['description']}>
                {getKey('error.UnexpectedError')}
            </p>
            <p className={styles['error']}>
                <i>{error}</i>
            </p>
        </div>
    );
};

export default memo(Error);
