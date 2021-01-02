import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {toggleViewProduct} from '../../actions/popup';
import Spinner from '../layout/Spinner';
import {removeAlert} from '../../actions/alert';
import Alert from '../layout/Alert';
import {editProduct, buyProduct, deleteProduct} from '../../actions/product';

const ViewProduct = ({productActive, toggleViewProduct, loading, product, removeAlert, editProduct, buyProduct, deleteProduct}) => {
    const [formData, setFormData] = useState({
        name: '',
        capital: 0,
        price: 0
    });

    const {name, capital, price} = formData;

    useEffect(() => {
        setFormData({
            ...formData,
            name: product.name || '',
            capital: product.capital || 0,
            price: product.price || 0
        });
    }, [loading]);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onClick = () => {
        toggleViewProduct();
        removeAlert();
    }

    const buy = e => {
        e.preventDefault();
        
        const isTrue = window.confirm('Buy product?');

        if(isTrue) {
            buyProduct(product._id, formData);
        }
    }

    const update = e => {
        e.preventDefault();

        const isTrue = window.confirm('Update product?');

        if(isTrue) {
            editProduct(product._id, formData);
        }
    }

    const remove = e => {
        e.preventDefault();

        const isTrue = window.confirm('Delete product?');

        if(isTrue) {
            deleteProduct(product._id);
            toggleViewProduct();
        }
    }

    return !loading ? (
        <section className={productActive ? 'popup block' : 'popup'}>
            <div className='popup__content'>
                <div className='popup__header'>
                    <button className='popup__button' onClick={onClick}>
                        &#215;
                    </button>

                    <h3 className='header header--small'>
                        VIEW PRODUCT
                    </h3>
                </div>

                <form className='form' autoComplete='off'>
                    <Alert />
                    <div className='form__group'>
                        <label htmlFor='name' className='form__label'>
                            Product Name {' '} <span className='color--primary'>*</span>
                        </label>
                        <input type='text' name='name' id='name' className='form__input form__input--small' value={name} onChange={onChange} />
                    </div>

                    <div className='form__group'>
                        <label htmlFor='capital' className='form__label'>
                            Capital {' '} <span className='color--primary'>*</span>
                        </label>
                        <input type='number' name='capital' id='capital' className='form__input form__input--small' value={capital} onChange={onChange} />
                    </div>

                    <div className='form__group'>
                        <label htmlFor='price' className='form__label'>
                            Selling Price <span className='color--primary'>*</span>
                        </label>
                        <input type='number' name='price' id='price' className='form__input form__input--small' value={price} onChange={onChange} />
                    </div>

                    <button className='btn btn--primary btn--block btn--medium mb--small' onClick={buy}>BUY</button>
                    <button className='btn btn--warning btn--block btn--medium mb--small' onClick={update}>UPDATE</button>
                    <button className='btn btn--danger btn--block btn--medium mb--small' onClick={remove}>DELETE</button>
                </form>
            </div>
        </section>
    ) : <Spinner />;
}

const mapStateToProps = state => ({
    productActive: state.popup.productActive,
    loading: state.product.loading,
    product: state.product.product
});

export default connect(mapStateToProps, {toggleViewProduct, removeAlert, editProduct, buyProduct, deleteProduct})(ViewProduct);