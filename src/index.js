import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Login from './auth/Login';
import Register from './auth/Register';
// import Dashboard from './Dashboard';
import Mainpage from './component/mainpage';
import VCARD from './component/vcardpage';
import WORKINGHOURS from './component/workinghours';
import CONTACT from './component/contact';
import EDIT from './component/edit';
import './Login.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/:GUIDid' component={Mainpage} />
            <Route path='/:GUIDid/edit' component={EDIT} />
            <Route path='/:GUIDid/vcard' component={VCARD} />
            <Route path='/:GUIDid/workinghours' component={WORKINGHOURS} />
            <Route path='/:GUIDid/contact' component={CONTACT} />
            {/* <Route component={NotFound}/> */}
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);