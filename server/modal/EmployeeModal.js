const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const EmployeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["developer", "hr", "manager", "account"],
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    houseRentAllowance: {
      type: Number,
      required: true,
    },
    specialAllowance: {
      type: Number,
      required: true,
    },
    grossEarning: {
      type: Number,
    },
    deduction: {
      type: Number,
    },
    birthday: {
      type: Date,
    },
  },
  { timestamps: true }
);

EmployeeSchema.pre("save", async function (next) {
  console.log(this.isModified('password'))
  if(!this.isModified('password')) return next();

  this.grossEarning = this.basicSalary + this.houseRentAllowance + this.specialAllowance
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);;
  next();
});

EmployeeSchema.methods.passwordCompare = async function(password , employeePassword) {
  return await bcrypt.compare(password, employeePassword)
}
const employeeModal = mongoose.model("Employee", EmployeeSchema);

module.exports = employeeModal;
