import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './ProfileForm.module.css';
import { useContext, useRef } from 'react';

const ProfileForm = () => {

const newPassWordInputRef = useRef()
const authCtx = useContext(AuthContext)
const history = useHistory()

const submitHandler = event =>{
  event.preventDefault()

  const enteredNewPasseword = newPassWordInputRef.current.value

  fetch ('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCur9xCsh35ycJRAqP2U3DynKEpK8MDbj8',{
    method : 'POST',
    body : JSON.stringify({
      idToken : authCtx.token,
      password : enteredNewPasseword,
      returnSecureToken : true
    }),
    headers : {
      'Content-Type' : 'applicaton/json'
    }
  }).then(res=>{
    history.replace('/')
    return res.json()

  }).then(res=>{
    // console.log(res)
  })
}
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPassWordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
