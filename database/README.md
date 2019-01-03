<h1>Firebase Database Ops</h1>
A database project guide to assist in developing interations with the realtime database.

1. Firebase database init

  Select the Database option during `firebase init`<br>
  ![alt text](https://github.com/onrul/firebase-collab/raw/master/database/images/Firebase_DB_init.PNG "database init")<br>

2. Firebase functions and hosting
  Also include the `hosting` and if applicable the `functions`<br>

  ![alt text](https://github.com/onrul/firebase-collab/raw/master/database/images/Firebase_db_functions_hosting.PNG "hosting /functions")<br>

  Continue to choose init options until complete<br>
  Choose default project from `firebase console`. https://console.firebase.google.com/<br>
  Set database.rules.json (leave default)<br>
  Choose default language for cloud `functions` (JavaScript or TypeScript)<br>
  Choose to use ESLint (Y/N)<br>
  Install NPM dependencies (Y/N)<br>
  Choose hosting public folder (default is public)<br>
  Choose to configure as Single-Page App --rewrite URLs to single file (No)

3. Firebase database rules

  Open `database.rules.json` file to edit database rules.<br>
  By default rules are set to `read` and `write` only by authorized users
