import React, {useState,useContext ,useEffect} from 'react'
import {AccountContext} from "../cognito"


export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password,setPassword]= useState('');
    const [error,setError]=useState(false);
    const [errorMsg,setErrorMsg]=useState('')

    const {authenticateUser,getUserStatus} = useContext(AccountContext)

    useEffect(() => {
      getUserStatus()
        .then((data) => {
          props.history.push("/dashboard");
        })
    });

    const onSubmit = event =>{
      setError(false);
      event.preventDefault();
      authenticateUser(email,password).then(data=>{
        props.history.push("/dashboard");
      })
      .catch(err=>{
        setErrorMsg(err.message)
        setError(true);
      })

    }
    const close = event=>{
      setError(false);
    }
    
    const ToSignup = (e, history) =>{
      e.preventDefault();
      history.push("/sign-up");
    }
    
    const toForgotPassword = (e, history) =>{
      e.preventDefault();
      history.push("/forgotPassword");
    }

    return (
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            {error && <div style={{position:"absolute",zIndex:"9", marginTop:"10px"}}>
              <div className="alert alert-danger" role="alert">
              <button type="button" className="close" data-dismiss="alert" onClick={close} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              {errorMsg}
              </div>
            </div>}
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Welcome back! Please Login</h3>
                    <form onSubmit={onSubmit}>
                      <div className="form-label-group">
                        <input
                          type="email"
                          id="inputEmail"
                          className="form-control"
                          placeholder="Email address"
                          required
                          autoFocus
                          value= {email}
                          onChange={event => setEmail(event.target.value)}
                        />
                        <label>Email address</label>
                      </div>
  
                      <div className="form-label-group">
                        <input
                          type="password"
                          id="inputPassword"
                          className="form-control"
                          placeholder="Password"
                          required
                          value= {password}
                          onChange={event => setPassword(event.target.value)}
                        />
                        <label>Password</label>
                      </div>
                      
                        <button
                          className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                          type="submit"
                        >
                          Sign in
                        </button>
                        <div className="mb-2 text-center" style={{color:"gray"}}>
                          -- or --
                        </div>
                    </form>
                        <button onClick={(e)=> ToSignup(e,props.history)}
                          className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        >
                          Sign up
                        </button>
                      
                      <div className="text-center">
                        <a className="small" onClick={(e)=> toForgotPassword(e,props.history)}>
                          Forgot password?
                        </a>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };