import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import React, { useReducer } from 'react';
import { v1 as uuid } from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from '../types';


const AlertState= props =>{
   const initialState=[];

    const [state, dispatch]= useReducer(AlertReducer, initialState);

    // set alert

    const setAlert =(msg, type)=>{
        const id= uuid();
        dispatch({type: SET_ALERT, payload: {msg, type, id}});

        setTimeout(()=>  dispatch({type: REMOVE_ALERT, payload: id}),5000);
    }


    return (
        <AlertContext.Provider value={{
            alerts: state,
            setAlert,

        }}>
            {props.children}
        </AlertContext.Provider>
    )
};

export default AlertState;