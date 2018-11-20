# Prello :clipboard:
[![Build Status](https://travis-ci.org/kevinhassan/prello.svg?branch=develop)](https://travis-ci.org/kevinhassan/prello)
<div>
  <a href="https://prello22app.igpolytech.fr">
<img src="https://raw.githubusercontent.com/kevinhassan/prello/develop/client/src/assets/logo_prello.png" style="margin:auto"/>
  </a>
</div>

**Online App website: https://prello22app.igpolytech.fr**

**Online API website: https://prello22api.igpolytech.fr**

Project managing tool using MERN stack (Mongo - Express - React - NodeJS). Application developed during our 5th year of CS & Management formation at Polytech Montpellier.

## Getting Started

### Requirements

- A [MongoDB](https://www.mongodb.com/fr)
- [npm](https://www.npmjs.com/) for package dependencies management

### Launch :rocket:

- Dependancies installation: `npm install` in both /client and /server folders.
- Set your environment variables accordingly to the *.env.example* & *.model.env* files.
- In localhost, you can use `npm start` for the client and `npm run watch` for the server.

### Deployment 
The client and server contain a Dockerfile. These Dockerfile are used by the **/scripts/deploy.sh** script to deploy the application to Dokku or Herokku for example. To use it, when you are at the root of the repository: 

`cd ./scripts`

`sh ./deploy.sh`

### Tests

You can run the tests in /client and /server folder by using the following command: 

`npm test`

## Authors

* **Hugo FAZIO** - [HugoMeatBoy](https://github.com/HugoMeatBoy)
* **Kévin HASSAN** - [kevinhassan](https://github.com/kevinhassan)
* **Cyprien LEGRAND** - [Cyp-Leg](https://github.com/Cyp-Leg)
* **HClément LOUBIERE** - [cle-loubiere](https://github.com/cle-loubiere)
* **Clément ROIG** - [Clm-Roig](https://github.com/Clm-Roig)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
