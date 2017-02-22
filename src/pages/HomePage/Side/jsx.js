import React from 'react';
import styles from './styles.css';

const Side = (props) => {
    return (
        <ul className={styles.side}>
            <li className={styles.active}>
                <span className={styles.left}></span>
                <span className={styles.right}>
                    全部文件
                </span>
            </li>
            <li >
                <span className={styles.left}></span>
                <span className={styles.right}>
                    图片
                </span>
            </li>
            <li >
                <span className={styles.left}></span>
                <span className={styles.right}>
                    文档
                </span>
            </li>
            <li >
                <span className={styles.left}></span>
                <span className={styles.right}>
                    视频
                </span>
            </li>
            <li >
                <span className={styles.left}></span>
                <span className={styles.right}>
                    种子
                </span>
            </li>
            <li >
                <span className={styles.left}></span>
                <span className={styles.right}>
                    音乐
                </span>
            </li>
            <li >
                <span className={styles.left}></span>
                <span className={styles.right}>
                    其他
                </span>
            </li>
        </ul>
    );
}

Side.propTypes={};

export default Side;
