const AWS = require("aws-sdk");

const getSSMParameter = async (aws_ssm_path) => {
  const ssmClient = new AWS.SSM({
    apiVersion: "2014-11-06",
    region: "us-west-2",
  });

  const ssmParameters = await ssmClient
    .getParameter({
      Name: aws_ssm_path,
      WithDecryption: true,
    })
    .promise();

  return ssmParameters.Parameter.Value;
};

module.exports = { getSSMParameter };
