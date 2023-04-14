/*

This does not work as:
To make a secret available to an action, you must set the secret as an input or environment variable in the workflow file.


Blackbox requirements:
The json string is via 
${{ github.event.inputs.json-override }} 
Example:

{
  "ADMIN_PASSWORD": "placeholder",
  "ANOTHER_PASSWORD": "placeholder",
}

For each key-calue pair in the above json object, the value needs to be replaced by the github secret.

*/

const core = require('@actions/core');

const configureInputs = () => {
  const inputjsonString = core.getInput('jsonString');
  const inputValue = core.getInput('value');

  return {
    jsonString: inputjsonString,
    value: inputValue
  }
}
const override = async ({
  jsonString,
  value
})=> {
  var overridenJsonString = ''
  const obj = JSON.parse(jsonString)
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        obj[key] = value
        console.log(key + " -> " + obj[key]);
    }
  }
  return overridenJsonString
}


const saveToEnv = (overridenJsonString) => {
    core.exportVariable('output_secrets_override', overridenJsonString);
}

const run = async () => {
  try {
    const { jsonString, value } = configureInputs();
    const overridenJsonString = await override({jsonString, value});
    saveToEnv(overridenJsonString);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
