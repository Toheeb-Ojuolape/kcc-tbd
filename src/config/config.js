export const web5CommunityConfig = {
  didCreateOptions: {
    dwnEndpoints: ["https://dwn.gcda.xyz"], // User provides google's community DWN instance
  },
  registration: {
    onFailure(error) {
      console.log("Registration failed", error);
      // Registration failed, display an error message to the user, and pass in the registration object again to retry next time the user connects.
    },
    onSuccess() {
      console.log("Registration succeeded");
    },
  },
};

export const web5DefaultConfig = {};

export const protocolDefinition = {
  protocol: "https://vc-to-dwn.tbddev.org/vc-protocol",
  published: true,
  types: {
    credential: {
      schema: "https://vc-to-dwn.tbddev.org/vc-protocol/schema/credential",
      dataFormats: ["application/vc+jwt"],
    },
    issuer: {
      schema: "https://vc-to-dwn.tbddev.org/vc-protocol/schema/issuer",
      dataFormats: ["text/plain"],
    },
    judge: {
      schema: "https://vc-to-dwn.tbddev.org/vc-protocol/schema/judge",
      dataFormats: ["text/plain"],
    },
  },
  structure: {
    issuer: {
      $role: true,
    },
    judge: {
      $role: true,
    },
    credential: {
      $actions: [
        {
          role: "issuer",
          can: ["create"],
        },
        {
          role: "judge",
          can: ["query", "read"],
        },
      ],
    },
  },
};
