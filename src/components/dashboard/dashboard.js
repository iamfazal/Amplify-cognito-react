import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../cognito";
export default function Dashboard(props) {
  const [status, setStatus] = useState(false);
  const { getUserStatus, logout } = useContext(AccountContext);

  useEffect(() => {
    getUserStatus()
      .then((data) => {
        setStatus(true);
      })
      .catch((err) => {
        props.history.push("/sign-in");
      });
  });

  const signout = () => {
    logout();
    props.history.push("/sign-in");
  };
  return (
    <div>
      {status && (
        <div className="container bg-faded py-3">
          <h1 className="text-center">Welcome to dashboard</h1>
          <div className="row">
            <div className="col text-center">
              you are login with cognito APIs
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <div className="mx-auto w-50 p-3 bg-dark text-white text-center">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={signout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
