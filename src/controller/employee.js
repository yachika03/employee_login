const employeeModel = require("../model/employeeModel");
const { uploadFile } = require("../aws/aws");
const {
  isValid,
  isValidName,
  isValidProfile,

  emailregex,
  phoneregex,
  isValidInputBody,
} = require("../validation/validation");
const createEmployee = async function (req, res) {
  try {
    let requestbody = req.body;
    let files = req.files;
    if (!isValidInputBody(requestbody))
      return res
        .status(400)
        .send({ status: false, message: "Data is required in Request Body" });
    const { Photo, FirstName, LastName, City, Email, MobileNo } = requestbody;
    if (!files || files.length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "No profile image found" });
    }

    if (!isValidProfile(files[0].mimetype)) {
      return res.status(400).send({
        status: false,
        message: "Only images can be uploaded (jpeg/jpg/png)",
      });
    }
    let fileUrl = await uploadFile(files[0]);
    console.log(files);
    requestbody.Photo = fileUrl;
    if (!isValid(FirstName)) {
      return res
        .status(400)
        .send({ status: false, message: "first name is required" });
    }
    if (!isValidName(FirstName))
      return res
        .status(400)
        .send({
          status: false,
          message: "first name should contain only alphabets",
        });
    if (isValid(LastName)) {
      return res
        .status(400)
        .send({ status: false, message: "last name is required" });
    }
    if (!isValidName(LastName))
      return res
        .status(400)
        .send({
          status: false,
          message: "last name should contain only alphabets",
        });
    if (!isValid(MobileNo))
      return res
        .status(400)
        .send({ status: false, message: "MobileNo number must be prasent" });
    if (!phoneregex(MobileNo))
      return res
        .status(400)
        .send({
          status: false,
          message: "MobileNo number must be in a valid format",
        });
    const isMobileNoAlreadyUsed = await employeeModel.findOne({
      MobileNo: MobileNo,
    });
    if (isMobileNoAlreadyUsed)
      return res
        .status(400)
        .send({ status: false, message: "MobileNo number already registered" });
    if (!isValid(Email))
      return res
        .status(400)
        .send({ status: false, message: "Email is required" });
    if (!emailregex(Email))
      return res
        .status(400)
        .send({ status: false, message: "Email should be valid" });
    let EmailAlreadyUsed = await employeeModel.findOne({ Email: Email });
    if (EmailAlreadyUsed)
      return res
        .status(400)
        .send({ status: false, message: "Email already registered" });
    if (City) {
      if (!isValidName(City))
        return res
          .status(400)
          .send({
            status: false,
            message: "city name should contain only alphabets",
          });
    }

    const result = await employeeModel.create(requestbody);
    // console.log(result)
    return res
      .status(201)
      .send({
        status: true,
        message: "user Successfully Created",
        data: result,
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateEmployee = async function (req, res) {
  try {
    let reqbody = req.body;
    let files = req.files;
    let employee_Id=req.params.employeeId
    let update = {};
    const { Photo, FirstName, LastName, City, Email, MobileNo } = reqbody;
    if (FirstName) {
      if (!isValidName(FirstName))
        return res
          .status(400)
          .send({ status: false, message: "FirstName is invalid" });
      update.FirstName = FirstName;
    }
    if (LastName) {
      if (!isValidName(LastName))
        return res
          .status(400)
          .send({ status: false, message: "LastName is invalid" });
      update.LastName = LastName;
    }
    if (Email) {
      if (!emailregex(Email))
        return res
          .status(400)
          .send({ status: false, message: "Email is invalid" });
      let data = await employeeModel.findOne({ Email: Email });
      if (data != null)
        return res
          .status(409)
          .send({
            status: false,
            message: `this ${data.Email} is already present`,
          });
      update.Email = Email;
    }
    if (files.length > 0) {
      if (!validation.isValidProfile(files[0].mimetype))
        return res
          .status(400)
          .send({
            status: false,
            msg: "plz provide profileImage in (jpg|png|jpeg) formate",
          });
      req.Link = await AWS.uploadFile(files[0]);
      update.Photo = req.Link;
    }
    if (MobileNo) {
      if (!validation.phoneregex(MobileNo))
        return res
          .status(400)
          .send({ status: false, message: "MobileNo no is invalid" });
      let data = await userModel.findOne({ MobileNo: MobileNo });
      if (data != null)
        return res
          .status(409)
          .send({
            status: false,
            message: `this ${data.MobileNo} is already present`,
          });
      update.MobileNo = MobileNo;
    }
    if (City) {
      if (!isValidName(City))
        return res
          .status(400)
          .send({ status: false, message: "City is invalid" });
      update.City = City;
    }
    let result = await userModel.findByIdAndUpdate(
      { _id: employee_Id },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: "updated details", data: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const deleteEmployee = async function (req, res) {
  try {
    let requestbody = req.body;
    let employeeId = req.params.employeeId;
    if (!validation.isValidObjectId(employeeId)) {
      return res
        .status(400)
        .send({ status: false, message: `${employeeId} is not valid` });
    }
    let employeeIdInDb = await employeeModel.findOne({ _id: employeeId });
    if (!employeeIdInDb)
      return res
        .status(400)
        .send({ status: false, message: "employee is deleted or not found" });
    await employeeModel.findByIdAndUpdate(
      { _id: employeeId },
      { $set: { isDeleted: true, deletedAt: Date.now() } },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: "employee is deleted successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createEmployee, updateEmployee, deleteEmployee };
