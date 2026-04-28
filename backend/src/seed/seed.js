const bcrypt = require("bcryptjs");
const { connectDB } = require("../config/db");
const { MONGODB_URI } = require("../config/env");
const { Product } = require("../models/Product");
const { User } = require("../models/User");
const products = require("./products");

async function seed() {
  await connectDB(MONGODB_URI);

  await Product.deleteMany({});
  await User.deleteMany({ email: { $in: ["admin@aurelia.local"] } });

  const created = await Product.insertMany(products);

  const adminPassword = "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const admin = await User.create({
    name: "AURÉLIA Admin",
    email: "admin@aurelia.local",
    passwordHash,
    role: "admin",
  });

  // eslint-disable-next-line no-console
  console.log(`Seeded ${created.length} products.`);
  // eslint-disable-next-line no-console
  console.log(`Admin: ${admin.email} / ${adminPassword}`);
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

