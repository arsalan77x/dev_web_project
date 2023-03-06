var request = require('request');
const Customer = require('../database/model/bussiness/customer.model');
const { SuccessResponse, BadRequestResponse } = require('./ApiResponse');

module.exports = async function (req, res) {

  const phone = req.params.phone;
  const randomNum = JSON.stringify(Math.floor(Math.random() * (100000 - 10000) + 10000))
  const currnetConstomer = await Customer.findOne({ phone: phone }, function (err, doc) {
    if (doc && doc.verified) {
      new BadRequestResponse("این شماره قبلا ثبت شده است").send(res)
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
              "TemplateId": "43753"
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
                  const customer = new Customer({
                    phone: phone,
                    verif_code: randomNum
                  })
                  if (doc) {
                    const updatedcustomer = await Customer.updateOne({ phone: phone }, { verif_code: randomNum })
                  } else {
                    var newCustomer = await customer.save(function (err, doc) {
                      if (!doc) {
                        new BadRequestResponse("ثبت با مشکل مواجه شد").send(res)
                      }
                    })
                  }
                  new SuccessResponse("پیامک ارسال شد ").send(res)
                } catch (err) {
                  new BadRequestResponse(err).send(res)
                }

              } else {
                new BadRequestResponse(error).send(res)
              }
            });

          } else {
            new BadRequestResponse("درخواست با خطا مواجه شد").send(res)
          }

        }
      );


    }
  })




};