import React, {useState} from 'react'
import './Login.css';

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({name:"", email: "", password: ""});
    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }
  return (
    <form onSubmit={submitHandler}>
        <div className='form-inner'>
            <h2>
                Log In
            </h2>
            {(error !="") ? (<div className='error'>{error}</div>) : ""}
            <div className='form-group'>
                <label htmlFor='name'>Username: </label>
                <input type="text" name="username" id="username" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email Id: </label>
                <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password: </label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>
            <input type="submit" value="LOGIN"/>
        </div>
    </form>
  )
}

export default LoginForm;