const startServer = require('./src/index');;

const bootStrap = async () => {
  startServer().then(({ host, port }) => {
    console.log(`Server is listening on ${host}: ${port}`);
  }).catch((error) => {
    console.error(`Error in starting server: ${error}`);
  })
};

bootStrap()