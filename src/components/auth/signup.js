import React, {useState,useContext ,useEffect} from 'react'
import {UserPool,AccountContext} from "../cognito"
import { CognitoUser } from "amazon-cognito-identity-js";

export default function Signup(props) {
  const [stage, setStage] = useState(1); // 1 mean Signup stage and 2 mean confirm user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [code, setCode] = useState(""); //verification code

  const {getUserStatus} = useContext(AccountContext)

    useEffect(() => {
      getUserStatus()
        .then((data) => {
          props.history.push("/dashboard");
        })
    });

  const onSubmit = (event) => {
    event.preventDefault();
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        setAlertMsg(err.message);
        setAlertType("alert alert-danger");
        setAlert(true);
      } else {
        setAlertMsg("Verification code send to your email");
        setAlertType("alert alert-success");
        setAlert(true);
        setStage(2);
      }
    });
  };
  const close = (event) => {
    setAlert(false);
  };
  const ToLogin = (e, history) => {
    e.preventDefault();
    history.push("/sign-in");
  };
  const confirmAccount = (event) => {
    event.preventDefault();
    setAlert(false);

    // create A user
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        setAlertMsg("Invalid code provided.");
        setAlertType("alert alert-danger");
        setAlert(true);
      } else {
        setAlertMsg("Email verified. Please Login");
        setAlertType("alert alert-success");
        setAlert(true);
        setTimeout(
          () => props.history.push("/dashboard"), 
          4000
        );
        
      }
    });
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
                      <h3 className="login-heading mb-4">Create Account</h3>
                      <form onSubmit={onSubmit}>
                        <div className="form-label-group">
                          <input
                            type="email"
                            id="inputEmail"
                            className="form-control"
                            placeholder="Email address"
                            required
                            autoFocus
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
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
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                          <label>Password</label>
                        </div>

                        <button
                          className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                          type="submit"
                        >
                          Sign up
                        </button>
                        <div
                          className="mb-2 text-center"
                          style={{ color: "gray" }}
                        >
                          -- or --
                        </div>
                      </form>
                      <button
                        onClick={(e) => ToLogin(e, props.history)}
                        className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      >
                        Sign in
                      </button>
                      <div className="text-center">
                        Please enter a valid email for verification code
                      </div>
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
                      <h3 className="login-heading mb-4">Confirm Account</h3>
                      <form onSubmit={confirmAccount}>
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
