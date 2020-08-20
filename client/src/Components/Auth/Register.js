import React, {useState, useContext} from 'react';
import AlertContext from '../../Context/Alert/AlertContext';
import AuthContext from '../../Context/Auth/AuthContext';

const Register= ()=> {

    const alertContext= useContext(AlertContext);
    const authContext= useContext(AuthContext);

    const {setAlert}= alertContext;
    const {register}= authContext;
    const [user, setUser]= useState({
        name: '',
        email: '',
        password1: '',
        password2: '',
    });

const onChange= (e)=>{
setUser({...user, [e.target.name]: e.target.value});
}

const onSubmit= (e)=> {
e.preventDefault();
if(name==' ' || email=='' || password1== ''){
    setAlert('Please enter all fields', 'danger');
}
else if(password1!== password2){
    setAlert('Passwords do not match', 'danger');
}
else{
console.log('Register submit');
register({name, email, password1});
}
}

    const {name, email, password1, password2}= user;
    return (
        <div className='form-container'>
            <h1>Account<span className='text-primary'>Register</span></h1>
            <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' value={name} onChange={onChange} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input type='email' name='email' value={email} onChange={onChange} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='password1'>Password</label>
                <input type='password' name='password1' value={password1} onChange={onChange} required minLength="6" />
            </div>
            <div className='form-group'>
                <label htmlFor='password2'>Confirm Password</label>
                <input type='password' name='password2' value={password2} onChange={onChange} required minLength="6" />
            </div>
            <input type='submit' value='Register' className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Register
