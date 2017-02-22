import React from 'react';
import styles from './styles.css';
import {  Radio } from 'antd';


const Mode = (props) => {
	return (
		<div className = { styles.mode } >
			<Radio.Group defaultvalue="block" >
				<Radio.Button value="block" checked={true} >
					<i className="fa fa-th-large" ></i>
				</Radio.Button>
				<Radio.Button value="list" >
					<i className="fa fa-list-ul" ></i>
				</Radio.Button>
			</Radio.Group>
		</div>
	)
}



Mode.propTypes={};


export default Mode;



