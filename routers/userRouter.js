const Model = require("../models/userModel");
const express = require("express");
const router = express.Router();

// router.post("/add", (req, res) => {
//   console.log(req.body);

//   new Model(req.body)
//     .save()
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json(err);
//     });
// });

router.post("/add", async (req, res) => {
  const { email } = req.body;

  try {
    const userExist = await Model.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ error: "Email already exist !" });
    } else {
      const user = new Model(req.body);
      await user.save();
      res.status(201).json({ message: "User registered successfully !!" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/check-login", (req, res) => {
  console.log(req.body);

  const formdata = req.body;

  Model.findOne({ email: formdata.email, password: formdata.password })
    .then((data) => {
      if (data) {
        if (data.password == formdata.password) {
          res.status(200).json(data);
        } else {
          res.status(300).json({ message: "password incorrect" });
        }
      } else {
        res.status(300).json({ message: "email not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/getall", (req, res) => {
  Model.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.error(err);
    });
});

module.exports = router;
