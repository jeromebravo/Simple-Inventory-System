import React, {Fragment, useEffect} from 'react';
import Navbar from '../layout/Navbar';
import Sidenav from '../layout/Sidenav';
import Spinner from '../layout/Spinner';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import CapitalSVG from '../../svg/capital.svg';
import GrossIncomeSVG from '../../svg/grossIncome.svg';
import {getAllIncome, selectIncomeDate, searchIncome} from '../../actions/income';
import IncomeList from './IncomeList';
import sum from '../../utils/sum';
import Date from '../popup/Date';
import Search from '../popup/Search';

const Income = ({auth, getAllIncome, income: {products, loading}, selectIncomeDate, searchIncome}) => {
    useEffect(() => {
        if(auth.isAuthenticated) {
            getAllIncome();
        }
    }, [auth.isAuthenticated]);

    let totalCapital = 0;
    let totalGrossIncome = 0;

    if(products.length !== 0) {
        totalCapital = sum(products, 'capital');
        totalGrossIncome = sum(products, 'price');
    }

    return !auth.loading ? (
        auth.isAuthenticated ? (
            <Fragment>
                <Navbar />
                <Sidenav array={['searchProduct', 'date']} />
                {!loading ? (
                    <section className='main'>
                        <div className='dashboard justify-content-between'>
                            <div className='dashboard__box dashboard__box--margin-none'>
                                <object className='svg--small dashboard__svg' data={CapitalSVG} type='image/svg+xml' aria-label='svg'></object>
                                <div className='dashboard__box-description'>
                                    <h2 className='header--medium header--medium-responsive'>
                                        CAPITAL
                                    </h2>
                                    <h3 className='header--small header--small-responsive'>
                                        ₱ {' '} {totalCapital.toLocaleString()}
                                    </h3>
                                </div>
                            </div>

                            <div className='dashboard__box dashboard__box--margin-none'>
                                <object className='svg--small dashboard__svg' data={GrossIncomeSVG} type='image/svg+xml' aria-label='svg'></object>
                                <div className='dashboard__box-description'>
                                    <h2 className='header--medium header--medium-responsive'>
                                        GROSS INCOME
                                    </h2>
                                    <h3 className='header--small header--small-responsive'>
                                        ₱ {' '} {totalGrossIncome}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <IncomeList products={products} />
                    </section>
                ) : <Spinner />}
                <Date action={selectIncomeDate} />
                <Search type={'product'} data={{name: ''}} action={searchIncome} />
            </Fragment>
        ) : <Redirect to='/login' />
    ) : <Spinner />;
}

const mapStateToProps = state => ({
    auth: state.auth,
    income: state.income
});

export default connect(mapStateToProps, {getAllIncome, selectIncomeDate, searchIncome})(Income);