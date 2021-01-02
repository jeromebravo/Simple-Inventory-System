import React from 'react';
import {connect} from 'react-redux';

const Alert = ({alerts}) => alerts && alerts.map(alert => <div key={alert.id} className='alert'>{alert.msg}</div>);

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);