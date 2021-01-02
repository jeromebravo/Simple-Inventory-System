import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoginSVG from '../../svg/login.svg';
import Navbar from '../layout/Navbar';
import {connect} from 'react-redux';
import Alert from '../layout/Alert';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;

    // change the value for every changes
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    // submit form
    const onSubmit = e => {
        e.preventDefault();
        login(formData);
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
                    <object className='svg--large' data={LoginSVG} type='image/svg+xml' aria-label='svg'></object>
                </div>

                <div className='right'>
                    <form className='form' autoComplete='off' onSubmit={onSubmit}>
                        <Alert />

                        <h2 className='header header--medium text-center mb--small'>LOGIN</h2>

                        <div className='form__group'>
                            <label htmlFor='username' className='form__label'>Username <span className='color--primary'>*</span></label>
                            <input type='text' name='username' id='username' className='form__input form__input--large' value={username} onChange={onChange} />
                        </div>

                        <div className='form__group'>
                            <label htmlFor='password' className='form__label'>Password <span className='color--primary'>*</span></label>
                            <input type='password' name='password' id='password' className='form__input form__input--large' value={password} onChange={onChange} />
                        </div>

                        <button className='btn btn--primary btn--medium btn--center' type='submit'>LOGIN</button>
                        <p className='form__footer'>
                            Don't have an account? {' '}
                            <Link to='/signup' className='form__link'>Sign Up</Link>
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

export default connect(mapStateToProps, {login})(Login);