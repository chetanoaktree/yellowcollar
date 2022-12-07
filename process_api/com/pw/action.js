const https = require('https');
/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
//const PaytmChecksum = require('./PaytmChecksum');
const PaytmChecksum = require('paytmchecksum');

//const orderId='ORDERID_987655'

const doRequest = (options, data) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
               
        let responseBody = '';

        res.on('data', (chunk) => {
            responseBody += chunk;
        });

        res.on('end', () => {
            resolve(JSON.parse(responseBody));
        });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(data)
    req.end();
  });
}

const checksum = async ({order_id, paytmParams, checksum}) => {
    paytmParams.head = {
        "signature"    : checksum
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        //hostname: 'securegw-stage.paytm.in',

        /* for Production */
         hostname: 'securegw.paytm.in',

        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${process.env.PWID}&orderId=${order_id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };
    return await doRequest(options, post_data);
}

const action = async ({order_id, amount, type}) =>{
    //type : order, collab, membership
    var paytmParams = {};

    paytmParams.body = {
        "requestType"   : "Payment",
        "mid"           : process.env.PWID,
        "websiteName"   : "DEFAULT",
        "orderId"       : order_id,
        "callbackUrl"   : process.env.API+"/app/callback/"+type+"/"+order_id,
        "txnAmount"     : {
            "value"     : amount,
            "currency"  : "INR",
        },
        "userInfo"      : {
            "custId"    : "CUST_001",
        },
    };

    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    console.log("PROCESS paytmParams", paytmParams)
    console.log("PROCESS START")
    let cs=await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PWKEY);
    console.log("PROCESS 1", cs)
    let res = await checksum({order_id, paytmParams, checksum:cs})
    console.log("PROCESS 2", res)
    console.log("PROCESS END")

    return res.body ? res.body : {resultInfo:{resultStatus:'F'}}
}

export default action
