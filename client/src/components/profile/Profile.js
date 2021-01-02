import React, {Fragment} from 'react';
import Navbar from '../layout/Navbar';
import ProfilePicture from '../../img/profilepicture.jpg';
import Spinner from '../layout/Spinner';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';

const Profile = ({auth: {isAuthenticated, loading, currentUser}, logout}) => {
    const history = useHistory();
    
    const out = () => {
        logout();
        history.push('/');
    }

    return !loading ? (
        isAuthenticated ? (
            <Fragment>
                <Navbar />
                <section className='profile'>
                    <img src={ProfilePicture} alt='Profile' className='profile__picture mb--medium' />
                    <h2 className='header--medium mb--medium'>
                        {currentUser.name}
                    </h2>
                    <button className='btn btn--danger btn--medium btn--block mb--small' onClick={out}>
                        LOGOUT
                    </button>
                </section>
            </Fragment>
        ) : <Redirect to='/login' />
    ) : <Spinner />;
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Profile);