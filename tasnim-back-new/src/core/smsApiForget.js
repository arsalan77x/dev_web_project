var request = require('request');
const Customer = require('../database/model/bussiness/customer.model');
const { SuccessResponse } = require('./ApiResponse');
const { BadRequestError } = require('./ErrorHandler');

module.exports = async function (req, res, next) {

  const phone = req.params.phone;
  const randomNum = JSON.stringify(Math.floor(Math.random() * (100000 - 10000) + 10000))
  Customer.findOne({ phone: phone }, function (err, doc) {
    if (!doc) {
      new BadRequestError("چنین شماره ای موجود نیست").send(res)
    } else {

      request.post(
        'https://RestfulSms.com/api/Token',
        {
          json: {
            "UserApiKey": "1af0b73b9bfc7c71da5cc3ba",
            "SecretKey": "t4sn1m"
          }
        },
        async function (error, response, body) {
          if (!error && response.statusCode >= 200) {
            const tokenApi = body.TokenKey;
            var myBody = {
              "ParameterArray": [
                { "Parameter": "VerificationCode", "ParameterValue": randomNum },
              ],
              "Mobile": phone,
              "TemplateId": "63520"
            }
            request({
              url: "https://RestfulSms.com/api/UltraFastSend",
              method: "POST",
              headers: {
                "x-sms-ir-secure-token": tokenApi,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(myBody)
            }, async function (error, response, body) {

              if (!error && response.statusCode >= 200) {

                try {
                  Customer.updateOne({ phone: phone }, { $set: { verif_code: randomNum } }, function (err, doc) {
                    if (!doc) {
                      new BadRequestError("ثبت با مشکل مواجه شد").send(res)
                    } else {
                      new SuccessResponse("پیامک ارسال شد ").send(res)
                    }

                  })

                } catch (err) {
                  new BadRequestError(err).send(res)
                }

              } else {
                new BadRequestError("error").send(res)
              }
            });

          } else {
            new BadRequestError("درخواست با خطا مواجه شد").send(res)
          }

        }
      );


    }
  })




};