const Creates = require("./create");
const Updates = require("./update");
const Deletes = require("./delete");

module.exports = {
  ...Creates,
  ...Updates,
  // ...Deletes,
};
