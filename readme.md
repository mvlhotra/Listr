# Listr - Midterm Project App
## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- body-parser 1.18.3 or above
- cookie-session 2.0.0-beta.3 or above
- dotenv 6.2.0 or above
- ejs 2.6.1 or above
- express 4.16.4 or above
- knex 0.16.3 or above
- knex-logger 0.1.0 or above
- method-override 3.0.0 or above
- morgan 1.9.1 or above
- node-sass-middleware 0.11.0 or above
- nodemon 1.18.10 or above
- pg 7.8.1 or above