const AdminModel = require("../Models/AdminModel");
const AppModel = require("../Models/AppsModel");
const SlotModel = require("../Models/SlotModel");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id },process.env.JWT, {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  
  if (err.message === "incorrect Email")
    errors.email = "That email is not registerd";
  if (err.message === "incorrect Password")
    errors.email = "That Password is Incorrect";
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.adminlogin = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const admin = await AdminModel.login(email, password);
    console.log("KD");
    const token = createToken(admin._id);
    res.cookie("jwt", token, {
      withCrdentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ admin: admin._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.newdata = async (req, res, next) => {
  try {
    const datas = await AppModel.find({ status: "New" });
    res.json({ datas, status: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports.pendingApplications = async (req, res, next) => {
  try {
    const data = await AppModel.find({ status: "Pending" });
    res.json({ data, status: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports.allApplications = async (req, res, next) => {
  try {
    const data = await AppModel.find({});
    res.json({ data, status: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports.changeStatus = async (req, res, next) => {
  try {
    const datas = req.body;
    const data = await AppModel.findByIdAndUpdate(
      { _id: datas.id },
      { status: datas.status }
    );
    res.json({ data, datas, status: "Pending" });
  } catch (err) {
    console.log(err);
  }
};

module.exports.allSlots = async (req, res, next) => {
  try {
    const slots = await SlotModel.find();
    res.json(slots);
  } catch (err) {
    console.log(err);
  }
};

module.exports.slotUpdate = async (req, res, next) => {
  try {
    console.log(req.body)
    const { appId, slotId, slotSection, slotnumber } = req.body;
    
    const appData = await AppModel.findOneAndUpdate(
      { _id: appId },
      {
        $set: {
          bookingStatus: true,
          slotCode: slotId,
          section: slotSection,
          slotnumber: slotnumber,
          status: "Booked",
        },
      }
    );
    const data = await SlotModel.findOneAndUpdate(
      { _id: slotId },
      {
        $set: {
          selected: true,
          companyname: appData.companyName,
          user_email: appData.email,
        },
      }
    );
    res.json({ appData, data, status: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports.viewApplication = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await AppModel.findById({ _id: id });
    res.json({ data, status: true });
  } catch (err) {
    console.log(err);
  }
};

//getting all users
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

//deleting user
module.exports.deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//editing User
module.exports.editUser = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

//adding User
module.exports.addNewUser = async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (user) {
    res.status(400).send({ message: "Failed! Email is already in use!" });
    return;
  } else {
    const newUser = new UserModel(req.body);
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      console.log(err);
    }
  }
};

