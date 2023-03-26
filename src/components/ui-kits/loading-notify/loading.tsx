import React from 'react';
import styles from './loading.module.scss';

export interface Props {
    children?: React.ReactNode;
}

const Loading: React.FC<Props> = () => {
    return (
        <div
            id={`${styles.loadingParent}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%'
            }}
        >
            <div className={`${styles.loading}`}>
                <svg width="200" height="200" viewBox="0 0 40 60">
                    <polygon id={`${styles.loader_triangle}`} fill="none" stroke="#fff" strokeWidth="1" points="16,1 32,32 1,32" />
                    <text className={`${styles.loader_loading_text}`} x="0" y="45" fill="#fff">
                        Loading...
                    </text>
                </svg>
            </div>
        </div>
    )
}

export default Loading;
