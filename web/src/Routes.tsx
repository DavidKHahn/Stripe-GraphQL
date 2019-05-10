import * as React from 'react';
import { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SubscribeUser from './modules/account/SubscribeUser';
import LoginView from './modules/user/LoginView';
import MeView from './modules/user/MeView';
import RegisterView from './modules/user/RegisterView';

export default class Routes extends PureComponent {
  render() {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={LoginView} />
            <Route path="/register" component={MeView} />
            <Route path="/me" component={RegisterView} />
            <Route path="/subscription" component={SubscribeUser} />
        </Switch>
    </BrowserRouter>
    )
  }
}
