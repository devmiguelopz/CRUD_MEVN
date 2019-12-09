const mongoose = require("mongoose");
try {
  const URI = 'mongodb://localhost/mevn-task';
  mongoose.connect(URI)
    .then(console.info("mongoose.connect => success"))
    .catch(error => console.error("mongoose.connect =>", error));
} catch (error) {
  console.error("src/database.js =>",error)
}
module.exports = mongoose;