import KccCredential from "../classes/kccCredential.js";
import { VerifiableCredential, Jwt } from '@web5/credentials';
import { getExpiryDate } from "../utils/getExpiryDate.js";

export const createCredentials = async (req, res) => {
  try {
    const { country, name, documents } = req.body;

    const kccCredentialInstance = new KccCredential(
      country,
      {
        country
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


    const { did: issuerBearerDid } = await req.web5.agent.identity.get({ didUri: req.web5.connectedDid })

   
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

    return res.status(200).json({ credential: credential_token });
  } catch (error) {
    return res.status(500).json({
      errors: [`An unexpected error occurred: ${error.message}`],
    });
  }
};
