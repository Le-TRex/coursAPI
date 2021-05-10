## Boilerplate API IT Akademy

### Setup env

Create a new `.env` file at the root project and add the content of the `.env.example` file inside

### Install dependencies

Run this command in your terminal :  
`npm install`

### Setup the BDD

Run these command in your terminal :  
`sequelize db:migrate`  
  
`sequelize db:seed:all`

ssi les commandes `sequelize` ne fonctionnenet pas :

`node_modules/.bin/sequelize db:migrate `

`node_modules/.bin/sequelize db:seed:all `

### Launch server
Run this command in your terminal :  
`npm run dev`
