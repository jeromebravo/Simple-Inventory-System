import React from 'react';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {cancelOrder} from '../../actions/income';

const IncomeList = ({products, cancelOrder}) => {
    const onClick = id => {
        const isTrue = window.confirm('Cancel order?');

        if(isTrue) {
            cancelOrder(id);
        }
    }

    return (
        <table className='table mt--medium'>
            <thead className='table__thead'>
                <tr className='table__row'>
                    <th className='table__heading'>
                        Sold Date
                    </th>

                    <th className='table__heading'>
                        Product
                    </th>

                    <th className='table__heading'>
                        Capital
                    </th>

                    <th className='table__heading'>
                        Sold Price
                    </th>

                    <th className='table__heading'>
                        Action
                    </th>
                </tr>
            </thead>

            <tbody className='table__tbody'>
                {products.map(product => <tr key={product._id} className='table__row'>
                    <td className='table__data'>
                        <Moment format='MMM DD, YYYY'>{product.soldDate}</Moment>
                    </td>

                    <td className='table__data'>
                        {product.name}
                    </td>

                    <td className='table__data'>
                        ₱ {' '} {product.capital.toLocaleString()}
                    </td>

                    <td className='table__data'>
                        ₱ {' '} {product.price.toLocaleString()}
                    </td>

                    <td className='table__data'>
                        <button className='btn btn--danger btn--small' onClick={() => onClick(product._id)}>CANCEL</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    );
}

export default connect(null, {cancelOrder})(IncomeList);