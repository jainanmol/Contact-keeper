import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import { v1 as uuid } from 'uuid';
import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, SET_ALERT, REMOVE_ALERT} from '../types';

const ContactState= props =>{
   const initialState={
        contacts:[
            {
                id:1,
                name:"Ted Johnson",
                email: "Johnson@gmail.com",
                phone:"9087654327",
                type:"personal"
                },
                {
                id:2,
                name:"Hary White",
                email: "hary@gmail.com",
                phone:"9087652327",
                type:"teaching"
                },
                {
                id:3,
                name:"Smith",
                email: "Smith@gmail.com",
                phone:"1234567890",
                type:"professional"
                }
        ],  
        
        current: null,
        filtered: null,
    };

    const [state, dispatch]= useReducer(ContactReducer, initialState);

    // add contact
    
    const addContact =contact =>{
        contact.id= uuid();
        dispatch({type:ADD_CONTACT, payload: contact});
    }

    // delete contact

    const deleteContactItem= id =>{
        dispatch({type: DELETE_CONTACT, payload: id});
    }

    // set current contact or edit contact

    const editContact = contact =>{
        dispatch({type: SET_CURRENT, payload: contact})
    }

    // clear current contact

    const clearContact = () =>{
        dispatch({type: CLEAR_CURRENT})
    }


    //upadte contact

    const updateContact= (contact)=>{
        dispatch({type: UPDATE_CONTACT, payload: contact})
    }

    // filter contacts

    const filterContacts= (text)=> {
        dispatch({type: FILTER_CONTACTS, payload: text});
    }

    // clear filter

    const clearFilter =()=>{
        dispatch({type: CLEAR_FILTER});
    }

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContactItem,
            editContact,
            clearContact,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;