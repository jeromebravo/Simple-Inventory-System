import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';

const Navbar = ({auth: {isAuthenticated, currentUser: {username}}}) => {
    const [isActive, setActive] = useState(false);

    // toggle navbar
    const toggle = () => {
        setActive(!isActive);
    }

    // set mininum width
    const minWidth = window.matchMedia("(min-width: 833px)");

    // set isActive to false when window's min-width is 833px
    window.onresize = () => {
        if(minWidth.matches && isActive) {
            setActive(false);
        }
    }

    const location = useLocation();

    return (
        <nav className='nav'>
            <div className='nav__navbar'>
                <div className='nav__left'>
                    <Link to='/' className='nav__brand'>INVENTORY</Link>

                    {isAuthenticated &&
                        <button className='nav__hamburger' onClick={toggle}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    }
                </div>
                
                {isAuthenticated &&
                    <div className={isActive ? 'nav__right active' : 'nav__right'}>
                        <Link to='/dashboard' className={location.pathname === '/dashboard' ? 'nav__link color--primary' : 'nav__link'}>Dashboard</Link>
                        <Link to='/products' className={location.pathname === '/products' ? 'nav__link color--primary' : 'nav__link'}>Products</Link>
                        <Link to='/income' className={location.pathname === '/income' ? 'nav__link color--primary' : 'nav__link'}>Income</Link>
                        <Link to='/expense' className={location.pathname === '/expense' ? 'nav__link color--primary' : 'nav__link'}>Expense</Link>
                        <Link to='/profile' className={location.pathname === '/profile' ? 'nav__link color--primary' : 'nav__link'}>{username}</Link>
                    </div>
                }
            </div>
        </nav>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Navbar);