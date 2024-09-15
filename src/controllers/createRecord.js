import { handleError } from "../helpers/handleError.js";
import { handleSuccess } from "../helpers/handleSuccess.js";

export const createRecord = async (req, res) => {
  try {
    const { user, data } = req.body;
    const { web5 } = req;
    const tags = {
      user,
      platform: "5ive-wallet",
    };
    const { records } = await web5.dwn.records.query({
      from: req.web5.connectedDid,
      message: {
        filter: {
          tags: tags,
        },
      },
    });

    if (records.length > 0) {
      const existingRecord = records[0];
      const { record } = await web5.dwn.records.read({
        message: {
          filter: {
            recordId: existingRecord.id,
          },
        },
      });

      await record.update({
        data: data,
      });

      await record.send(req.web5.connectedDid);
      handleSuccess("Record updated successfully", res);
    } else {
      const { record } = await web5.dwn.records.create({
        data: data,
        message: {
          dataFormat: "application/json",
          tags: tags,
        },
      });
      await record.send(req.web5.connectedDid);
      handleSuccess("Record created successfully", res);
    }
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};
