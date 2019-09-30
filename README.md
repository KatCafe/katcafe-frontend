# Frontend

Front-end Integration


## Instructions to install

`npm install`


## Instructions to run

`npm run dev`

## Instructions to deploy

`npm run build`

`npm run start`


### Instructions to test 

`yarn test` || `npm run test` 


## Make sure to add a --watch flag 
 
 `example file &&  jest sum.test.js --watch`


## Deploy PM2

### frontend

#### build it

npm run build
pm2 start npm -- start
pm2 restart `processId` --name front

#### new version

npm run build
pm2 restart front


### backend

npm run start
pm2 restart `processId` --name back

#### new version

pm2 restart back