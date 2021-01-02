import React from 'react';
import {connect} from 'react-redux';
import {toggleDatePopup, toggleNewPopup, toggleSearchPopup, toggleStatusPopup} from '../../actions/popup';

const Sidenav = ({array, toggleDatePopup, toggleNewPopup, toggleSearchPopup, toggleStatusPopup}) => {
    return (
        <div className='side-nav'>
            {array.includes('newProduct') &&
                <button className='side-nav__btn' onClick={toggleNewPopup}>
                    New Product
                </button>
            }

            {array.includes('newExpense') &&
                <button className='side-nav__btn' onClick={toggleNewPopup}>
                    New Expense
                </button>
            }

            {array.includes('date') &&
                <button className='side-nav__btn' onClick={toggleDatePopup}>
                    Select Date
                </button>
            }

            {array.includes('searchProduct') &&
                <button className='side-nav__btn' onClick={toggleSearchPopup}>
                    Search Product
                </button>
            }

            {array.includes('status') &&
                <button className='side-nav__btn' onClick={toggleStatusPopup}>
                    Select Status
                </button>
            }

            {array.includes('searchExpense') &&
                <button className='side-nav__btn' onClick={toggleSearchPopup}>
                    Search Expense
                </button>
            }
        </div>
    );
}

export default connect(null, {toggleDatePopup, toggleNewPopup, toggleSearchPopup, toggleStatusPopup})(Sidenav);