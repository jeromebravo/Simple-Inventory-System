import React, {Fragment, useEffect} from 'react';
import Navbar from '../layout/Navbar';
import Sidenav from '../layout/Sidenav';
import ExpenseSVG from '../../svg/expense.svg';
import ExpenseList from './ExpenseList';
import New from '../popup/New';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {Redirect} from 'react-router-dom';
import {getAllExpense, newExpense, selectDateExpense, searchExpense, editExpense, deleteExpense} from '../../actions/expense';
import sum from '../../utils/sum';
import Date from '../popup/Date';
import Search from '../popup/Search';
import ViewExpense from '../popup/ViewExpense';

const Expense = ({auth, getAllExpense, expense: {expenses, loading}, newExpense, selectDateExpense, searchExpense, editExpense, deleteExpense}) => {
    useEffect(() => {
        if(auth.isAuthenticated) {
            getAllExpense();
        }
    }, [auth.isAuthenticated]);

    let totalExpense = 0;

    if(expenses.length !== 0) {
        totalExpense = sum(expenses, 'price');
    }

    return !auth.loading ? (
        auth.isAuthenticated ? (
            <Fragment>
                <Navbar />
                <Sidenav array={['newExpense', 'searchExpense', 'date']} />
                {!loading ? (
                <section className='main'>
                    <div className='dashboard justify-content-between'>
                        <div className='dashboard__box dashboard__box--margin-none'>
                            <object className='svg--small dashboard__svg' data={ExpenseSVG} type='image/svg+xml' aria-label='svg'></object>
                            <div className='dashboard__box-description'>
                                <h2 className='header--medium header--medium-responsive'>
                                    EXPENSE
                                </h2>
                                <h3 className='header--small header--small-responsive'>
                                    ₱ {' '} {totalExpense.toLocaleString()}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <ExpenseList expenses={expenses} />
                </section>
                ) : <Spinner />}
                <New type={'expense'} data={{description: '', price: 0}} action={newExpense} />
                <Date action={selectDateExpense} />
                <Search type={'expense'} action={searchExpense} data={{description: ''}} />
                <ViewExpense />
            </Fragment>
        ) : <Redirect to='/login' />
    ) : <Spinner />;
}

const mapStateToProps = state => ({
    auth: state.auth,
    expense: state.expense
});

export default connect(mapStateToProps, {getAllExpense, newExpense, selectDateExpense, searchExpense, editExpense, deleteExpense})(Expense);