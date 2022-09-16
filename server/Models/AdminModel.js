

// module.exports = mongoose.model("admins", adminSchema);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
  console.log("admin model");
const adminSchema = new mongoose.Schema({
  
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },
});

adminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    console.log(admin);
    if (admin.password == password) {
      return admin;
    }
    throw Error("Incorrect Password!");
  } else {
    throw Error("Incorrect Email!");
  }
};

module.exports = mongoose.model("admin", adminSchema);
