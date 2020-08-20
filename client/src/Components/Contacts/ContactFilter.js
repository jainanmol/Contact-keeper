import React, {useContext, useRef, useEffect} from 'react';
import ContactContext from '../../Context/Contact/ContactContext';

const ContactFilter =()=> {
const contactContext= useContext(ContactContext);
const text=useRef('');
const {filtered}= contactContext;

useEffect(() =>{
    if(filtered ===null){
        text.current.value= '';
    }
})

const onChange= (e)=>{
    if(text.current.value !== ''){
        contactContext.filterContacts(e.target.value);
    }
    else{
        contactContext.clearFilter();
    }
}

return(
<form>
    <input ref={text} placeholder="Filter Contacts.." type="text" onChange={onChange} />
</form>

)
}

export default ContactFilter;