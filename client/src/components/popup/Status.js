import React, {useState} from 'react';
import {removeAlert} from '../../actions/alert';
import {toggleStatusPopup} from '../../actions/popup';
import {connect} from 'react-redux';
import Alert from '../layout/Alert';
import {selectStatus} from '../../actions/product';

const Status = ({toggleStatusPopup, removeAlert, statusActive, selectStatus}) => {
    const [formData, setFormData] = useState({
        status: 'All'
    });

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        selectStatus(formData);
        toggleStatusPopup();
    }

    const onClick = () => {
        toggleStatusPopup();
        removeAlert();
    }

    return (
        <section className={statusActive ? 'popup block' : 'popup'}>
            <div className='popup__content'>
                <div className='popup__header'>
                    <button className='popup__button' onClick={onClick}>
                        &#215;
                    </button>

                    <h3 className='header header--small'>
                        SELECT STATUS
                    </h3>
                </div>

                <form className='form' autoComplete='off' onSubmit={onSubmit}>
                    <Alert />
                    <div className='form__group'>
                        <label htmlFor='status' className='form__label'>
                            Status <span className='color--primary'>*</span>
                        </label>
                        <select name='status' id='status' className='form__input form__input--small' onChange={onChange}>
                            <option value='All'>All</option>
                            <option value='Available'>Available</option>
                            <option value='Sold'>Sold</option>
                        </select>
                    </div>

                    <button className='btn btn--primary btn--block btn--medium' type='submit'>SUBMIT</button>
                </form>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    statusActive: state.popup.statusActive
});

export default connect(mapStateToProps, {removeAlert, toggleStatusPopup, selectStatus})(Status);