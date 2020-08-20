import React, {Fragment} from 'react';
import { useContext } from "react";
import ContactContext2 from '../../Context/Contact/ContactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts= ()=> {

    const contactContext= useContext(ContactContext2);
    const {contacts, filtered}= contactContext;

    if(contacts.length ==0){
        return <h4>Please Add a Contact..</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
            {
                (filtered !== null)? (filtered.map(data =>
                   <CSSTransition key={data.id} timeout={500} classNames="item">
                    <ContactItem contact={data} />
                    </CSSTransition>
                    )) 
                    : (contacts.map(data =>
                        <CSSTransition key={data.id} timeout={500} classNames="item">
                        <ContactItem  contact={data} />
                        </CSSTransition>
                        ))
            }
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts
