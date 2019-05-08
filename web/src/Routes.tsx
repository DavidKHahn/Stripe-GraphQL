import * as React from 'react';
import {PureComponent} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginView from './modules/user/LoginView';
import MeView from './modules/user/MeView';
import RegisterView from './modules/user/RegisterView';


export default class Routes extends PureComponent {
  render() {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={LoginView} />
            <Route path="/login" component={MeView} />
            <Route path="/login" component={RegisterView} />
        </Switch>
    </BrowserRouter>
    )
  }
}
