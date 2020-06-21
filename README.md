# μMora Quiz application

Web application for μMora Mathematics competition 2020 created by Tharindu Niranjan, Pulasthi Ekanayake, Nusri Nalir and Sandeepa Devin.

### Prerequisites

- nodejs - https://nodejs.org/en/download/
- firebase cli (for deployment) - https://firebase.google.com/docs/cli

### First time usage

- Run `npm install` in root folder.
- Create a file named `.env.development.local` and include the firebase details for the testing firebase project.
- Create a file name `.env.production.local` in root folder and include the firebase details for production firebase project.
- Enter your database details in the `.env.**` files

Here is a sample firebase details set

```
REACT_APP_API_KEY= AIzaSyCFPtR8KRSpFBSjXxLcKOmjh00Psmalg90
REACT_APP_AUTH_DOMAIN =  reactauthtest-13cc8.firebaseapp.com
REACT_APP_DB_URL= https://reactauthtest-13cc8.firebaseio.com
REACT_APP_PROJECT_ID= reactauthtest-13cc8
REACT_APP_STORAGE_BUCKET= reactauthtest-13cc8.appspot.com
REACT_APP_MESSENGER_ID= 879127747925
REACT_APP_APP_ID = 1:879127747925:web:5cb852c6f26cf93f3123dc
REACT_APP_MEASUREMENT_ID = G-50TZD5275Z

REACT_APP_USER_DB = testUsers
REACT_APP_JUNIOR_DB = juniorquiztest
REACT_APP_SENIOR_DB = seniorquiztest
REACT_APP_SUPERSENIOR_DB = superseniorquiztest

```

## Usage

For development you can run `npm start` and see a local copy at `localhost:3000`

For production

1. Run `npm run build` or `npm run-script build` to create a production build
2. Open `build/index.html` in your browser

For deployment run `firebase deploy` (requires firebase cli)
