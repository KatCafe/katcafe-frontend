Frontend of [KatCafe](https://katcafe.org) built in node.js and Vue.js 2

# Installation

```
npm install
```

### Run development mode

```
npm run dev
```

### Run

```
npm run build
npm run start
```

#### Instructions to test

```
yarn test
```
or
```
npm run test
```

Make sure to add a --watch flag
 
```
example file &&  jest sum.test.js --watch
```

# Deploy PM2

#### build it

```
npm run build
pm2 start npm -- start
pm2 restart `processId` --name front
```

#### new version

```
npm run build
pm2 restart front
```

