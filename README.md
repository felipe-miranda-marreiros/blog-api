# blog-api - In Progress

## Stack

This project uses Node.Js LTS (v22.15.0) and Express (v5) along side TypeScript (v5).

## Architecture

- Clean Architecture
- DDD
- TDD
- UseCases

## Clean Architecture and Layered Architecture

I'm using Clean Architecture and Layered Architecture following this approch:

- Domain
- Application
- Infrastructure
- Presentation
- Main

## Design Principles

- SOLID.
- Separation of Concerns (SOC).
- Don't Repeat Yourself (DRY).
- You Aren't Gonna Need It (YAGNI).
- Keep It Simple, Silly (KISS).
- Composition Over Inheritance.

## Design Pattenrs

- Factory
- Adapter
- Decorator
- Dependency Injection
- Builder
- Singleton

- SOLID

## Invariants

An invariant is a condition that must never be violated, no matter what actions or operations are performed in the system.

### Users

User is a person who will interact with Posts, Followers and Comments.

#### - Invariants

With User:
- A User can not create an account if email or username is already in use.
- A User can not create an accout if password or email is invalid.
- A User can only have one account.

With Post:
- A User can create a Post.
- A User can edit a Post.
- A User can delete a Post.
- A User can archive a Post.
- A User can not edit, delete or archive from another User.
- A User can have many Posts.

With Followers:
- A User can follow another User.
- A User can not follow another User if it is already following.
- A User can unfollow another User.
- A User can have many Followers.
- Users can view earch others followers.

With Comments:
- A User can comment another User's Post.
- A User can not edit another User's Comment.
- A User can not delete another User's Comment.

## Cross-Cutting Concerns

Cross-cutting concerns are aspects of a software system that affect multiple parts of the application and are not specific to any one feature or business logic, but are still essential to the overall system behavior.

### Overview

- Logging:
Capturing application behavior, errors, or metrics across all modules.

- Authentication & Authorization:
Verifying user identity and access control in many parts of the system.

- Caching:
Storing frequently accessed data, used across different services or components.

#### **Error Handling:**
We need to pay attention to two things:

1. Error Handling refers to how Express catches and processes errors that occur both synchronously and asynchronously. Express comes with a default error handler so you don’t need to write your own to get started.

2. Starting with Express 5, route handlers and middleware that return a Promise will call next(value) automatically when they reject or throw an error. For example:

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

This project uses an abstract class that extends the Error class from JavaScript.

Here's an example:

```ts
export abstract class CustomError extends Error {
  abstract statusCode: number

  constructor(message: string) {
    super(message)
  }

  abstract serializeErrors(): ResponseError[]
}
```

This way we can create NotFoundError class:

```ts
export class NotFoundError extends CustomError {
  statusCode = 404

  constructor(message: string) {
    super(message)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
```

The actual use:

```ts
export const getTicketByIdUseCase: GetTicketById = async (params) => {
  const ticket = await getTicketByIdRepository(params.id)
  if (!ticket) {
    throw new NotFoundError(`Ticket with id: ${params.id} not found`)
  }
  return ticket
}
```

#### **Validation:**
Checking data integrity or constraints in multiple places. I decided to use Zod. We can use ZodInfer and ZodOutput interfaces to directly transform the input to domain model.

- Monitoring & Telemetry: //TODO

- Security (e.g., input sanitization, encryption): //TODO

### Known Issues

#1 DDD:
- This project violates the Rich Domain approach (Value Objects, Entities, AggregateRoots, Domain Events, Domain Services). Insted I decided to use Anemic Domain with emphasis on invariants only. I don't have much time to elaborate this kind of features in TypeScript. However, you can see the same project but in Java (Spring Boot) here (soon).

#2 Authentication and Authorization:
- This project violates the generic subdomain approach. A generic subdomain is an area of the business that is important for operations but doesn't provide a competitive advantage. We shouldn't build authentication or authorization, but instead "buy, don't build". Alternatives like Keycloak and OAuth2 are battle tested and secure.

#3 Cohesion and Layered Architecture
- Layered Architecture can be welcome on medium-size projects. This means that the level of cohesion can decreased when adding more UseCases, making it hard for developers read, find modules and business rules. Vertical Slice Architecture or Feature-Based approaches can be a better alternative for refactoring later on.
