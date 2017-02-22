import React, { Component, PropTypes } from 'react';
import { Row , Col , Menu , Button } from 'antd'
import Layout from "./Layout"
import Nav from './Nav';
import Side from './Side';


import { connect } from 'dva';

import styles from './styles.css';


/*
import { Link } from 'dva/router';
import FileManager from '../../components/FileManager'

import Side from '../../components/Side';
import { routerRedux } from 'dva/router';
*/





const SubMenu = Menu.SubMenu;

const MenuItem = Menu.Item;



function HomePage(props){
	return (
		<Layout 
			Nav  = {(<Nav/>)} 
			Side = {(<Side/>)}
			Render = {(props.children)}
		/>
	);
};

HomePage.propTypes = {
};

function mapStateToProps({home}) {
    return {home};
}

export default connect(mapStateToProps)(HomePage);





/*

function IndexPage({main,dispatch}) {
	
	const {filelist} = main
	
	
	setTimeout(()=>{
		dispatch({
			type:'main/fetch',
			payload:{}
		});
	},500);
	
	
	
	const onMkdir = (path) => {
	
		console.log("ip mkdir success");
	}
	
	const onChange = (event)=>{
		dispatch({
			type:'main/select_file',
			payload:event.data,
		});
	}
	
	const onOperation = (event)=>{
		if (event.type == 'reload') {
			dispatch({
				type:'main/fetch',
				payload:{}
			});
		}
	}

    return (
        <Row className={styles.all} >
            <Row className={styles.top} >
                <Col span="3">
                    <span className={styles.logo} >
                        R2R-WEB
                    </span>
                </Col>
                <Col span="21">
                    <Nav></Nav>
                </Col>
            </Row>
            <Row className={styles.main} >
                <Col span="3"  className={styles.side} >
                    <Side></Side>
                </Col>
                <Col span="21" className={styles.content} >
					<FileManager root={filelist} onMkdir={onMkdir} onChange={onChange} onOperation={onOperation} ></FileManager>
                </Col>
            </Row>
        </Row>
    );
}


IndexPage.propTypes = {
};


function mapStateToProps({main}) {
    return {main};
}



export default connect(mapStateToProps)(IndexPage);
*/