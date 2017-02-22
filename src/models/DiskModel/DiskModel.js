import DiskService from "../../services/DiskService"
import { message } from "antd"





const DiskModel = {
	namespace     : "disk",
	state         : {
		//路径,这是一个先进后出的栈结构,负责表达文件系统的层级结构
		path  : [{id:0,name:"全部文件",type:"folder",parent_id:-1}],
		//目录树,负责表达目录的树结构
		tree  : {id:0,name:"全部文件",list:[]},
		//文件列表负责保存基本的文件对象
		list  : [],
		//该目录下的总元素数
		total : 0,
		// 对话框相关
		modal : {
			mkdir : {
				visible : false,
				load    : false,
				text    : "",
			},
			rename : {
				visible : false,
				load    : false,
				text    : "",
				source  : "",
				target  : "",
			},
			move : {
				visible : false,
				load    : false,
				source_id  : "",
				target_id  : "",
			},
			copy : {
				visible : false,
				load    : false,
				source_id  : "",
				target_id  : "",
			},
		},
	},
	reducers      : {
		update(state,{ payload }){
			let data = {}
			if (payload.list){
				data.list=payload.list
			}
			if (payload.path){
				data.path=payload.path
			}
			if (payload.tree){
				
				data.tree=payload.tree
			}
			return { ...state,...data }
		},
		select( state ,{ payload : { file } }){
			state.list.forEach((el,i)=>{
				if (el.id == file.id){
					el.select = !el.select
					return false;
				}
			});
			return { ...state }
		},
		// 文件夹创建相关
		mkdir_modal_open(state){
			state.modal.mkdir.visible = true
			return { ...state }
		},
		mkdir_modal_change(state,{ payload : { text } }){
			state.modal.mkdir.text = text
			return { ...state }
		},
		mkdir_modal_load(state,action){
			state.modal.mkdir.load = action.payload
			return { ...state }
		},
		mkdir_modal_close(state){
			if (state.modal.mkdir.load){
				return state
			}
			state.modal.mkdir.visible = false
			state.modal.mkdir.text = ""
			return { ...state }
		},
		// 重命名相关
		rename_modal_open( state , { payload : { source } } ){
			state.modal.rename.visible = true
			state.modal.rename.source  = source
			return { ...state }
		},
		rename_modal_change(state,{ payload : { text } }){
			state.modal.rename.text = text
			return { ...state }
		},
		rename_modal_load(state,action){
			state.modal.rename.load = action.payload;
			return { ...state }
		},
		rename_modal_close( state ){
			if (state.modal.rename.load){
				return state
			}
			state.modal.rename.visible = false
			state.modal.rename.text = ""
			state.modal.rename.source = ""
			return { ...state }
		},
		//文件移动相关
		move_modal_open( state,{ payload : { source_id } } ){
			state.modal.move.visible = true;
			state.modal.move.source_id  = source_id+""
			state.modal.move.target_id  = ""
			return { ...state }
		},
		move_modal_change(state,{ payload :{ target_id } }){
			state.modal.move.target_id = target_id;
			return { ...state }
		},
		move_modal_load(state,action){
			state.modal.move.load = action.payload;
			return { ...state }
		},
		move_modal_close(state){
			if (state.modal.move.load){
				return state
			}
			state.modal.move.visible = false;
			return { ...state }
		},
		//文件复制相关 
		copy_modal_open( state,{ payload : { source_id } } ){
			state.modal.copy.visible = true;
			state.modal.copy.source_id  = source_id+""
			state.modal.copy.target_id  = ""
			return { ...state }
		},
		copy_modal_change(state,{ payload :{ target_id } }){
			state.modal.copy.target_id = target_id;
			return { ...state }
		},
		copy_modal_load(state,action){
			state.modal.copy.load = action.payload;
			return { ...state }
		},
		copy_modal_close(state){
			if (state.modal.copy.load){
				return state
			}
			state.modal.copy.visible = false;
			return { ...state }
		},
	},
	effects       : {
		*fetch_list({ payload : { parent_id = 0 } },{call,put}){
			let { data  } = yield call(DiskService.fetch_list, { parent_id });
			if (data.success) {
				yield put({type:"update",payload : data });
			}else{
				message.error(data.info);
			}
		},
		*fetch_tree( { payload }, { call,put } ){
			let { data  } = yield call(DiskService.fetch_tree,{});
			if (data.success) {
				yield put({type:"update",payload : data });
			}else{
				message.error(data.info);
			}
		},
		*open_folder(  { payload : { folder } },{ call,put }  ){
			yield put({type : "fetch_list",payload:{ parent_id:folder.id } })
		},
		*mkdir({ payload : { parent_id,name } },{ call,put }){
			yield put({type : "mkdir_modal_load",payload:true});
			let { data } = yield call(DiskService.mkdir, { parent_id,name });
			yield put({type : "mkdir_modal_load",payload:false});
			yield put({type : "mkdir_modal_close"});
			
			if (data.success) {
				yield put({type:"fetch_list",payload:{ parent_id }})
				yield put({type:"fetch_tree",payload:{  }})
			}else{
				message.error(data.info);
			}
		},
		*rename( { payload : { parent_id,source,target } },{ call ,put } ){
			yield put({type : "rename_modal_load",payload:true});
			let { data } = yield call(DiskService.rename, { parent_id,source,target });
			yield put({type : "rename_modal_load",payload:false});
			yield put({type : "rename_modal_close"});
			
			if (data.success ){
				yield put({type : "fetch_list",payload:{parent_id}})
				yield put({type : "fetch_tree",payload:{}})
			}else{
				message.error(data.info)
			}
		},
		*remove( { payload :{ parent_id,id } },{ call,put } ){
			let { data } = yield call(DiskService.remove, { id });
			if (data.success ){
				yield put({type : "fetch_list",payload:{parent_id}})
				yield put({type : "fetch_tree",payload:{}})
			}else{
				message.error(data.info)
			}
		},
		*move( { payload : { parent_id,source_id, target_id} },{ call,put } ){
			yield put({type : "move_modal_load",payload:true});
			let { data } = yield call(DiskService.move, { source_id,target_id });
			yield put({type : "move_modal_load",payload:false});
			yield put({type : "move_modal_close"});
			
			if (data.success) {
				yield put({type:"fetch_list",payload:{ parent_id }})
				yield put({type:"fetch_tree",payload:{  }})
			}else{
				message.error(data.info);
			}
		},
		*copy( { payload : { parent_id,source_id, target_id} },{ call,put } ){
			yield put({type : "copy_modal_load",payload:true});
			let { data } = yield call(DiskService.copy, { source_id,target_id });
			yield put({type : "copy_modal_load",payload:false});
			yield put({type : "copy_modal_close"});
			
			if (data.success) {
				yield put({type:"fetch_list",payload:{ parent_id }})
				yield put({type:"fetch_tree",payload:{  }})
			}else{
				message.error(data.info);
			}
		},
	},
	subscriptions : {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathname === '/') {
					dispatch({ type: 'fetch_list', payload:{} });
					dispatch({ type: 'fetch_tree', payload:{} });
				}
			});
		},
	},
};


export default DiskModel