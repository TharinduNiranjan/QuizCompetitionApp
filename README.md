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
REACT_APP_API_KEY=  -- get from firebase config---
REACT_APP_AUTH_DOMAIN = -- get from firebase config---
REACT_APP_DB_URL=  -- get from firebase config---
REACT_APP_PROJECT_ID=  -- get from firebase config---
REACT_APP_STORAGE_BUCKET= -- get from firebase config---
REACT_APP_MESSENGER_ID=  -- get from firebase config---
REACT_APP_APP_ID =  -- get from firebase config---
REACT_APP_MEASUREMENT_ID =  -- get from firebase config---

REACT_APP_USER_DB = --set user database name--
REACT_APP_JUNIOR_DB = --set database name--
REACT_APP_SENIOR_DB = --set database name--
REACT_APP_SUPERSENIOR_DB = --set database name--

```

## Usage

For development you can run `npm start` and see a local copy at `localhost:3000`

For production

1. Run `npm run build` or `npm run-script build` to create a production build
2. Open `build/index.html` in your browser

For deployment run `firebase deploy` (requires firebase cli)

## Manipulating the Firestore

Use the functions in `scripts\` folder to manipulate the firestore database to create users and assign questions.

## Contribution

Pulasthi Ekanayake - Quiz Application and unicode latex parser
Tharindu Niranjan - User Authentication and Firebase
Kavindu Nadeeshana - Design and Styling
Sandeepa Devin - Static Pages
Nusri Nalir -Timer
