const actionsCore = require("@actions/core");
const dotenv = require("dotenv");
const { execSync } = require("child_process");
const { getSSMParameter } = require("./getSSMParameter");

async function run_action() {
  try {
    const ssmPath = actionsCore.getInput("ssm-path", { required: true });

    const paramValue = await getSSMParameter(ssmPath);
    const parsedValue = dotenv.parse(paramValue);
    actionsCore.debug(`ParsedValue: ${JSON.stringify(parsedValue)}`);

    for (const key in parsedValue) {
      setEnvironmentVar(key, parsedValue[key]);
    }
  } catch (e) {
    actionsCore.setFailed(e.message);
  }
}

function setEnvironmentVar(key, value) {
  const cmdString = `echo "${key}=${value}" >> $GITHUB_ENV`;
  actionsCore.debug(`Running cmd: ${cmdString}`);
  execSync(cmdString, { stdio: "inherit" });
}

run_action();
