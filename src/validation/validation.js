
const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value == "string" && value.trim().length === 0) return false;
  return true;
};
const phoneregex = function (data) {
  if (/^([6-9]\d{9})$/.test(data)) {
    return true;
  }
  return false;
};
const emailregex = function (data) {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data)) {
    return true;
  }
  return false;
};

const isValidName = function (value) {
  return /^[A-Za-z]+((\s)?[A-Za-z]+)*$/.test(value);
};
const isValidProfile = function (value) {
  const reg = /image\/png|image\/jpeg|image\/jpg/;
  return reg.test(value);
};

const isValidInputBody = function(object) {
    return Object.keys(object).length > 0
  }
module.exports = {
  isValid,
  isValidName,
  isValidProfile,
 
  emailregex,
  phoneregex,
  isValidInputBody,
};
