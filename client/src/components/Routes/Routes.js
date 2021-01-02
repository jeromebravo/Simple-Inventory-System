import React from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';
import {removeAlert} from '../../actions/alert';
import {connect} from 'react-redux';
import Landing from '../layout/Landing';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import Product from '../product/Product';
import Income from '../income/Income';
import Expense from '../expense/Expense';
import Profile from '../profile/Profile';

const Routes = ({removeAlert}) => {
    const history = useHistory();

    history.listen(() => {
        removeAlert();
    });

    return (
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/products' component={Product} />
            <Route exact path='/income' component={Income} />
            <Route exact path='/expense' component={Expense} />
            <Route exact path='/profile' component={Profile} />
            <Route path='*' render={() => history.push('/')} />
        </Switch>
    );
}

export default connect(null, {removeAlert})(Routes);