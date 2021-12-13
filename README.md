# Improvements summary

## Architecture

Although it sounds overkill for a small project like this, but since the project will become larger and larger in the future it’s not a good idea to write all codes in express routers. A good software architecture in my opinion should decouple these three layers from each other: host (presentation layer), service (business logic layer) and data access layer (repositories, external apis, …). It's important that our business logic layer contains only pure functions that do not depend on any technologies or libraries so in the future if we change our tech stack it will not affect our business logic layer.

## Unique indexes

There was a problem in the code when creating a new profile. The app checks if another profile with the same email or nickname exists using a find query and then if there wasn’t any it creates a new profile. It will not work because of the asynchronous nature of node.js it’s still possible two profiles with the same email or nickname will be inserted. If two requests will be sent to api concurrently, the first request checks for existence of the same email or nickname if right after that other request runs and inserts a profile with the same email or nickname to database the request will also inserted to database and we have two document in database with same email or nickname. So I add unique indexes to both fields in that way the database checks for uniqueness when inserting new values and the above situation will never occur.

## Cursor based pagination

In production we have a huge amount of data in the database and it’s not possible to send all data to a user with one get request so I added cursor based pagination user will get limited number of data and a property “hasMore” that indicate if there are any remaining result left or not. So each time the user sends id of last document of previous result as “cursorId” filed and result length as “limit” field.

## Validation

The project didn’t check input from users and it’s not a good idea to accept every data user sends to our server so I added schema validation for user input using "yup" because it’s light weight and has good support for typescript. If a user sends invalid data to the server, the server responds with proper validation errors.

## Error handling

The project didn’t handle errors so if any error occurs it will terminate the node process. Error handling is added to the project so if an unexpected error happens, the server will log it and respond to user with proper status code.

## Mongoose

Sinse mongodb driver fully supports typescript I don’t see any benefits of using mongoose. So I removed mongoose from the project and created project entities with pure typescript.

## Tests

I added some tests to the project. Although it’s not 100% code coverage, but it tests core features of the application. Used jest and supertest to test all api functionality. Tests will be run in the process of creating docker container also.

## Docker

I created a docker file so we can containerize the app for production.
