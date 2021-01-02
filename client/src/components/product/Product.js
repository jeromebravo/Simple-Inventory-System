import React, {Fragment, useEffect} from 'react';
import Navbar from '../layout/Navbar';
import Sidenav from '../layout/Sidenav';
import CapitalSVG from '../../svg/capital.svg';
import New from '../popup/New';
import {connect} from 'react-redux';
import {selectStatus, searchProduct, newProduct} from '../../actions/product';
import {Redirect} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProductList from './ProductList';
import Search from '../popup/Search';
import Status from '../popup/Status';
import sum from '../../utils/sum';
import ViewProduct from '../popup/ViewProduct';

const Product = ({selectStatus, searchProduct, auth, product: {products, loading}, newProduct}) => {
    useEffect(() => {
        if(auth.isAuthenticated) {
            selectStatus({status: 'All'});
        }
    }, [auth.isAuthenticated]);
    
    let totalCapital = 0;

    if(products.length !== 0) {
        totalCapital = sum(products, 'capital');
    }

    return !auth.loading ? (
        auth.isAuthenticated ? (
            <Fragment>
                <Navbar />
                <Sidenav array={['newProduct', 'searchProduct', 'status']} />
                {!loading ? 
                    (
                        <section className='main'>
                            <div className='dashboard justify-content-between'>
                                <div className='dashboard__box dashboard__box--margin-none'>
                                    <object className='svg--small dashboard__svg' data={CapitalSVG} type='image/svg+xml' aria-label='svg'></object>
                                    <div className='dashboard__box-description'>
                                        <h2 className='header--medium header--medium-responsive'>
                                            CAPITAL
                                        </h2>
                                        <h3 className='header--small header--small-responsive'>
                                            ₱ {' '} {totalCapital.toLocaleString()}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <ProductList products={products} />
                        </section>
                    ) : <Spinner />}
                <New type={'product'} data={{name: '', capital: 0}} action={newProduct} />
                <Search type={'product'} data={{name: ''}} action={searchProduct} />
                <Status />
                <ViewProduct />
            </Fragment>
        ) : <Redirect to='/login' />
    ) : <Spinner />
}

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.product
});

export default connect(mapStateToProps, {selectStatus, searchProduct, newProduct})(Product);