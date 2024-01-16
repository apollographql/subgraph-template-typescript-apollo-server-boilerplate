require("dotenv").config();
// Constructor for Configuration
function Configuration() {
  var configObj = {
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
      enableLog: process.env.EnableLog,
      logFileName: process.env.LogFileName,
      logDirectory: process.env.LogDirectory,
      logFileMaxSize: process.env.LogfileMaxSize,
      loggingLevel: "debug",
      enableMasking: process.env.EnableMasking,
    },
  };
  return configObj;
}

module.exports = Configuration;
