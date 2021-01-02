import React, {useState} from 'react';
import Alert from '../layout/Alert';
import {connect} from 'react-redux';
import {toggleNewPopup} from '../../actions/popup';
import {removeAlert} from '../../actions/alert';

const New = ({type, data, toggleNewPopup, removeAlert, newActive, action}) => {
    const [formData, setFormData] = useState(data);

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        action(formData);

        if(type === 'product') {
            setFormData({...formData, name: '', capital: 0});
        } else {
            setFormData({...formData, description: '', price: 0});
        }
    }

    const onClick = () => {
        toggleNewPopup();
        removeAlert();
    }

    return (
        <section className={newActive ? 'popup block' : 'popup'}>
            <div className='popup__content'>
                <div className='popup__header'>
                    <button className='popup__button' onClick={onClick}>
                        &#215;
                    </button>

                    <h3 className='header header--small'>
                        {type === 'product' ? 'NEW PRODUCT' : 'NEW EXPENSE'}
                    </h3>
                </div>

                <form className='form' autoComplete='off' onSubmit={onSubmit}>
                    <Alert />
                    <div className='form__group'>
                        <label htmlFor={type === 'product' ? 'name' : 'description'} className='form__label'>
                            {type === 'product' ? 'Product Name' : 'Expense Description'} <span className='color--primary'>*</span>
                        </label>
                        <input type='text' name={type === 'product' ? 'name' : 'description'} id={type === 'product' ? 'name' : 'description'} className='form__input form__input--small' value={type === 'product' ? formData.name : formData.description} onChange={onChange} />
                    </div>

                    <div className='form__group'>
                        <label htmlFor={type === 'product' ? 'capital' : 'price'} className='form__label'>
                            {type === 'product' ? 'Capital' : 'Price'} <span className='color--primary'>*</span>
                        </label>
                        <input type='number' name={type === 'product' ? 'capital' : 'price'} id={type === 'product' ? 'capital' : 'price'} className='form__input form__input--small' value={type === 'product' ? formData.capital : formData.price} onChange={onChange} />
                    </div>

                    <button className='btn btn--primary btn--block btn--medium' type='submit'>SUBMIT</button>
                </form>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    newActive: state.popup.newActive
});

export default connect(mapStateToProps, {toggleNewPopup, removeAlert})(New);