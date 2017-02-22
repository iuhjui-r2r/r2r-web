import React from 'react';
import styles from './styles.css';
import { Button } from 'antd';


const Menu = ({ bus })=>{
	
	let onMkdir = ()=>{
		bus.publish("MKDIR_MODAL_OPEN")
	}
	
	
	return (
		<div className = { styles.menu } >
			<div className = { styles.item } >
				<Button size="large" >
					<i className="fa fa-cloud-upload"></i>
					<p className = { styles.text } >
						发布资源
					</p>
				</Button>
			</div>
			<div className = { styles.item } >
				<Button size="large" onClick = { onMkdir } >
					<i className="fa fa-folder-o" ></i>
					<p className = { styles.text } >
						新建文件夹
					</p>
				</Button>
			</div>
			<div className = { styles.item } >
				<Button size="large" >
					<i className="fa fa-cloud-download" ></i>
					<p className = { styles.text } >
						获得资源
					</p>
				</Button>
			</div>
			<div className = { styles.item } >
				<Button size="large" >
					<i className="fa fa-share" ></i>
					<p className = { styles.text } >
						分享资源
					</p>
				</Button>	
			</div>
		</div>
	);
};


Menu.propTypes={}

export default Menu;




