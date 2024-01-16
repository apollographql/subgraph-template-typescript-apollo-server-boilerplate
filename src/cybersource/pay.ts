import { MutationProcessPaymentArgs } from '../__generated__/resolvers-types';
const cybersourceRestApi = require('cybersource-rest-client');
const configuration = require('./configuration');

function processNetAuthorizedPayment(
  processPaymentArgs: MutationProcessPaymentArgs
) {
  try {
    const { args } = processPaymentArgs;
    const {
      firstName,
      lastName,
      cardNumber,
      cardExpiryMonth,
      cardExpiryYear,
      amount,
      email,
      phoneNumber,
      address: { address1, locality, postalCode, administrativeArea, country },
    } = args;

    var configObject = {
      authenticationType: process.env.AuthenticationType,
      runEnvironment: process.env.RunEnvironment,
      merchantID: process.env.MerchantId,
      merchantKeyId: process.env.MerchantKeyId,
      merchantsecretKey: process.env.MerchantSecretKey,
      keyAlias: process.env.KeyAlias,
      keyPass: process.env.KeyPass,
      keyFileName: process.env.KeyFileName,
      keysDirectory: process.env.KeysDirectory,
      useMetaKey: process.env.UseMetaKey,
      portfolioID: process.env.PortfolioID,
      logConfiguration: {
        enableLog: false,
      },
    };
    var apiClient = new cybersourceRestApi.ApiClient();
    var requestObj = new cybersourceRestApi.CreatePaymentRequest();

    var clientReferenceInformation =
      new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = 'TC50171_3';
    requestObj.clientReferenceInformation = clientReferenceInformation;

    var processingInformation =
      new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
    processingInformation.capture = true;
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
    orderInformationAmountDetails.currency = 'USD';
    orderInformation.amountDetails = orderInformationAmountDetails;

    var orderInformationBillTo =
      new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
    orderInformationBillTo.firstName = firstName;
    orderInformationBillTo.lastName = lastName;
    orderInformationBillTo.address1 = address1;
    orderInformationBillTo.locality = locality;
    orderInformationBillTo.administrativeArea = administrativeArea;
    orderInformationBillTo.postalCode = postalCode;
    orderInformationBillTo.country = country;
    orderInformationBillTo.email = email;
    orderInformationBillTo.phoneNumber = phoneNumber;
    orderInformation.billTo = orderInformationBillTo;

    requestObj.orderInformation = orderInformation;

    var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

    return instance.createPayment(
      requestObj,
      function (error: any, data: any, response: any) {
        if (error) {
          console.error('Error : ', error);
          throw new Error('Error processing payment: ' + error.message);
        } else if (data) {
          console.log('Data : ', data);
          console.log('Response : ', response);
          console.log(
            'Response Code of Process a Payment : ',
            response ? response['status'] : 'No response status'
          );
          return response;
        }
      }
    );
  } catch (error) {
    console.error('\nException on calling the API : ' + error);
    throw new Error('Error processing payment: ' + error.message);
  }
}

export default processNetAuthorizedPayment;
