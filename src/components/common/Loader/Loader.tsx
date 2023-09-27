import React, { FC, memo } from 'react';
import { LoaderProps } from './Loader.types';
import styles from './Loader.module.css';

const Loader: FC<LoaderProps> = props => {
    const { className } = props;

    return (
        <div className={`${styles['loader-container']} ${className}`}>
            <div className={styles['loader']} />
        </div>
    );
};

export default memo(Loader);
