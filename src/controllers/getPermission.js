import axios from "axios";
import { handleError } from "../helpers/handleError.js";
import { handleSuccess } from "../helpers/handleSuccess.js";

export const getPermission = async (req, res) => {
  try {
    const response = await axios({
      url: `https://vc-to-dwn.tbddev.org/authorize?issuerDid=${req.token.payload.sub}`,
    });

    console.log(response);
    handleSuccess(response.data, res);
    return response;
  } catch (error) {
    handleError(error, res);
  }
};
