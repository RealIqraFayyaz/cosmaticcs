const mongoose = require("mongoose");

let cached = null;

async function connectDB(uri) {
  if (cached) return cached;
  mongoose.set("strictQuery", true);
  cached = await mongoose.connect(uri);
  return cached;
}

module.exports = { connectDB };

