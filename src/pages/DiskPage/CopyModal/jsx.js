import React from 'react';
import styles from './styles.css';
import { message,Modal, Tree } from 'antd';

const Node = Tree.TreeNode;


// 映射到树组件
const mapToTree = (node) => {
	if (node.list.length > 0){
		let comps = [];
		node.list.forEach((el)=>{
			let comp = mapToTree(el)
			comps.push(comp)
		});
		return (
			<Node title = { node.name } key = { node.id }  >
				{ comps }
			</Node>
		);
	}else{
		return (
			<Node title = { node.name } key = { node.id } />
		);
	}
}


const CopyModal = ({ tree,visible,load,source_id,target_id,bus })=>{
	
	const onSelect = ( keys ) =>{
		let key = keys[0]
		if(key){
			bus.publish("COPY_MODAL_CHANGE",{ key })
		}else{
			bus.publish("COPY_MODAL_CHANGE",{ key:"" })
		}
	}
	
	let onOk = ()=>{
		if (target_id == ""){
			message.error("请选择一个目录")
			return;
		}
		bus.publish("COPY_MODAL_CONFIRM",{source_id,target_id})
	}
	
	const onCancel = ()=>{
		bus.publish("COPY_MODAL_CLOSE",{});
	}
	
	
	let comp = mapToTree(tree);
	
	return (
		<div>
			<Modal 
				title          = "复制到" 
				visible        = { visible } 
				confirmLoading = { load }
				onOk           = { onOk }
				onCancel       = { onCancel }
				maskClosable   = { false }
			>
				<div className = { styles.panel } >
					<Tree 
						onSelect     = { onSelect } 
						selectedKeys = { [target_id] }
					>
						{ comp }
					</Tree>
				</div>
			</Modal>
		</div>
	)
}

CopyModal.propTypes={};


export default CopyModal;




