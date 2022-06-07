var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const secretKey = "secret key";
let currentEmail = "";

const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.split(" ").length === 2) {
    token = authHeader.split(" ")[1];
  } else {
    res.sendStatus(401); //unauthorized
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.exp < Date.now()) {
      return res.sendStatus(408); //request time out
    }
    currentEmail = decoded.email;
    next();
  } catch (e) {
    console.log("Token Not Valid: " + token);
  }
};

router.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Email and password needed",
    });

    return;
  }

  const queryUsers = await req.db
    .from("users")
    .select("*")
    .where("email", "=", email);

  if (queryUsers.length === 0) {
    res.json({
      error: true,
      message: "User Does not exists",
    });
    return;
  }

  const user = queryUsers[0];
  console.log(user);
  const match = bcrypt.compare(password, user.password);

  if (!match) {
    res.json({
      error: true,
      message: "Password dont match",
    });
    return;
  }

  const expiresIn = 70 * 60 * 24;
  const exp = Date.now() + expiresIn * 1000;

  const token = jwt.sign({ email, exp }, secretKey);

  res.json({ token_type: "Bearer", token, expiresIn });
});

router.post("/register", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password || !username) {
    res.status(400).json({
      error: true,
      message: "Email, Username, and password needed",
    });

    return;
  }

  const queryUsers = req.db
    .from("users")
    .select("*")
    .where("email", "=", email);

  if (queryUsers.length > 0) {
    res.json({
      error: true,
      message: "User Already exists",
    });
    return;
  }

  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(password, saltRounds);
  await req.db
    .from("users")
    .insert({ email: email, username: username, password: passwordHash });
  console.log("successfully inserted user");
  res.json({ error: false, message: "success" });
});

router.post("/addWatchlist", authorize, async function (req, res) {
  const email = currentEmail;
  const symbol = req.body.symbol;

  if (!email || !symbol) {
    res.status(400).json({
      error: true,
      message: "Email and symbol needed",
    });

    return;
  }

  const queryUsers = req.db
    .from("watchlist")
    .select("*")
    .where("email", "=", email)
    .andWhere("symbol", "=", symbol);

  if (queryUsers.length > 0) {
    res.json({
      error: true,
      message: "User Already adds this symbol",
    });
    return;
  }

  await req.db.from("watchlist").insert({ email: email, symbol: symbol });
  console.log("successfully inserted symbol to watchlist");
  res.json({ error: false, message: "Successfully add to watchlist" });
});

router.post("/deleteWatchlist", authorize, async function (req, res) {
  const email = currentEmail;
  const symbol = req.body.symbol;

  if (!email || !symbol) {
    res.status(400).json({
      error: true,
      message: "Email and symbol needed",
    });

    return;
  }

  const queryUsers = req.db
    .from("watchlist")
    .select("*")
    .where("email", "=", email)
    .andWhere("symbol", "=", symbol);

  if (queryUsers.length == 0) {
    res.json({
      error: true,
      message: "No symbol exist in watchlist",
    });
    return;
  }

  await req.db
    .from("watchlist")
    .del({ email: email, symbol: symbol })
    .where("email", "=", email)
    .andWhere("symbol", "=", symbol);
  console.log("successfully deleted symbol from watchlist");
  res.json({ error: false, message: "Successfully deleted from watchlist" });
});

router.post("/getwatchlist", authorize, async function (req, res) {
  const email = currentEmail;
  if (!email) {
    res.status(400).json({
      error: true,
      message: "Email needed",
    });

    return;
  }

  let queryUsers = req.db
    .from("watchlist")
    .select("symbol")
    .where("email", "=", email);

  if (queryUsers.length === 0) {
    res.json({
      error: true,
      message: "User Does not exists",
    });
    return;
  }

  res.json({ error: false, message: "Success", watchList: await queryUsers });
});

module.exports = router;
