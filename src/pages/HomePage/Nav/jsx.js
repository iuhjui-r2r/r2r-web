import React from 'react';
import styles from './styles.css';


const Nav = (props)=>{
    return (
        <ul className={styles.nav}>
            <li>网盘</li>
            <li>发现资源</li>
            <li>我的共享</li>
            <li>朋友</li>
        </ul>
    );
}

Nav.propTypes={}

export default Nav;
