import React from 'react';
import styles from './styles.css';
import { Checkbox } from 'antd';

const CheckAll = (props) => {
	return (
		<div className = { styles.check_all } >
			<Checkbox>
				全选
			</Checkbox>
		</div>
	)
}


CheckAll.propTypes={};


export default CheckAll;




