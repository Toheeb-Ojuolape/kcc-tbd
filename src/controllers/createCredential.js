import KccCredential from "../classes/kccCredential.js";
import { VerifiableCredential } from "@web5/credentials";
import { getExpiryDate } from "../utils/getExpiryDate.js";

export const createCredentials = async (req, res) => {
  try {

    /********************************************
     * Obtain details for the Known Credential from the request and 
     * use it to instantiate a new KCC object
     ********************************************/

    const { country, name, documents } = req.body;

    const kccCredentialInstance = new KccCredential(
      country,
      {
        country,
      },
      {
        id: "https://vc.schemas.host/kcc.schema.json",
        type: "JsonSchema",
      },
      [
        {
          kind: "document_verification",
          checks: documents,
        },
        {
          kind: "biometric",
          checks: name,
        },
      ]
    );

    // obtain the IssuerDid of the DWN to be used to sign the Known Customer Credential
    const { did: issuerBearerDid } = await req.web5.agent.identity.get({
      didUri: req.web5.connectedDid,
    });


    // use the KCCInstance to generate a Verifiable Credential 
    const known_customer_credential = await VerifiableCredential.create({
      issuer: req.web5.connectedDid,
      subject: req.token.payload.sub,
      expirationDate: getExpiryDate(),
      data: {
        countryOfResidence: kccCredentialInstance.data.countryOfResidence,
        jurisdiction: kccCredentialInstance.data.jurisdiction,
      },
      credentialSchema: kccCredentialInstance.credentialSchema,
      evidence: kccCredentialInstance.evidence,
    });

    const credential_token = await known_customer_credential.sign({
      did: issuerBearerDid,
    });


    // return the generated and signed Known Customer Credential
    return res.status(200).json({ credential: credential_token });
  } catch (error) {
    return res.status(500).json({
      errors: [`An unexpected error occurred: ${error.message}`],
    });
  }
};
