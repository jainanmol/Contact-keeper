import React, {useContext} from 'react';
import AlertContext from '../../Context/Alert/AlertContext';

function Alerts() {
    const alertContext= useContext(AlertContext);

    return (
        alertContext.alerts.length>0 && alertContext.alerts.map(data => <div key={data.id} className={`alert alert-${data.type}`} >
             <i className='fas fa fa-info-circle' />{data.msg}
        </div>)
       
    )
}

export default Alerts
