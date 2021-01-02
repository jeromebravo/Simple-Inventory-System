import React, {Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Chart from '../../svg/chart.svg';
import Navbar from './Navbar';
import Spinner from './Spinner';
import {connect} from 'react-redux';

const Landing = ({auth: {isAuthenticated, loading}}) => {
    return (
        !isAuthenticated ? (
            <Fragment>
                <Navbar />
                <section className='container'>
                    <div className='left'>
                        <object className='svg--large' data={Chart} type='image/svg+xml' aria-label='svg'></object>
                    </div>

                    <div className='right'>
                        <div className='right__content'>
                            <h1 className='header header--large mb--large'>
                                <span className='header__top'>INVENTORY</span>
                                <span className='header__bottom'>MANAGEMENT SYSTEM</span>
                            </h1>

                            <Link className='btn btn--primary btn--large mr--medium' to='/signup'>SIGN UP</Link>
                            <Link className='btn btn--primary btn--large' to='/login'>LOG IN</Link>
                        </div>
                    </div>
                </section>
            </Fragment>
        ) : <Redirect to='/dashboard' />
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);