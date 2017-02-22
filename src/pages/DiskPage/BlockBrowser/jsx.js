import React from 'react';
import styles from './styles.css';
import { ContextMenuTrigger} from "react-contextmenu";

import File from "./File"
import FileMenu from './FileMenu';
import FolderMenu from "./FolderMenu"


const FileMenuID   = "file_menu_id" 
const FolderMenuID = "folder_menu_id"


const collect = (props) => {
    return { fileID: props.fileID };
}

const CreateFile = ({fileID,name,type,select,onSelect})=>{
	let onHandle = () =>{
		onSelect(fileID)
	}
	return (
		<div className = { styles.file }   >
			<ContextMenuTrigger id = { FileMenuID } fileID = { fileID } collect = { collect } >
				<File name = { name } type = { type } isSelect = { select }  onSelect = { onHandle }  />
			</ContextMenuTrigger>
		</div>
	)
}

const CreateFolder = ({ fileID,name,select,onSelect }) => {
	let onHandle = () =>{
		onSelect(fileID)
	}
	
	return (
		<div className = { styles.file }   >
			<ContextMenuTrigger id = { FolderMenuID } fileID = { fileID } collect = { collect } >
				<File name = { name } type = "folder" isSelect = { select }  onSelect = { onHandle } />
			</ContextMenuTrigger>
		</div>
	);
}


const BlockBrowser = ({ list,bus }) => {
	
	let onSelect = (fileID) => {
		let file = list[fileID]
		bus.publish("SELECT", { file });
	}
		
	let onMenu = ({ type,fileID }) => {
		if ( type == "rename" ){
			let file = list[fileID];
			return bus.publish("RENAME_MODAL_OPEN",{file});	
		}
		if ( type == "open_folder" ){
			let folder = list[fileID]
			return bus.publish("OPEN_FOLDER",{ folder });
		}
		if ( type == "remove" ){
			let file = list[fileID]
			return bus.publish("REMOVE_FILE",{ file });
		}
		if ( type == "move" ){
			let file = list[fileID]
			return  bus.publish("MOVE_MODAL_OPEN",{ file });
		}
		if ( type == "copy" ){
			let file = list[fileID]
			return  bus.publish("COPY_MODAL_OPEN",{ file });
		}
	}
	
	
	let FileList = list.map(function(el,i){
		let fileID = i;
		if (el.type == "folder") {
			return CreateFolder({ ...el,fileID,onSelect})
		}else{
			return CreateFile({ ...el,fileID,onSelect });
		}
	})
	
	return (
		<div className = { styles.block_browser } >
			{[ FileList ]}
			<FileMenu id = { FileMenuID } onEvent = { onMenu } />
			<FolderMenu id = { FolderMenuID } onEvent = { onMenu } />
		</div>
	)
}


BlockBrowser.propTypes={};


export default BlockBrowser;




