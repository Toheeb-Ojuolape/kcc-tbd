class KccCredential {
    constructor(country, jurisdiction, credentialSchema, evidence) {
      this.data = {
        countryOfResidence: country,
        jurisdiction: jurisdiction // optional
      };
      this.credentialSchema = credentialSchema;
      this.evidence = evidence; // optional
    }
  }
  
  export default KccCredential;