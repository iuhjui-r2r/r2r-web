import React, { Component, PropTypes } from 'react';
import { Row , Col } from 'antd'
import styles from './styles.css';



function Layout({ Nav , Side , Render }){
	return (
		<Row className={styles.all} >
            <Row className={styles.top} >
                <Col span="3">
                    <span className={styles.logo} >
                        R2R-WEB
                    </span>
                </Col>
                <Col span="21">
					{ Nav }
                </Col>
            </Row>
            <Row className={styles.main} >
                <Col span="3"  className={styles.side} >
                    { Side }
                </Col>
                <Col span="21" className={styles.content} >
					<div className = {styles.render} >
						{ Render }
					</div>
                </Col>
            </Row>
        </Row>
	);
};

Layout.propTypes = {
};


export default Layout



