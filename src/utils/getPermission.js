import axios from "axios";


export const getPermission = async (issuerDid) => {
  console.log(issuerDid)
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
