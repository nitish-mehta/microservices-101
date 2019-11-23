# microservices-101

Starter application for microservices architecture with NodeJS (Enterprise Tech Meetup)

### Folder Structure

```
├── core_gateway                    // Gateway and Routing Middleware
├── service_channels_nodejs         // microservice written in NodeJS for slack-like channel management
├── service_tasks_golang            // microservice written in golang
└── README.md
```

### Brief Architecture

**CORE GATEWAY**
This service acts as the gateway for complete back-end for this application. All services are routed through this post authentication and necessary checks.

> NOTE: During production, this should be scaled appropriately.

- Manages User Accounts, Authentication and Basic Authorization
- Handles routing to appropriate service

**SERVICE CHANNELS (NODEJS)**
This is a sample service written in NodeJS. Further Details:

- Node JS + MongoDB + Mongoose
- Features: Allows user to maintain custom channels and add comments to each channel (similar to slack without collaboration)
- Uses the central user for application specific authorization management

**SERVICE TASKS (GOLANG)**
This is a sample service written in GoLang. Further Details:

- GoLang
- Features: Allows user to create tasks with a specified deadline and view them.
- Uses the central user for application specific authorization management
