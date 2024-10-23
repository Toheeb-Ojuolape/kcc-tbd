import axios from "axios";


export const getPermission = async (issuerDid) => {
    /********************************************
   * Obtain permission as a Credential issuer to be able to issue KCC on behalf of user
   ********************************************/

  try {
    const response = await axios({
      method: "GET",
      url: `https://vc-to-dwn.tbddev.org/authorize?issuerDid=${issuerDid}`,
    });
    return response 
  } catch (error) {
    throw error
  }
};
