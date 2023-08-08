const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../data_models/order");
const User = require("../data_models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

router.post(
  "/signUp",
  [
    body("name").isLength({ min: 5 }),
    body("username").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { name, location, username, password } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res
        .status(200)
        .json({ success: false, message: "Enter valid credentials" });
    }

    const check = await User.findOne({ username: username });
    if (check) {
      return res
        .status(200)
        .json({ success: false, message: "Username already exists" });
    }
    const secure_pass = await bcrypt.hash(password, 10);
    const user = new User({ name, location, username, password: secure_pass });
    user
      .save()
      .then(() => {
        console.log(`saved`);
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        console.log(`failed------->${err}`);
        res
          .status(200)
          .json({ success: false, message: "Failed to Create your Account" });
      });
  }
);

router.post(
  "/login",
  [body("username").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const validate = validationResult(req.body);
    if (!validate) {
      return res.status(200).json({ success: false });
    }
    const { username, password } = req.body;
    const find = await User.findOne({ username: username });
    if (!find) {
      return res
        .status(200)
        .json({ success: false, message: "Username dosen't exists" });
    }

    bcrypt.compare(find.password, password, (err, data) => {
      if (err) {
        return res
          .status(200)
          .json({ success: false, message: "Incorrect password" });
      }
      return res.status(200).json({
        success: true,
        message: "Login Successfull",
        name: find.name,
        username: find.username,
      });
    });
  }
);

// Get logged in User details, Login Required.
router.post("/getuser", fetch, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); // -password will not pick password from db.
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});
// Get logged in User details, Login Required.
// router.post("/getlocation", async (req, res) => {
//   try {
//     let lat = req.body.latlong.lat;
//     let long = req.body.latlong.long;
//     console.log(lat, long);
//     let location = await axios
//       .get(
//         "https://api.opencagedata.com/geocode/v1/json?q=" +
//           lat +
//           "+" +
//           long +
//           "&key=74c89b3be64946ac96d777d08b878d43"
//       )
//       .then(async (res) => {
//         // console.log(`statusCode: ${res.status}`)
//         console.log(res.data.results);
//         // let response = stringify(res)
//         // response = await JSON.parse(response)
//         let response = res.data.results[0].components;
//         console.log(response);
//         let { village, county, state_district, state, postcode } = response;
//         return String(
//           village +
//             "," +
//             county +
//             "," +
//             state_district +
//             "," +
//             state +
//             "\n" +
//             postcode
//         );
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     res.send({ location });
//   } catch (error) {
//     console.error(error.message);
//     res.send("Server Error");
//   }
// });

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });
  console.log("1231242343242354", req.body.email);

  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      console.log(data);
      console.log("1231242343242354", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

router.get("/myOrderData", async (req, res) => {
  console.log(req.query.mess);
  const email = req.query.email;
  console.log(email);
  let eId = await Order.findOne({ email: req.query.email });
  res.status(200).json({ success: "false", orderData: eId });
});

module.exports = router;
