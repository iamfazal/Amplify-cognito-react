// npm i amazon-cognito-identity-js
import { CognitoUserPool } from "amazon-cognito-identity-js";
const poolData = {
  UserPoolId: "us-east-2_03plzbY8x", //find under general settings
  ClientId: "5ir2dkjltmui27jm4t4mo7qst", //find under general settings > App clients
};
export default new CognitoUserPool(poolData);
