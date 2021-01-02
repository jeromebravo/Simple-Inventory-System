import React, {useState} from 'react';
import {connect} from 'react-redux';
import {toggleDatePopup} from '../../actions/popup';
import {removeAlert} from '../../actions/alert';
import Alert from '../layout/Alert';

const Date = ({action, toggleDatePopup, dateActive, removeAlert}) => { 
    const [formData, setFormData] = useState({
        from: '',
        to: ''
    });

    const {from, to} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        action(formData);
    }

    const onClick = () => {
        toggleDatePopup();
        removeAlert();
    }

    return (
        <section className={dateActive ? 'popup block' : 'popup'}>
            <div className='popup__content'>
                <div className='popup__header'>
                    <button className='popup__button' onClick={onClick}>
                        &#215;
                    </button>

                    <h3 className='header header--small'>
                        SELECT DATE
                    </h3>
                </div>

                <form className='form' autoComplete='off' onSubmit={onSubmit}>
                    <Alert />
                    <div className='form__group'>
                        <label htmlFor='from' className='form__label'>
                            From <span className='color--primary'>*</span>
                        </label>
                        <input type='date' name='from' id='from' className='form__input form__input--small' value={from} onChange={onChange} />
                    </div>

                    <div className='form__group'>
                        <label htmlFor='to' className='form__label'>
                            To <span className='color--primary'>*</span>
                        </label>
                        <input type='date' name='to' id='to' className='form__input form__input--small' value={to} onChange={onChange} />
                    </div>

                    <button className='btn btn--primary btn--block btn--medium' type='submit'>SUBMIT</button>
                </form>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    dateActive: state.popup.dateActive
});

export default connect(mapStateToProps, {toggleDatePopup, removeAlert})(Date);