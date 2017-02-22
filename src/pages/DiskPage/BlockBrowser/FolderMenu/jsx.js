import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger,SubMenu } from "react-contextmenu";


const FolderMenu = ({ id,onEvent })=>{
	
	const onHandle = (e,data,target) => {
		onEvent(data);
	}
	
	return (
		<ContextMenu id={id}>
			<MenuItem onClick = { onHandle } data = { {type:"open_folder"} } >
				打开
			</MenuItem>
			<MenuItem>
				分享
			</MenuItem>
			<MenuItem onClick = { onHandle } data = { {type:"copy"} }  >
				复制到
			</MenuItem>
			<MenuItem onClick = { onHandle } data = { {type:"move"} }  >
				移动到
			</MenuItem>
			<MenuItem onClick = { onHandle } data = { {type:"rename"} }  >
				重命名
			</MenuItem>
			<MenuItem onClick = { onHandle } data = { {type:"remove"} }  >
				删除
			</MenuItem>
		</ContextMenu>
	);
}

FolderMenu.propTypes={};


export default FolderMenu;