import './index.html';
import './index.css';
import 'antd/dist/antd.css'
import 'font-awesome/css/font-awesome.css'


import dva from 'dva';

import { HomeModel,DiskModel } from "./models"



// 1. Initialize
const app = dva();

// 2. Plugins
//app.use({});

// 3. Model
app.model(HomeModel);
app.model(DiskModel);

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

