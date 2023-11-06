function main(params) {
    return new Promise(function (resolve, reject) {
      const { CloudantV1 } = require("@ibm-cloud/cloudant");
      const { IamAuthenticator } = require("ibm-cloud-sdk-core");
      const authenticator = new IamAuthenticator({
        apikey: "", // Left Empty
      });
      const cloudant = CloudantV1.newInstance({
        authenticator: authenticator, //Auth
      });
      cloudant.setServiceUrl(""); // Left Empty
      if (params.st) { //For State
        cloudant
          .postFind({ db: "dealerships", selector: { st: params.st } })
          .then((result) => {
            let code = 200;
            if (result.result.docs.length == 0) {
              code = 404;
            }
            resolve({
              statusCode: code,
              headers: { "Content-Type": "application/json" },
              body: result.result.docs,
            });
          })
          .catch((err) => {
            reject(err);
          });
      } else if (params.dealerId) { 
        id = parseInt(params.dealerId); //For ID of Dealer
        cloudant
          .postFind({
            db: "dealerships",
            selector: {
              id: parseInt(params.dealerId),
            },
          })
          .then((result) => {
            let code = 200;
            if (result.result.docs.length == 0) {
              code = 404;
            }
            resolve({
              statusCode: code,
              headers: { "Content-Type": "application/json" },
              body: result.result.docs,
            });
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        cloudant
          .postAllDocs({ db: "dealerships", includeDocs: true }) //For All Dealers
          .then((result) => {
            let code = 200;
            if (result.result.rows.length == 0) {
              code = 404;
            }
            resolve({
              statusCode: code,
              headers: { "Content-Type": "application/json" },
              body: result.result.rows,
            });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
  
  