import React, {useState, useContext} from 'react';
import {useEffect} from 'react';
import ContactContext2 from '../../Context/Contact/ContactContext';

const ContactForm= ()=> {

    const contactContext= useContext(ContactContext2);
    const { addContact, current, clearContact, updateContact }= contactContext;

    useEffect(()=> {
    if(current!== null){
        setContact(current);
    }
    else{
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }
}, [contactContext, current]);

    const [contact, setContact]=useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange =(e)=>{
        setContact({
            ...contact, [e.target.name]: e.target.value
        });
    }

    const onSubmit= (e)=>{
        e.preventDefault();
        if(current== null){
        addContact(contact);
        }
        else{
            updateContact(contact);
        }
        clearAll();
    }

    const clearAll= ()=>{
        clearContact();
    }

    return (
        <form onSubmit={onSubmit}>
           <h2 className='text-primary'>{current ? 'Edit Contact': 'Add Contact'}</h2>
           <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
           <input type='text' placeholder='Email' name='email' value={email} onChange={onChange} />
           <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />
           <h5>Contact Type</h5>
           <input type='radio' name='type' value='personal' defaultChecked={type ==='personal'} onChange={onChange}  />Personal {' '}
           <input type='radio' name='type' value='professional' defaultChecked={type ==='professional'} onChange={onChange}  />Professional 
           <div>
               <input type='submit' value={current ? 'Update Contact': 'Add Contact'} className='btn btn-primary btn-block'></input>
           </div>
           {current && <div><button className='btn btn-light btn-block' onClick={clearAll}>Clear</button></div>}
        </form>
    )
}

export default ContactForm
