import * as React from 'react';
import { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Account from './modules/account/Account';
import LoginView from './modules/user/LoginView';
import RegisterView from './modules/user/RegisterView';

export default class Routes extends PureComponent {
  render() {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={LoginView} />
            <Route path="/register" component={RegisterView} />
            <Route path="/account" component={Account} />
        </Switch>
    </BrowserRouter>
    )
  }
}
