import React from 'react';
import styles from './styles.css';
import { Input } from 'antd';


const Search = (props)=>{
	return (
		<div className = { styles.search } >
			<Input.Search 
				 placeholder = "搜索您的文件"
			/>	
		</div>
	)
}


Search.propTypes={};

export default Search;



