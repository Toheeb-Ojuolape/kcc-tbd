### KCC Hackathon

#### Overview 🌳
This project is a simple implementation of a Decentralized Web Node (DWN) that 


### Endpoints ⚙️

- [x] /token (POST REQUEST): This takes in the customerDid of the user and the grant_type to return a JWT accessToken for signing transactions and an expiryTime.
      
- [x] /credentials (POST REQUEST): This takes in details like the country, name and documents of the user and requires Authorization by the token generated in the first step to create a KCC credential in the form of a JWT token

- [x] /store-vc (POST REQUEST): This takes in the KCC generated in the previous step and saves it to the DWN associated with the customerDID. It returns a status description and the recordID



### Documentation 📃
Here is the link to documentation: https://documenter.getpostman.com/view/25719172/2sAY4rEk58
