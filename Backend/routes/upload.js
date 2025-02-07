const express = require("express");
const multer = require("multer");
const xml2js = require("xml2js");
const fs = require("fs");
const CreditReport = require("../models/creditReport");

const router = express.Router();
const upload = multer({ dest: "/uploads" });

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file || req.file.mimetype !== "text/xml") {
    return res
      .status(400)
      .json({ message: "Invalid file format. Upload XML only" });
  }

  const filePath = req.file.path;
  const xmlData = fs.readFileSync(filePath, "utf8");

  xml2js.parseString(xmlData, async (err, result) => {
    if (err) return res.status(500).json({ message: "XML parsing error" });

    const extractedData = {
      name: result.creditReport.Name[0],
      mobilePhone: result.creditReport.MobilePhone[0],
      PAN: result.creditReport.PAN[0],
      creditScore: parseInt(result.creditReport.creditScore[0]),
      reportSummary: {
        totalAccounts: parseInt(
          result.creditReport.ReportSummary[0].TotalAccounts[0]
        ),
        activeAccounts: parseInt(
          result.creditReport.ReportSummary[0].ActiveAccounts[0]
        ),
        closedAccounts: parseInt(
          result.creditReport.ReportSummary[0].CloseAccounts[0]
        ),
        currentBalance: parseFloat(
          result.CreditReport.ReportSummary[0].CurrentBalance[0]
        ),
        securedAmount: parseFloat(
          result.CreditReport.ReportSummary[0].SecuredAmount[0]
        ),
        unsecuredAmount: parseFloat(
          result.CreditReport.ReportSummary[0].UnsecuredAmount[0]
        ),
        last7DaysEnquiries: parseInt(
          result.CreditReport.ReportSummary[0].Last7DaysEnquiries[0]
        ),
      },
      creditAccounts: result.CreditReport.creditAccounts[0].Accounts.map(
        (acc) => ({
          creditCard: acc.CreditCard[0],
          bank: acc.Bank[0],
          address: acc.Address[0],
          accountNumber: acc.AccountNumber[0],
          amountOverDue: parseFloat(acc.AmountOverDue[0]),
          currentBalance: parseFloat(acc.CurrentBalance[0]),
        })
      ),
    };

    //save data
    const newReport = new CreditReport(extractedData);
    await newReport.save();

    fs.unlinkSync(filePath);
    res
      .status(201)
      .json({ message: "File uploaded and processes Successfully!" });
  });
});

module.exports = router;
