/*

This does not work as:
To make a secret available to an action, you must set the secret as an input or environment variable in the workflow file.


Blackbox requirements:
The json string is via 
${{ github.event.inputs.json-override }} 
Example:

{
  "PINGACCESS_RS_CLIENT_SECRET": "PINGACCESS_RS_CLIENT_SECRET",
  "Aux_LDAP_UserDNPassword": "AUX_LDAP_USERDNPASSWORD",
  "PCV_Hicksons_PASSWORD": "PCV_Hicksons_PASSWORD",
  "PCV_CGW_PASSWORD": "PCV_CGW_PASSWORD",
  "PCV_MERITON_PASSWORD": "PCV_MERITON_PASSWORD",
  "PCV_STOCKLAND_PASSWORD": "PCV_STOCKLAND_PASSWORD",
  "PCV_Maddocks_PASSWORD": "PCV_MADDOCKS_PASSWORD",
  "PCV_Lightspeed_PASSWORD": "PCV_LIGHTSPEED_PASSWORD",
  "PCV_Nab_PASSWORD": "PCV_NAB_PASSWORD",
  "ROPC_CLIENT_SECRET": "OTP_SECRET",
  "ROPC_PASSWORD": "OTP_PASSWORD",
  "SES_PASSWORD": "SES_PASSWORD",
  "SPAdapter_Password": "SPADAPTER_PASSWORD"
}

For each key-calue pair in the above json object, the value needs to be replaced by the github secret, referenced by the name as the value:

{
  "PINGACCESS_RS_CLIENT_SECRET": ${{ secrets["PINGACCESS_RS_CLIENT_SECRET" }},
  ...
}

*/

const core = require('@actions/core');

const configureInputs = () => {
  const inputjsonString = core.getInput('jsonString');

  return {
    jsonString: inputjsonString,
  }
}
const override = async ({
  jsonString
})=> {
  var overridenJsonString = ''
  const obj = JSON.parse(jsonString)
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
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
    const { jsonString } = configureInputs();
    const overridenJsonString = await override({jsonString});
    saveToEnv(overridenJsonString);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
