import React from 'react';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {toggleViewExpense} from '../../actions/popup';
import {viewExpense} from '../../actions/expense';

const ExpenseList = ({expenses, toggleViewExpense, viewExpense}) => {
    const onClick = id => {
        toggleViewExpense();
        viewExpense(id);
    }

    return (
        <table className='table mt--medium'>
            <thead className='table__thead'>
                <tr className='table__row'>
                    <th className='table__heading'>
                        Date
                    </th>

                    <th className='table__heading'>
                        Description
                    </th>

                    <th className='table__heading'>
                        Price
                    </th>

                    <th className='table__heading'>
                        Action
                    </th>
                </tr>
            </thead>

            <tbody className='table__tbody'>
                {expenses.map(expense => <tr key={expense._id} className='table__row'>
                    <td className='table__data'>
                        <Moment format='MMM DD, YYYY'>{expense.date}</Moment>
                    </td>

                    <td className='table__data'>
                        {expense.description}
                    </td>

                    <td className='table__data'>
                        ₱ {' '} {expense.price.toLocaleString()}
                    </td>

                    <td className='table__data'>
                        <button className='btn btn--primary btn--small' onClick={() => onClick(expense._id)}>VIEW</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    );
}

export default connect(null, {toggleViewExpense, viewExpense})(ExpenseList);