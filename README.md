### KCC Hackathon

#### Overview 🌳
This project is a simple implementation of a Decentralized Web Node (DWN) that enables secure storage, management, and transmission of verifiable credentials and decentralized identifiers (DiD). A DWN acts as a personal data storage hub in decentralized identity ecosystems, allowing users to control and share their data with trusted parties without relying on centralized intermediaries.

In this implementation, the DWN facilitates:

- **Secure Data Storage:** Individuals can store their verifiable credentials and other personal data in a decentralized manner, maintaining full ownership and control over how and when this data is accessed or shared.
- **Interoperability:** The node supports interactions between different decentralized identity systems, allowing verifiable credentials issued by one organization to be recognized and -trusted by others.
- **Privacy-Preserving Sharing:** Users can selectively disclose specific information from their verifiable credentials, sharing only what is necessary for a given transaction or interaction, enhancing privacy and minimizing data exposure.
- **Tamper-Proof Verification:** The DWN ensures that all interactions and credentials are cryptographically signed and verifiable, preventing unauthorized changes or fraud.


### Endpoints ⚙️

- [x] /token (POST REQUEST): This takes in the customerDid of the user and the grant_type to return a JWT accessToken for signing transactions and an expiryTime.
      
- [x] /credentials (POST REQUEST): This takes in details like the country, name and documents of the user and requires Authorization by the token generated in the first step to create a KCC credential in the form of a JWT token

- [x] /store-vc (POST REQUEST): This takes in the KCC generated in the previous step and saves it to the DWN associated with the customerDID. It returns a status description and the recordID



### Documentation 📃
Here is the link to documentation: https://documenter.getpostman.com/view/25719172/2sAY4rEk58
