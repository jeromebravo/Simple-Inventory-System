import React, {useState} from 'react';
import {removeAlert} from '../../actions/alert';
import {toggleSearchPopup} from '../../actions/popup';
import {connect} from 'react-redux';
import Alert from '../layout/Alert';

const Search = ({type, action, data, searchActive, toggleSearchPopup, removeAlert}) => {
    const [formData, setFormData] = useState(data);

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        action(formData);
        
        if(type === 'product') {
            setFormData({...formData, name: ''});
        } else {
            setFormData({...formData, description: ''});
        }
    }

    const onClick = () => {
        toggleSearchPopup();
        removeAlert();
    }

    return (
        <section className={searchActive ? 'popup block' : 'popup'}>
            <div className='popup__content'>
                <div className='popup__header'>
                    <button className='popup__button' onClick={onClick}>
                        &#215;
                    </button>

                    <h3 className='header header--small'>
                        SEARCH {' '} {type === 'product' ? 'PRODUCT' : 'EXPENSE'}
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

                    <button className='btn btn--primary btn--block btn--medium' type='submit'>SEARCH</button>
                </form>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    searchActive: state.popup.searchActive
});

export default connect(mapStateToProps, {toggleSearchPopup, removeAlert})(Search);