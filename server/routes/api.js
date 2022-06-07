var express = require("express");
var router = express.Router();

router.get("/city", async function (req, res, next) {
  try {
    let rows = await req.db.from("City").select("name", "district");
    res.json({ Error: false, Message: "Success", City: rows });
  } catch (err) {
    console.log(err);
    res.json({ Error: true, Message: "Error in mysql query" });
  }
});

router.get("/city/:CountryCode", async function (req, res, next) {
  try {
    let rows = req.db.from("City").select("name", "district");
    rows = rows.where("CountryCode", "=", req.params.CountryCode);
    res.json({ Error: false, Message: "Success", City: await rows });
  } catch (err) {
    console.log(err);
    res.json({ Error: true, Message: "Error in mysql query" });
  }
});

module.exports = router;
