import { handleError } from "../helpers/handleError.js";
import { handleSuccess } from "../helpers/handleSuccess.js";

export const queryRecord = async (req, res) => {
  try {
    const { user } = req.query;
    const { records } = await req.web5.dwn.records.query({
      from: req.web5.connectedDid,
      message: {
        filter: {
          tags: {
            user: user,
          },
        },
      },
    });
    const recordTextArray = await Promise.all(
      records.map(async (record) => {
        const text = await record.data.text();
        return JSON.parse(text);
      })
    );

    const formattedData = recordTextArray.flat();
    handleSuccess(formattedData, res);
  } catch (error) {
    handleError(error, res);
  }
};
