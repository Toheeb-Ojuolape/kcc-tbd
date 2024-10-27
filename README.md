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
- **Method:** `POST`
- **Description:** This takes in the customerDid of the user and the grant_type to return a JWT accessToken for signing transactions and an expiryTime.
  
- **Sample Request:**
  ``` {
    "customerDid":"did:dht:rr1w5z9hdjtt76e6zmqmyyxc5cfnwjype6prz45m6z1qsbm8yjao" // Alice's DID
  } ```
  
- **Sample Response:**
  ```
  {
  "access_token": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6b2Uxc3Njc3hmNTRhYnJnOWJ5bjZkcXd1anM2Z3RmbXNuOGI2cG5oNGZ4MzMxZzg0N2pieSMwIn0.eyJzdWIiOiJkaWQ6ZGh0OnJyMXc1ejloZGp0dDc2ZTZ6bXFteXl4YzVjZm53anlwZTZwcno0NW02ejFxc2JtOHlqYW8iLCJpc3MiOiJkaWQ6ZGh0Om9lMXNzY3N4ZjU0YWJyZzlieW42ZHF3dWpzNmd0Zm1zbjhiNnBuaDRmeDMzMWc4NDdqYnkiLCJpYXQiOjE3Mjk2OTQyMzYsImV4cCI6MTcyOTc4MDYzNn0.ikfiI2c-sG0E6zFBG4IJioNtEvR-nVS2loH2W6Tb9eaOlif5F8TxbR0_gXsK2P-9paKDo01-tIuNXk8RWxIfCw",
  "token_type": "bearer",
  "expires_in": 86400,
  "c_nonce": {
    "0": 57,
    "1": 94,
    "2": 35,
    "3": 186,
    "4": 181,
    "5": 136,
    "6": 42,
    "7": 184,
    "8": 250,
    "9": 202,
    "10": 131,
    "11": 233,
    "12": 140,
    "13": 190,
    "14": 66,
    "15": 98,
    "16": 146,
    "17": 137,
    "18": 103,
    "19": 248,
    "20": 32,
    "21": 148,
    "22": 206,
    "23": 4
  },
  "c_nonce_expires_in": 86400
}
  ```
- [x] /token (POST REQUEST): This takes in the customerDid of the user and the grant_type to return a JWT accessToken for signing transactions and an expiryTime.
      
- [x] /credentials (POST REQUEST): This takes in details like the country, name and documents of the user and requires Authorization by the token generated in the first step to create a KCC credential in the form of a JWT token

- [x] /store-vc (POST REQUEST): This takes in the KCC generated in the previous step and saves it to the DWN associated with the customerDID. It returns a status description and the recordID



## Documentation 📃
Here is the link to documentation: https://documenter.getpostman.com/view/25719172/2sAY4rEk58


## Video Demo 📹
Watch a demo of how it works here: https://www.youtube.com/watch?v=CL95YdvO-Fg

## Deployment 🌨️
The project is deployed for public use using Google's Firebase Cloud Functions. You can test in real-time here: https://api-xtygkd52ya-uc.a.run.app
