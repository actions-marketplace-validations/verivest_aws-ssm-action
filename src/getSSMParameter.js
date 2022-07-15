const AWS = require("aws-sdk");

const getSSMParameter = async ({ ssmPath, region }) => {
  const ssmClient = new AWS.SSM({
    apiVersion: "2014-11-06",
    region,
  });

  const ssmParameter = await ssmClient
    .getParameter({
      Name: ssmPath,
      WithDecryption: true,
    })
    .promise();

  return ssmParameter.Parameter.Value;
};

module.exports = { getSSMParameter };
