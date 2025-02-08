const express = require("express");
const multer = require("multer");
const xml2js = require("xml2js");
const fs = require("fs");
const CreditReport = require("../models/creditReport");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file || !req.file.mimetype.includes("xml")) {
    return res
      .status(400)
      .json({ message: "Invalid file format. Upload XML only" });
  }

  const filePath = req.file.path;
  const xmlData = fs.readFileSync(filePath, "utf8");

  xml2js.parseString(xmlData, { explicitArray: false }, async (err, result) => {
    if (err) return res.status(500).json({ message: "XML parsing error" });
    //      {
    //   console.error("XML Parsing Error:", err);
    //   return res.status(500).json({ message: "XML parsing error" }); //console
    // }
    // console.log("Parsed XML Data:", JSON.stringify(result, null, 2)); //console full parsed XML
    try {
      const creditReport = result?.CreditReport || {};
      const basicDetails = CreditReport?.BasicDetails || {};
      const reportSummary = CreditReport?.ReportSummary || {};
      const creditAccounts = CreditReport?.CreditAccounts?.Account || {};

      const extractedData = {
        name: basicDetails?.name || "N/A",
        mobilePhone: basicDetails?.MobilePhone || "N/A",
        PAN: basicDetails?.PAN || "N/A",
        creditScore: parseInt(basicDetails?.CreditScore) || 0,

        reportSummary: {
          totalAccounts: parseInt(reportSummary?.TotalAccounts) || 0,
          activeAccounts: parseInt(reportSummary?.ActiveAccounts) || 0,
          closedAccounts: parseInt(reportSummary?.ClosedAccounts) || 0,
          currentBalance: parseFloat(reportSummary?.CurrentBalanceAmount) || 0,
          securedAmount: parseFloat(reportSummary?.SecuredAccountsAmount) || 0,
          unsecuredAmount:
            parseFloat(reportSummary?.UnsecuredAccountsAmount) || 0,
          last7DaysEnquiries:
            parseInt(reportSummary?.Last7DaysCreditEnquiries) || 0,
        },

        creditAccounts: Array.isArray(creditAccounts)
          ? creditAccounts.map((acc) => ({
              creditCard: acc?.CreditCard || "N/A",
              bank: acc?.Bank || "N/A",
              address: acc?.Address || "N/A",
              accountNumber: acc?.AccountNumber || "N/A",
              amountOverDue: parseFloat(acc?.AmountOverdue) || 0,
              currentBalance: parseFloat(acc?.CurrentBalance) || 0,
            }))
          : [
              {
                creditCard: creditAccounts?.CreditCard || "N/A",
                bank: creditAccounts?.Bank || "N/A",
                address: creditAccounts?.Address || "N/A",
                accountNumber: creditAccounts?.AccountNumber || "N/A",
                amountOverDue: parseFloat(creditAccounts?.AmountOverdue) || 0,
                currentBalance: parseFloat(creditAccounts?.CurrentBalance) || 0,
              },
            ],
      };

      //save data to Db
      const newReport = new CreditReport(extractedData);
      await newReport.save();

      fs.unlinkSync(filePath);
      res
        .status(201)
        .json({ message: "File uploaded and processes Successfully!" });
    } catch (error) {
      console.error("Data extraction error:", error);
      res.status(500).json({ message: "Error processing XML data" });
    }
  });
});

module.exports = router;
