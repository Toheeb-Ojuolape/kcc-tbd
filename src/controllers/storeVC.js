import { handleError } from "../helpers/handleError.js";
import { getPermission } from "../utils/getPermission.js";
import { protocolDefinition } from "../config/config.js";

export const storeVC = async (req, res) => {
  try {
    const { credential } = req.body;
    const customerDid = req.token.payload.sub; //obtain Alice's DID from the Authorization token being passed
    const response = await getPermission(req.web5.connectedDid); //get permission to send details
    if (response.data.status.code === 200) {
      const { protocol } = await req.web5.dwn.protocols.configure({
        message: {
          definition: protocolDefinition,
        },
      });

      //immediately send protocol to user's remote DWNs
      console.log(req.web5.connectedDid);
      const { status: sendStatus } = await protocol.send(req.web5.connectedDid);

      console.log(sendStatus);


      const { record } = await req.web5.dwn.records.create({
        data: credential,
        store: false,
        message: {
            dataFormat: 'application/vc+jwt',
            protocol: protocolDefinition.protocol,
            protocolPath: 'credential',
            protocolRole: 'issuer',
            schema: protocolDefinition.types.credential.schema,
            recipient: customerDid,
        },
      });

      console.log("customerDid", customerDid);
      const { status } = await record.send(customerDid);
      res.status(status.code).json({ message: status.detail });
    }
  } catch (error) {
    handleError(error, res);
  }
};
