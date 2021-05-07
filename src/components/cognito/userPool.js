// npm i amazon-cognito-identity-js
import { CognitoUserPool } from "amazon-cognito-identity-js";
const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID, //find under general settings
  ClientId: process.env.REACT_APP_CLIENT_ID, //find under general settings > App clients
};
export default new CognitoUserPool(poolData);
