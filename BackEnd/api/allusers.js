const express = require("express");
const apiutils = require("../request_handler");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

const pool = require("../dbconnector.js");

router.get("/", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of all users!",
    async (conn) => {
      const ans_list = await conn.query("SELECT * FROM users");

      json_res = [];
      for (elem of ans_list) {
        json_res.push({
          userID: elem.user_id,
          username: elem.username,
        });
      }

      if (req.query.format == "csv") {
        const opts = {
          fields: ["userID", "username"],
        };
        return new Parser(opts).parse(json_res);
      } else {
        return json_res;
      }
    }
  );
});

module.exports = router;
