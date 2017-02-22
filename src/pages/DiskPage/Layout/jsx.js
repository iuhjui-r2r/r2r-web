import React from 'react';
import styles from './styles.css';
import Scroll from 'react-scrollbar';


const Layout = ({ Menu,Search,Mode,Path,Total,CheckAll,Browser })=>{
	return (
		<div className={ styles.root } >
			<div className = { styles.layer1} >
				<div className = { styles.menu } >
					{ Menu }
				</div>
				<div className = { styles.mode } >
					{ Mode }
				</div>
				<div className = { styles.search }  >
					{ Search }
				</div>
			</div>
			<div className = { styles.layer2 } >
				<div className = { styles.path } >
					{ Path }
				</div>
				<div className = { styles.total } >
					{ Total }
				</div>
			</div>
			<div className = { styles.layer3 } >
				<div className = { styles.check_all } >
					{ CheckAll }
				</div>
			</div>
			<div className = { styles.layer4 }  >
				<div className = { styles.browser } >
					<Scroll speed={1.2} className = { styles.browser } >
						{ Browser }
					</Scroll>
				</div>
			</div>
		</div>
	)
}

Layout.propTypes={};


export default Layout;




