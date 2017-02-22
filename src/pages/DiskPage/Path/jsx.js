import React from 'react';
import styles from './styles.css';
import { Breadcrumb } from 'antd';



const makeLast = ( folder ) =>{
	return (
		<Breadcrumb.Item>
			{ folder.name }
		</Breadcrumb.Item>
	);
}


const makeChain = (data,onEvent)=>{
	let array = []
	if (data.length == 0){
		return []
	}
	let last = makeLast(data.pop());
	data.forEach((folder,i)=>{
		const onClick = ()=>{
			onEvent(folder)
		}
		let comp = (
			<Breadcrumb.Item>
				<a onClick = { onClick }>{ folder.name }</a>
			</Breadcrumb.Item>
		);
		array.push(comp)
	});
	array.push(last)
	
	return array
}


const Path = ({ path,bus }) => {
	let data = [ ...path ]
	if( data.length == 1 ){
		return (
			<div className = { styles.path } >
				<p>全部文件</p>
			</div>
		);
	}
	
	var root = data.shift()
	var prev = data[data.length-2];
	
	
	const onRoot = () => {
		bus.publish("OPEN_FOLDER",{ folder:root })
	}
	
	const onPrev = () => {
		if (prev){
			bus.publish("OPEN_FOLDER",{ folder:prev })
		}else{
			bus.publish("OPEN_FOLDER",{ folder:root })
		}
	}
	
	const onEvent = (folder) => {
		bus.publish("OPEN_FOLDER",{ folder })
	}
	
	var chain = makeChain(data,onEvent)
	
	
	return (
		<div className = { styles.path } >
			<div className = { styles.anchor }>
				<a onClick = { onPrev } >
					返回上一级
				</a>
				<span className = { styles.delim } >
					|
				</span>
				<a onClick = { onRoot } >
					全部文件
				</a>
				<span className = { styles.delim } >
					|
				</span>
			</div>
			<div className = { styles.chain } >
				<Breadcrumb separator=">">
					{[ chain ]}
				</Breadcrumb>
			</div>
		</div>
	);
} 


Path.propTypes={};


export default Path;



