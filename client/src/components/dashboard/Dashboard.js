import React, {Fragment, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getDashboard, selectDate} from '../../actions/dashboard';
import Navbar from '../layout/Navbar';
import Sidenav from '../layout/Sidenav';
import Spinner from '../layout/Spinner';
import CapitalSVG from '../../svg/capital.svg';
import ExpenseSVG from '../../svg/expense.svg';
import GrossIncomeSVG from '../../svg/grossIncome.svg';
import NetIncomeSVG from '../../svg/netIncome.svg';
import Date from '../popup/Date';

const Dashboard = ({auth, getDashboard, selectDate, dashboard: {loading, dashboard: {capital, expense, grossIncome, netIncome}}}) => {
    useEffect(() => {
        if(auth.isAuthenticated) {
            getDashboard();
        }
    }, [auth.isAuthenticated]);

    return !auth.loading? (
        auth.isAuthenticated ? (
            <Fragment>
                <Navbar />
                <Sidenav array={['date']} />
                {!loading ?
                    (
                        <section className='main'>
                            <div className='dashboard'>
                                <div className='dashboard__box'>
                                    <object className='svg--small dashboard__svg' data={CapitalSVG} type='image/svg+xml' aria-label='svg'></object>
                                    <div className='dashboard__box-description'>
                                        <h2 className='header--medium header--medium-responsive'>
                                            CAPITAL
                                        </h2>
                                        <h3 className='header--small header--small-responsive'>
                                            ₱ {capital && capital.toLocaleString()}
                                        </h3>
                                    </div>
                                </div>

                                <div className='dashboard__box'>
                                    <object className='svg--small dashboard__svg' data={ExpenseSVG} type='image/svg+xml' aria-label='svg'></object>
                                    <div className='dashboard__box-description'>
                                        <h2 className='header--medium header--medium-responsive'>
                                            EXPENSE
                                        </h2>
                                        <h3 className='header--small header--small-responsive'>
                                            ₱ {expense && expense.toLocaleString()}
                                        </h3>
                                    </div>
                                </div>

                                <div className='dashboard__box'>
                                    <object className='svg--small dashboard__svg' data={GrossIncomeSVG} type='image/svg+xml' aria-label='svg'></object>
                                    <div className='dashboard__box-description'>
                                        <h2 className='header--medium header--medium-responsive'>
                                            GROSS INCOME
                                        </h2>
                                        <h3 className='header--small header--small-responsive'>
                                            ₱ {grossIncome && grossIncome.toLocaleString()}
                                        </h3>
                                    </div>
                                </div>

                                <div className='dashboard__box'>
                                    <object className='svg--small dashboard__svg' data={NetIncomeSVG} type='image/svg+xml' aria-label='svg'></object>
                                    <div className='dashboard__box-description'>
                                        <h2 className='header--medium header--medium-responsive'>
                                            NET INCOME
                                        </h2>
                                        <h3 className='header--small header--small-responsive'>
                                            ₱ {netIncome && netIncome.toLocaleString()}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : <Spinner />
                }
                <Date action={selectDate} />
            </Fragment>
        ) : <Redirect to='/login' />
    ) : <Spinner />
}

const mapStateToProps = state => ({
    auth: state.auth,
    dashboard: state.dashboard
});

export default connect(mapStateToProps, {getDashboard, selectDate})(Dashboard);