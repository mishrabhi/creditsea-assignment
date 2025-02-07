const mongoose = require("mongoose");

const creditReportSchema = new mongoose.Schema({
  name: String,
  mobilePhone: String,
  PAN: String,
  creditScore: Number,
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    last7DaysEnquiries: Number,
  },
  creditAccounts: [
    {
      creditCard: String,
      bank: String,
      address: String,
      accountNumber: String,
      amountOverDue: Number,
      currentBalance: Number,
    },
  ],
});

module.exports = mongoose.model("CreditReport", creditReportSchema);
