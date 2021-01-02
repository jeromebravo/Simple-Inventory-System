import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import SignupSVG from '../../svg/signup.svg';
import Navbar from '../layout/Navbar';
import {signup} from '../../actions/auth';
import {connect} from 'react-redux';
import Alert from '../layout/Alert';

const Signup = ({signup, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: ''
    });

    const {name, username, password} = formData;

    // change the value for every changes
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    // submit form
    const onSubmit = e => {
        e.preventDefault();
        signup(formData);
    }

    // redirect to dashboard when logged in
    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <Navbar />
            <section className='container'>
                <div className='left'>
                    <object className='svg--large' data={SignupSVG} type='image/svg+xml' aria-label='svg'></object>
                </div>

                <div className='right'>
                    <form className='form' autoComplete='off' onSubmit={onSubmit}>
                        <Alert />

                        <h2 className='header header--medium text-center mb--small'>SIGN UP</h2>

                        <div className='form__group'>
                            <label htmlFor='name' className='form__label'>Name <span className='color--primary'>*</span></label>
                            <input type='text' name='name' id='name' className='form__input form__input--large' value={name} onChange={onChange} />
                        </div>

                        <div className='form__group'>
                            <label htmlFor='username' className='form__label'>Username <span className='color--primary'>*</span></label>
                            <input type='text' name='username' id='username' className='form__input form__input--large' value={username} onChange={onChange} />
                        </div>

                        <div className='form__group'>
                            <label htmlFor='password' className='form__label'>Password <span className='color--primary'>*</span></label>
                            <input type='password' name='password' id='password' className='form__input form__input--large' value={password} onChange={onChange} />
                        </div>

                        <button className='btn btn--primary btn--medium btn--center' type='submit'>SIGN UP</button>
                        <p className='form__footer'>
                            Have an account? {' '}
                            <Link to='/login' className='form__link'>Log in now</Link>
                        </p>
                    </form>
                </div>
            </section>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {signup})(Signup);