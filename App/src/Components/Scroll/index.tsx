import React, { useState, useEffect, ReactNode, ReactChild, ReactElement, useRef } from 'react';
import styles from './style.scss';

interface scrollProps {
    width?: string;
    height?: string;
    hidden?: boolean;
    children?: ReactNode;
}

const Scroll: React.FC<scrollProps> = ({ children, width, height }): JSX.Element => {
    return (
        <div className={styles.scroll_container} style={{ width, height }}>
            <div className={styles.scroll_box}>{children}</div>
            <div className={styles.scroll_bar}></div>
        </div>
    );
};

export default Scroll;
