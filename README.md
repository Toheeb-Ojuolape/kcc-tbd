# Known Customer Credential (KCC) Issuance Service
![Sequence diagram (1)](https://github.com/user-attachments/assets/eeade685-2fd3-4a5f-b831-896a25c077d8)


## Overview 🌳
This project is a simple implementation of a Decentralized Web Node (DWN) that enables secure storage, management, and transmission of verifiable credentials and decentralized identifiers (DiD). The DWN acts as a personal data storage hub in decentralized identity ecosystems, allowing users to control and share their data with trusted parties without relying on centralized intermediaries. **The project uses the DIF community DWN instance hosted by Google Cloud.**

In this implementation, the DWN facilitates:

- **Secure Data Storage:** Individuals can store their verifiable credentials and other personal data in a decentralized manner, maintaining full ownership and control over how and when this data is accessed or shared.
- **Interoperability:** The node supports interactions between different decentralized identity systems, allowing verifiable credentials issued by one organization to be recognized and -trusted by others.
- **Privacy-Preserving Sharing:** Users can selectively disclose specific information from their verifiable credentials, sharing only what is necessary for a given transaction or interaction, enhancing privacy and minimizing data exposure.
- **Tamper-Proof Verification:** The DWN ensures that all interactions and credentials are cryptographically signed and verifiable, preventing unauthorized changes or fraud.


## Real-World Use cases / Feasibility
The API simply takes in a customer's Did and uses it to generate an access token. Once the token is generated, it can then be used to sign operations such as creating a Known Customer Credential (KCC) for a user and storing the KCC in the user's DWN. 

The code that converts the customer's DID to an access token serves as a way to mirror how real-life applications could use the same approach to build a middleware layer using customerDid to authenticate users within their application. 

The approach of converting a customer's DID to an access token is grounded in established decentralized identity protocols and is aligned with modern developments in identity management. The Decentralized Identifier (DID) standard from W3C provides a globally unique identifier that does not rely on centralized authorities, which makes it highly secure and resistant to fraud.

**Decentralization:** Traditional authentication methods rely on centralized identity providers (such as OAuth or social logins), which can introduce single points of failure. DIDs operate in a decentralized manner, using blockchain or similar technologies, making them ideal for distributed applications.

**Privacy and Security:** By using DIDs to authenticate users, personal information need not be shared unnecessarily. Access tokens derived from DIDs can offer time-limited or task-specific access, reducing the risk of identity theft and unauthorized access.

**Scalability:** The approach of generating access tokens from DIDs is scalable across multiple applications and services. Middleware systems can easily integrate DID-based authentication to manage user permissions, token expiration, and data flow in a decentralized network.

**Standards Support:** The growing support for standards like Verifiable Credentials (VCs) and Decentralized Web Nodes (DWNs) ensures that DID-based authentication has a solid infrastructure for adoption across various platforms.

## API Endpoints ⚙️

### 1. Generate Access Token
- **URL:**  `/token`
- [x] /token (POST REQUEST): This takes in the customerDid of the user and the grant_type to return a JWT accessToken for signing transactions and an expiryTime.
      
- [x] /credentials (POST REQUEST): This takes in details like the country, name and documents of the user and requires Authorization by the token generated in the first step to create a KCC credential in the form of a JWT token

- [x] /store-vc (POST REQUEST): This takes in the KCC generated in the previous step and saves it to the DWN associated with the customerDID. It returns a status description and the recordID



## Documentation 📃
Here is the link to documentation: https://documenter.getpostman.com/view/25719172/2sAY4rEk58


## Video Demo 📹
Watch a demo of how it works here: https://www.youtube.com/watch?v=CL95YdvO-Fg

## Deployment 🌨️
The project is deployed for public use using Google's Firebase Cloud Functions. You can test in real-time here: https://api-xtygkd52ya-uc.a.run.app
