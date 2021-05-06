import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { UserPool } from "./";

const AccountContext = createContext();

const Account = (prop) => {
  const getUserStatus= async()=>{
    await new Promise((resolve,reject)=>{
      const user = UserPool.getCurrentUser();
      if(user){
        user.getSession((err,data)=>{
          if(err)
            reject(false)
          else{
            resolve(data)
          }
        })
      }else
        reject(false)
    })
  }

  const authenticateUser = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      // create A user
      const user = new CognitoUser({ Username, Pool:UserPool });
      // auth details
      const authDetail = new AuthenticationDetails({ Username, Password });
      // authenticate user
      user.authenticateUser(authDetail, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (data) => {
          resolve(data);
        },
      });
    });
  };

  const logout = ()=>{
    const user = UserPool.getCurrentUser();
    if(user)
      user.signOut();
  }
  return (
    <AccountContext.Provider value={{ authenticateUser,getUserStatus,logout }}>
      {prop.children}
    </AccountContext.Provider>
  );
};
export { Account, AccountContext };
