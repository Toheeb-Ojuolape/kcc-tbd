import { Jwt } from "@web5/credentials";
import { generateCNonce } from "../utils/generateNonce.js";

export const createCustomerToken = async (req, res) => {
  const { grant_type, customerDid } = req.body;

  if (grant_type !== "urn:ietf:params:oauth:grant-type:pre-authorized_code") {
    return res.status(400).json({ error: "unsupported_grant_type" });
  }

  const customersDidUri = customerDid
  if (!customersDidUri) {
    return res.status(400).json({ error: "invalid_grant" });
  }

  // Check the status of the IDV

//   const idvCompleted = checkIDVStatus(customersDidUri);
//   if (!idvCompleted) {
//     return res.status(400).json({ error: "authorization_pending" });
//   }

  /********************************************
   * Create the payload for the access token
   ********************************************/
  const accessTokenPayload = {
    sub: customersDidUri, // Customer's Decentralized Identifier string
    iss: req.web5.connectedDid, // Issuer's Decentralized Identifier string
    iat: Math.floor(Date.now() / 1000), // Issued at
    exp: Math.floor(Date.now() / 1000) + 86400, // Expiration time
  };
  /********************************************
   * sign accessToken and generate a c_nonce
   ********************************************/

  const { did: issuerBearerDid } = await req.web5.agent.identity.get({ didUri: req.web5.connectedDid })
  try {
    const accessToken = await Jwt.sign({
      signerDid: issuerBearerDid,
      payload: accessTokenPayload,
    });

    const cNonce = generateCNonce();
    // accessTokenToCNonceMap.set(accessToken, cNonce);

    // preAuthCodeToDidMap.delete(code);

    res.json({
      access_token: accessToken,
      token_type: "bearer",
      expires_in: 86400, // Token expiration time
      c_nonce: cNonce,
      c_nonce_expires_in: 86400, // cNonce expiration time
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "internal_server_error", message: error.message });
  }
};
