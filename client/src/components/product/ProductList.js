import React from 'react';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {toggleViewProduct} from '../../actions/popup';
import {viewProduct} from '../../actions/product';

const ProductList = ({products, toggleViewProduct, viewProduct}) => {
    const onClick = id => {
        toggleViewProduct();
        viewProduct(id);
    }

    return (
        <table className='table mt--medium mb--medium'>
            <thead className='table__thead'>
                <tr className='table__row'>
                    <th className='table__heading'>
                        Date
                    </th>

                    <th className='table__heading'>
                        Product
                    </th>

                    <th className='table__heading'>
                        Status
                    </th>

                    <th className='table__heading'>
                        Capital
                    </th>

                    <th className='table__heading'>
                        Action
                    </th>
                </tr>
            </thead>

            <tbody className='table__tbody'>
                {products.map(product => <tr key={product._id} className='table__row'>
                    <td className='table__data'>
                        <Moment format='MMM DD, YYYY'>{product.date}</Moment>
                    </td>

                    <td className='table__data'>
                        {product.name}
                    </td>

                    <td className={product.status === 'Sold' ? 'table__data color--primary' : 'table__data'}>
                        {product.status}
                    </td>

                    <td className='table__data'>
                        ₱ {' '} {product.capital.toLocaleString()}
                    </td>

                    <td className='table__data'>
                        <button className='btn btn--primary btn--small' onClick={() => onClick(product._id)}>View</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    );
}

export default connect(null, {toggleViewProduct, viewProduct})(ProductList);