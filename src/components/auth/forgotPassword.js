import React, { useState } from "react";
import { UserPool } from "../cognito";
import { CognitoUser } from "amazon-cognito-identity-js";

export default function ForgotPassword(props) {
  const [stage, setStage] = useState(1); // 1 mean Signup stage and 2 mean confirm user
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setCPassword]=useState("");
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [code, setCode] = useState(""); //verification code

  const getUser = () =>{
      return new CognitoUser({
          Username:email.toLowerCase(),
          Pool:UserPool
      })
  }
  const sendCode = (event) => {
    event.preventDefault();
    setAlert(false);
    getUser().forgotPassword({
        onSuccess : data=>{

        },
        onFailure: err=>{

        },
        inputVerificationCode: data=>{

            setStage(2)
        }
    })
  };
  const close = (event) => {
    setAlert(false);
  };
  const ToLogin = (e, history) => {
    e.preventDefault();
    history.push("/sign-in");
  };
  const resetPassword = (event) => {
    event.preventDefault();
    setAlert(false);
    if(password != confirmPassword){
        setAlertMsg("Password don't match");
        setAlertType("alert alert-danger");
        setAlert(true);
        return;
    }
    getUser().confirmPassword(code,password,{
        onSuccess:data=>{
            setAlertMsg("Password changed.");
            setAlertType("alert alert-success");
            setAlert(true);
            setTimeout(
              () => props.history.push("/sign-in"), 
              4000
            );
        },
        onFailure: err=>{
            setAlertMsg(err.message);
            setAlertType("alert alert-danger");
            setAlert(true);
            console.log(err);
        }
    })
  };

  return (
    <div>
      {stage === 1 && (
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div className="col-md-8 col-lg-6">
              {alert && (
                <div
                  style={{
                    position: "absolute",
                    zIndex: "9",
                    marginTop: "10px",
                  }}
                >
                  <div className={alertType} role="alert">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      onClick={close}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    {alertMsg}
                  </div>
                </div>
              )}
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">Forgot Password</h3>
                      <form onSubmit={sendCode}>
                        <div className="form-label-group">
                          <input
                            type="email"
                            id="inputEmail"
                            className="form-control"
                            required
                            autoFocus
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                          <label>Enter you email address</label>
                        </div>

                        <button
                          className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                          type="submit"
                        >
                          Continue
                        </button>
                      </form>
                      <button
                        onClick={(e) => ToLogin(e, props.history)}
                        className="btn btn-lg btn-light btn-block btn-login text-uppercase font-weight-bold mb-2"
                      >
                        Back
                      </button>
                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {stage === 2 && (
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div className="col-md-8 col-lg-6">
              {alert && (
                <div
                  style={{
                    position: "absolute",
                    zIndex: "9",
                    marginTop: "10px",
                  }}
                >
                  <div className={alertType} role="alert">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      onClick={close}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    {alertMsg}
                  </div>
                </div>
              )}
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">Set New Password</h3>
                      <form onSubmit={resetPassword}>
                        <div className="form-label-group">
                          <input
                            type="text"
                            id="inputverificationCode"
                            className="form-control"
                            required
                            autoFocus
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                          />
                          <label>Enter Code</label>
                        </div>
                        {/* Password */}
                        <div className="form-label-group">
                          <input
                            type="password"
                            id="inputverificationCode"
                            className="form-control"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                          />
                          <label>New Password</label>
                        </div>
                        {/* confirm password */}
                        <div className="form-label-group">
                          <input
                            type="password"
                            id="inputverificationCode"
                            className="form-control"
                            required
                            value={confirmPassword}
                            onChange={(event) => setCPassword(event.target.value)}
                          />
                          <label>New Password</label>
                        </div>
                        <button
                          className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                          type="submit"
                        >
                          Verify
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
