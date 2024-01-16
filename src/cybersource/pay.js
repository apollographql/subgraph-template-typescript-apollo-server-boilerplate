"use strict";

var cybersourceRestApi = require("cybersource-rest-client");
const getFields = require("./getFields");
const Configuration = require("../../../data/Configuration");

function simple_authorization_internet(
  body,
  res,
  next,
  callback,
  enable_capture
) {
  try {
    const {
      firstName,
      lastName,
      cardNumber,
      cardExpiryMonth,
      cardExpiryYear,
      amount,
      email,
      phoneNumber,
    } = getFields(body, res);

    var configObject = new Configuration();
    var apiClient = new cybersourceRestApi.ApiClient();
    var requestObj = new cybersourceRestApi.CreatePaymentRequest();

    var clientReferenceInformation =
      new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = "TC50171_3";
    requestObj.clientReferenceInformation = clientReferenceInformation;

    var processingInformation =
      new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
    processingInformation.capture = enable_capture === true;
    requestObj.processingInformation = processingInformation;

    var paymentInformation =
      new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
    var paymentInformationCard =
      new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
    paymentInformationCard.number = cardNumber;
    paymentInformationCard.expirationMonth = cardExpiryMonth;
    paymentInformationCard.expirationYear = cardExpiryYear;
    paymentInformation.card = paymentInformationCard;

    requestObj.paymentInformation = paymentInformation;

    var orderInformation =
      new cybersourceRestApi.Ptsv2paymentsOrderInformation();
    var orderInformationAmountDetails =
      new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = amount;
    orderInformationAmountDetails.currency = "USD";
    orderInformation.amountDetails = orderInformationAmountDetails;

    var orderInformationBillTo =
      new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
    orderInformationBillTo.firstName = firstName;
    orderInformationBillTo.lastName = lastName;
    orderInformationBillTo.address1 = "1 Market St";
    orderInformationBillTo.locality = "san francisco";
    orderInformationBillTo.administrativeArea = "CA";
    orderInformationBillTo.postalCode = "94105";
    orderInformationBillTo.country = "US";
    orderInformationBillTo.email = email;
    orderInformationBillTo.phoneNumber = phoneNumber;
    orderInformation.billTo = orderInformationBillTo;

    requestObj.orderInformation = orderInformation;

    var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

    instance.createPayment(requestObj, function (error, data, response) {
      if (error) {
        console.error("Error : ", error);
        return next("Error processing payment: " + error.message);
      } else if (data) {
        console.log("Data : ", data);
      }

      console.log("Response : ", response);
      console.log(
        "Response Code of Process a Payment : ",
        response ? response["status"] : "No response status"
      );

      callback(error, data, response);
    });
  } catch (error) {
    console.error("\nException on calling the API : " + error);
    return next(error);
  }
}

// function write_log_audit(status) {
//   var filename = path.basename(__filename).split(".")[0];
//   console.log(`[Sample Code Testing] [${filename}] ${status}`);
// }

module.exports = simple_authorization_internet;
