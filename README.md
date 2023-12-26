# Firestore Admin GUI

<img width="374" alt="Screenshot 2023-12-26 at 8 32 42 PM" src="https://github.com/ranjan-malav/firestore-admin-gui/assets/19403844/09469ea1-1d10-46d8-8dbb-bd187fd8c432">

## Overview

This repository contains an application that provides a GUI for interacting with [Firestore](https://firebase.google.com/docs/firestore).
This is a combination of React and Express apps, that runs simultaneously on your local machine.

## Motivation

The Firebase Admin Console has a few issues that this app attempts to address.
- It doesn't provide a way to copy the data of any document in JSON format
- If you open any collections, it increases the read count of all the documents that are visible on the screen, even though you won't open any of them
- Querying any document also increases the read count for all the results visible on the screen
- It allows updating a single value at a time, so updating is also difficult

** Read count may not be a concern for big companies but it's worth reducing for individual developers.

## Getting Started

### Prerequisites

- Node v18.0.0
- Firebase account and project set up on Google Cloud.
- Firestore enabled for the project

### Project Setup

- **Step 1**: Download a service account key from Firebase `Project Settings` -> `Service Accounts`
- **Step 2**: Put this json key in the root project folder with the file name `service-account-key.json`, this file is ignored by git
- **Step 3**: Replace `databaseURL` in `express.js` file. `databaseURL` can be found `Project Settings` -> `Service Accounts`
- **Step 4**: Define your document schema in `schema.js`. `collections` array will be used to populate the tabs on UI. (See sample schema for reference)

### How To Use
- run `npm start`, it'll start the express server on port:3000 and react app on port:3001
- Enter a document ID for the collections that are in the root level of Firestore database.
- For nested collections, you can define `custom` for your path in `collections` and put the full path of the document, for example, `users/:docId1/roles/:docId2`

### Future Plans
- Allow update operations
- Allow queries

##  Contributing
Contributions are welcome! Please follow the guidelines in CONTRIBUTING.md before submitting a pull request.

## Issues
If you encounter any issues or have suggestions, please create an issue.

## License
This project is licensed under the MIT License.
