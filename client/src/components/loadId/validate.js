const doc = require('arg.js').document;

export function validate(input) {
  let error = {
    isError: false,
    idType: "",
    nationality: "",
    idIssueDate: "",
    idExpirationDate: "",
    idNumber: "",
    birthDate: ""
  }


  if (!input.idType) {
    error.idType = "ID type is required"
    error.isError = true
  }
  if (!input.nationality) {
    error.nationality = "Nationality is required"
    error.isError = true
  }
  if (!input.idIssueDate) {
    error.idIssueDate = "ID issue date is required"
    error.isError = true
  } else {
    let issueDate = new Date(input.idIssueDate);
    if (issueDate.getTime() > Date.now()) {
      error.idIssueDate = "Must be in the past"
      error.isError = true
    }
  }
  if (!input.idExpirationDate) {
    error.idExpirationDate = "ID expiration date is required"
    error.isError = true
  } else {
    let expirationDate = new Date(input.idExpirationDate)
    if (expirationDate.getTime() < Date.now()) {
      error.idExpirationDate = "ID expired"
      error.isError = true
    }
  }
  if (!input.idNumber) {
    error.idNumber = "ID Number is required"
    error.isError = true
  } else if (!doc.isValidDni(input.idNumber)) {
    error.idNumber = "ID Number not valid"
    error.isError = true
  }
  if (!input.birthDate) {
    error.birthDate = "birth Date is required"
    error.isError = true
  } else {
    let birthday = new Date(input.birthDate)

    let oldEnough = 568025136000;
    console.log('cuenta', birthday.getTime() - oldEnough)
    if ((Date.now() - birthday.getTime()) < oldEnough) {
      error.birthDate = "You must be older than 18"
      error.isError = true
    }
  }
  return error
}