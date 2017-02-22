import React from 'react';
import styles from './styles.css';


const File = ({ isSelect,type,name,onSelect }) => {
	
	let active = isSelect ? styles.active : '';
	let icon   = styles['icon_'+type];
	if (!icon) icon=styles['icon_file'];
	
	return (
		<div className = { [styles.file,active].join(" ") } >
			<div className={icon}></div>
			<div className={styles.text}>
				{name}
			</div>
			<span className={styles.checkbox} onClick = { onSelect } ></span>
		</div>
	)
}


File.propTypes={};


export default File;



