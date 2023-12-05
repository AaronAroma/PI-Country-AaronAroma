const server = require("./src/server");
const { conn } = require("./src/db.js");
const initalUpload = require("./src/helpers/initDB");
const PORT = 3001;
conn
  .sync({ force: false })
  .then(async () => {
    await initalUpload();
    server.listen(PORT, async () => {
      console.log("Server listening on port:", PORT);
    });
  })
  .catch((error) => console.error(error));