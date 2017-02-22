import React from 'react';
import styles from './styles.css';
import { message,Modal,Input } from 'antd';



const RenameModal = ({ visible,load,text,bus })=>{
	let onChange = (e)=>{
		let val = e.target.value;
		bus.publish("RENAME_MODAL_CHANGE",{text:val})	
	}
	
	let onOk = ()=>{
		if (text == ""){
			message.error("文件名不能为空")
			return;
		}
		bus.publish("RENAME_MODAL_CONFIRM",{name:text})
	}
	
	let onCancel = ()=>{
		bus.publish("RENAME_MODAL_CLOSE")
	}
	
	return (
		<div>
			<Modal 
				title          = "重命名" 
				visible        = { visible } 
				confirmLoading = { load }
				maskClosable   = { false }
				onOk           = { onOk }  
				onCancel       = { onCancel } 
			>
				<Input 
					placeholder = "请输入文件名"  
					onChange    = { onChange } 
					value       = { text } 
				/>
			</Modal>
		</div>
	)
}

RenameModal.propTypes={};


export default RenameModal;




