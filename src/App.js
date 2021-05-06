// npm i amazon-cognito-identity-js
import {CognitoUserPool} from 'amazon-cognito-identity-js'

export default ()=> {
  console.log(process.env.REACT_APP_USER_POOL_ID);
  return (
    <div >
      Hello AWS Amplify!!
    </div>      
  );
}
