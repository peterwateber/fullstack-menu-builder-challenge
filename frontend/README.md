#### Frontend

- Home credential
```
email: firebase-access@firebase-access.test
password: firebase-access@firebase-access.test
```
- Frontend has a proxy to `http://localhost:3001` Backend service. Please ensure you run backend service

- Firebase config should be sent via email as these are private keys
- Set/Create the `.env` variable 

```javascript
REACT_APP_apiKey=<refer to firebase config>
REACT_APP_authDomain=<refer to firebase config>
REACT_APP_databaseURL=<refer to firebase config>
REACT_APP_projectId=<refer to firebase config>
REACT_APP_storageBucket=<refer to firebase config>
REACT_APP_messagingSenderId=<refer to firebase config>
REACT_APP_appId=<refer to firebase config>
```
- `$ npm i` to install modules
- `$ npm start` to start the Frontend service
- Accessible via `http://localhost:3000`