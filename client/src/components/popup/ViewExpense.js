import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {toggleViewExpense} from '../../actions/popup';
import Spinner from '../layout/Spinner';
import {removeAlert} from '../../actions/alert';
import Alert from '../layout/Alert';
import {editExpense, deleteExpense} from '../../actions/expense';

const ViewExpense = ({expenseActive, toggleViewExpense, loading, expense, removeAlert, editExpense, deleteExpense}) => {
    const [formData, setFormData] = useState({
        description: '',
        price: 0
    });

    const {description, price} = formData;

    useEffect(() => {
        setFormData({
            ...formData,
            description: expense.description || '',
            price: expense.price || 0
        });
    }, [loading]);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onClick = () => {
        toggleViewExpense();
        removeAlert();
    }

    const update = e => {
        e.preventDefault();

        const isTrue = window.confirm('Update expense?');

        if(isTrue) {
            editExpense(expense._id, formData);
        }
    }

    const remove = e => {
        e.preventDefault();

        const isTrue = window.confirm('Delete expense?');

        if(isTrue) {
            deleteExpense(expense._id);
            toggleViewExpense();
        }
    }

    return !loading ? (
        <section className={expenseActive ? 'popup block' : 'popup'}>
            <div className='popup__content'>
                <div className='popup__header'>
                    <button className='popup__button' onClick={onClick}>
                        &#215;
                    </button>

                    <h3 className='header header--small'>
                        VIEW EXPENSE
                    </h3>
                </div>

                <form className='form' autoComplete='off'>
                    <Alert />
                    <div className='form__group'>
                        <label htmlFor='description' className='form__label'>
                            Expense Description {' '} <span className='color--primary'>*</span>
                        </label>
                        <input type='text' name='description' id='description' className='form__input form__input--small' value={description} onChange={onChange} />
                    </div>

                    <div className='form__group'>
                        <label htmlFor='price' className='form__label'>
                            Price <span className='color--primary'>*</span>
                        </label>
                        <input type='number' name='price' id='price' className='form__input form__input--small' value={price} onChange={onChange} />
                    </div>

                    <button className='btn btn--warning btn--block btn--medium mb--small' onClick={update}>UPDATE</button>
                    <button className='btn btn--danger btn--block btn--medium mb--small' onClick={remove}>DELETE</button>
                </form>
            </div>
        </section>
    ) : <Spinner />;
}

const mapStateToProps = state => ({
    expenseActive: state.popup.expenseActive,
    loading: state.expense.loading,
    expense: state.expense.expense
});

export default connect(mapStateToProps, {toggleViewExpense, removeAlert, editExpense, deleteExpense})(ViewExpense);