const bcrypt = require("bcryptjs");
const { z } = require("zod");
const { User } = require("../models/User");
const { signToken } = require("../utils/jwt");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/env");

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(200),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
});

async function register(req, res, next) {
  try {
    const data = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: data.email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await User.create({ name: data.name, email: data.email, passwordHash, role: "user" });
    const token = signToken({ sub: user._id.toString(), role: user.role }, { secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const data = loginSchema.parse(req.body);
    const user = await User.findOne({ email: data.email }).select("+passwordHash");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ sub: user._id.toString(), role: user.role }, { secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  res.json({ user: req.user });
}

module.exports = { register, login, me };

