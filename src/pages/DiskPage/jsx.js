import React, { Component, PropTypes } from 'react';
import EventBus from "@nsisodiya/eventbus";

import styles from "./styles.css";
import { connect } from 'dva';
import { message } from "antd";


import Layout from "./Layout"
import Menu from "./Menu"
import Search from "./Search"
import Mode from "./Mode"
import Path from "./Path"
import Total from "./Total"
import CheckAll from "./CheckAll"
import BlockBrowser from "./BlockBrowser"
import MkdirModal from "./MkdirModal"
import RenameModal from "./RenameModal"
import MoveModal from "./MoveModal"
import CopyModal from "./CopyModal"


function DiskPage({ disk ,dispatch }){
	
	let bus = new EventBus()
	bus.subscribe("SELECT",function( { file } ){
		dispatch({
			type : "disk/select",
			payload:{ file }
		});	
	});
	
	//目录相关
	bus.subscribe("OPEN_FOLDER",function({ folder }){
		dispatch({
			type    : "disk/open_folder",
			payload : { folder }
		});
	});
	
	//文件夹创建相关
	bus.subscribe("MKDIR_MODAL_OPEN",function(){
		dispatch({
			type:"disk/mkdir_modal_open"
		});
	});
	bus.subscribe("MKDIR_MODAL_CHANGE",function({ text }){
		dispatch({
			type : "disk/mkdir_modal_change",
			payload:{text},
		});
	});
	bus.subscribe("MKDIR_MODAL_CONFIRM",function({ name }){
		let parent_id = disk.path[disk.path.length-1].id
		dispatch({
			type    : "disk/mkdir",
			payload : { parent_id,name }
		});
	});
	bus.subscribe("MKDIR_MODAL_CLOSE",function(){
		dispatch({
			type : "disk/mkdir_modal_close",
		});
	});
	
	//重命名相关
	bus.subscribe("RENAME_MODAL_OPEN",function({ file }){
		dispatch({
			type:"disk/rename_modal_open",
			payload : { source:file.name }
		});	
	});
	bus.subscribe("RENAME_MODAL_CHANGE",function({ text }){
		dispatch({
			type : "disk/rename_modal_change",
			payload : { text },
		});
	});
	bus.subscribe("RENAME_MODAL_CONFIRM",function( { name } ){
		let parent_id = disk.path[disk.path.length-1].id
		dispatch({
			type    : "disk/rename",
			payload : { 
				parent_id : parent_id,
				source    : disk.modal.rename.source,
				target    : name
			}
		});
	});
	bus.subscribe("RENAME_MODAL_CLOSE",function(){
		dispatch({
			type : "disk/rename_modal_close",
		});
	});
	
	//删除相关
	bus.subscribe("REMOVE_FILE",function({ file }){
		let parent_id = disk.path[disk.path.length-1].id
		dispatch({
			type : "disk/remove",
			payload:{ parent_id:parent_id,id:file.id }
		});
	});
	
	//移动文件相关
	bus.subscribe("MOVE_MODAL_OPEN",function({ file }){
		dispatch({
			type    : "disk/move_modal_open",
			payload : { source_id :file.id+"" },
		});
	});
	bus.subscribe("MOVE_MODAL_CHANGE",function({ key }){
		dispatch({
			type    : "disk/move_modal_change",
			payload : { target_id:key },
		});
	});
	bus.subscribe("MOVE_MODAL_CONFIRM",function( { source_id,target_id } ){
		let parent_id = disk.path[disk.path.length-1].id
		dispatch({
			type    : "disk/move",
			payload : { 
				parent_id : parent_id,
				source_id : source_id,
				target_id : target_id,
			}
		});
	});
	bus.subscribe("MOVE_MODAL_CLOSE",function(){
		dispatch({
			type    : "disk/move_modal_close",
			payload : {},
		});
	});
	
	//复制文件相关
	bus.subscribe("COPY_MODAL_OPEN",function({ file }){
		dispatch({
			type    : "disk/copy_modal_open",
			payload : { source_id :file.id+"" },
		});
	});
	bus.subscribe("COPY_MODAL_CHANGE",function({ key }){
		dispatch({
			type    : "disk/copy_modal_change",
			payload : { target_id:key },
		});
	});
	bus.subscribe("COPY_MODAL_CONFIRM",function( { source_id,target_id } ){
		let parent_id = disk.path[disk.path.length-1].id
		dispatch({
			type    : "disk/copy",
			payload : { 
				parent_id : parent_id,
				source_id : source_id,
				target_id : target_id,
			}
		});
	});
	bus.subscribe("COPY_MODAL_CLOSE",function(){
		dispatch({
			type    : "disk/copy_modal_close",
			payload : {},
		});
	});
	
	
	
	return (
		<div className = { styles.disk } >
			<Layout 
				Menu     = {( <Menu bus = { bus } /> )}
				Search   = {( <Search/> )}
				Mode     = {( <Mode/> )}
				Path     = {( <Path path = { disk.path }  bus = { bus } /> )}
				Total    = {( <Total/> )}
				CheckAll = {( <CheckAll/> )}
				Browser  = {( <BlockBrowser  list = { disk.list } bus = { bus } /> )}
			/>
			<MkdirModal 
				visible = { disk.modal.mkdir.visible } 
				load    = { disk.modal.mkdir.load }
				text    = { disk.modal.mkdir.text }
				bus     = { bus } 
			/>
			<RenameModal 
				visible = { disk.modal.rename.visible } 
				load    = { disk.modal.rename.load }
				text    = { disk.modal.rename.text }
				bus     = { bus }
			/>
			<MoveModal 
				tree      = { disk.tree }
				visible   = { disk.modal.move.visible }
				load      = { disk.modal.move.load }
				source_id = { disk.modal.move.source_id } 
				target_id = { disk.modal.move.target_id } 
				bus       = { bus }
			/>
			<CopyModal 
				tree      = { disk.tree }
				visible   = { disk.modal.copy.visible }
				load      = { disk.modal.copy.load }
				source_id = { disk.modal.copy.source_id } 
				target_id = { disk.modal.copy.target_id } 
				bus       = { bus }
			/>
		</div>
	);
};

DiskPage.propTypes = {
};

function mapStateToProps({disk}) {
    return {disk};
}

export default connect(mapStateToProps)(DiskPage);



