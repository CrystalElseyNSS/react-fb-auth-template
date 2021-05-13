# REACT APP WITH FIREBASE AUTH

Template for connecting a React app to Firebase Authentication, and saving active user to Firestore.


## Installation

```bash
git clone git@github.com:leoevents/react-fb-auth-template.git
cd react-fb-auth-template
```

```bash
npm install
npm install --save reactstrap react-bootstrap react-router-dom
npm install firebase
```

```bash
firebase init functions
    > Select project
    > JavaScript
    > ESLint? No
    > Overwrite package.json? No
    > Overwrite index.js? No
    > Overwrite .gitignore? No
    > Install dependencies? Yes
firebase deploy --only functions
```


## Firebase Setup

1. Create new project in the Firebase console
2. Authentication > Get Started > Enable Email/Password
3. ⚙️ > Project Settings >\
        Copy API Key from Project Settings and paste into .env.local file in root folder:\
        &nbsp;&nbsp;&nbsp;`REACT_APP_API_KEY=yourapikeyhere`\
        **NOTE:** You may have to restart local server before the app will read your .env.local file
4. Update Firebase project name in:\
        - .firebaserc\
        - package-lock.json\
        - package.json\
        - UserProfileProvider.js (functionsApiUrl)
5. Firestore Database > Create Database > Start in production mode > Enable
6. Firestore Database > Rules :\
        `service cloud.firestore {`\
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`match /databases/{database}/documents {`\
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`match /{document=**} {`\
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`allow read, write: if request.auth != null;`\
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`\
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`\
        `}`
7. Firestore Database > Create Collection > "users" > *create fake user*
8. Upgrade to Blaze plan