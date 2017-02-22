import request from '../../utils/request';

const PAGE_SIZE = 10

const URL = "http://192.168.253.105:3000"

export function fetch_list({ parent_id=0 }){
	return request(URL+`/api/disk/fetch_list?parent_id=${parent_id}`);
}

export function fetch_tree(){
	return request(URL+"/api/disk/fetch_tree?parent_id=0")
}


export function mkdir({ parent_id = 0 ,name }){
	return request(URL+"/api/disk/mkdir",{
		method  : "POST",
		body    : JSON.stringify({ parent_id,name })
	})
}

export function rename({ parent_id,source,target }){
	return request(URL+"/api/disk/rename",{
		method : "POST",
		body   : JSON.stringify({ parent_id,source,target })
	});
}

export function remove({ id }){
	return request(URL+"/api/disk/remove",{
		method : "POST",
		body   : JSON.stringify({id})
	});
}

export function move({ source_id,target_id }){
	return request(URL+"/api/disk/move",{
		method : "POST",
		body   : JSON.stringify({
			source_id : parseInt(source_id),
			target_id : parseInt(target_id),
		})
	});
}

export function copy({ source_id,target_id }){
	return request(URL+"/api/disk/copy",{
		method : "POST",
		body   : JSON.stringify({
			source_id : parseInt(source_id),
			target_id : parseInt(target_id),
		})
	});
}






