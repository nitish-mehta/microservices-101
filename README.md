# microservices-101

Starter application for microservices architecture with NodeJS (Conducted as part of [Enterprise Tech Meetup](https://www.meetup.com/Delhi-StartUp-Events/events/266257935/))

## Folder Structure

```
├── core_gateway                    // Gateway and Routing Middleware
├── service_channels_nodejs         // microservice written in NodeJS for slack-like channel management
├── service_tasks_golang            // microservice written in golang
└── README.md
```

## Pre-requisites & Installations Required

* NPM & NodeJS - [Download](https://nodejs.org/en/download/)
* Postgres - [Download](https://www.postgresql.org/download/)
* MongoDB - [Download](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/)
* Go - [Download](https://golang.org/dl/)
* Postman - [Download](https://www.getpostman.com/downloads/)

*Postman Link for related APIs - [Link](https://www.getpostman.com/collections/3d7183819c7b9bae2280)*

## Brief Architecture

![image](https://raw.githubusercontent.com/nitish-mehta/microservices-101/master/assets/basic-design.JPG)

**CORE GATEWAY**
This service acts as the gateway for complete back-end for this application. All services are routed through this post authentication and necessary checks.

> NOTE: During production, this should be scaled appropriately.

- Manages User Accounts, Authentication and Basic Authorization
- Handles routing to appropriate service


**SERVICE 1: CHANNELS (NODEJS)**
This is a sample service written in NodeJS. Further Details:

- Node JS + MongoDB + Mongoose
- Features: Allows user to maintain custom channels and add comments to each channel (similar to slack without collaboration)
- Uses the central user for application specific authorization management


**SERVICE 2:  TASKS (GOLANG)**
This is a sample service written in GoLang. Further Details:

- GoLang
- Features: Allows user to create tasks with a specified deadline and view them.
- Uses the central user for application specific authorization management


## Contributions


- Nitish Mehta ( [LinkedIn](https://www.linkedin.com/in/nitishmehta08) )


**Powered By**

![image](https://raw.githubusercontent.com/nitish-mehta/microservices-101/master/assets/integrtr_logo.png)
