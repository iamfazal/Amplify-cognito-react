import { Route, Redirect } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../components/cognito";

export default function PrivateRoute({ component: Component, ...rest }) {
  const [status, setStatus] = useState(true);
  const { getUserStatus } = useContext(AccountContext);
//   useEffect(() => {
//     let mounted = true;
//     getUserStatus().then((data) => {
//         if(mounted)
//             setStatus(true);
        
//     });
//     return () => mounted = false;
//   },[]);

  return (
    <Route
      {...rest}
      render={(props) =>
        status ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
