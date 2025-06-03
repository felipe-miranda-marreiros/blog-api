# blog-api - In Progress

# Summary

- [blog-api - In Progress](#blog-api---in-progress)
- [Summary](#summary)
  - [About](#about)
  - [Requirements](#requirements)
  - [Setup](#setup)
    - [Applications Running](#applications-running)
  - [Architecture](#architecture)
    - [Clean Architecture and Layered Architecture](#clean-architecture-and-layered-architecture)
    - [Design Principles](#design-principles)
    - [Design Patterns](#design-patterns)
  - [Domain-Driven Design](#domain-driven-design)
    - [Invariants](#invariants)
    - [Users Example](#users-example)
      - [An Invariant Example](#an-invariant-example)
  - [Documentation](#documentation)
    - [ArticleApiSpec Example](#articleapispec-example)
  - [Cross-Cutting Concerns](#cross-cutting-concerns)
    - [Overview](#overview)
      - [Logging:](#logging)
      - [Authentication \& Authorization:](#authentication--authorization)
      - [Error Handling](#error-handling)
      - [Validation](#validation)
  - [Known Issues](#known-issues)
    - [1 - DDD:](#1---ddd)
    - [2 - Authentication and Authorization:](#2---authentication-and-authorization)
    - [3 - Cohesion and Layered Architecture](#3---cohesion-and-layered-architecture)
    - [4 - Dependency Injection and Dependency Injection Container](#4---dependency-injection-and-dependency-injection-container)

## About

This project uses Node.Js LTS (v22.15.0) and Express (v5) along side TypeScript (v5).

## Requirements

These are the requirements to run this project:

| Tool      | Version           |
| --------- | ----------------- |
| `Node.Js` | v22.15.0 or newer |
| `Docker`  | latest            |

## Setup

Follow the below commands to setup Docker.

```sh
make docker-install
```

### Applications Running

| Application     | URL                                                       |
| --------------- | --------------------------------------------------------- |
| `App - Node.Js` | [http://localhost:3000/](http://localhost:3000/)          |
| `pgAdmin 4`     | [http://localhost:5050/](http://localhost:5050/)          |
| `PostgreSQL`    | [http://localhost:5432/](http://localhost:5432/)          |
| `Swagger Docs`  | [http://localhost:3000/docs/](http://localhost:3000/docs) |

## Architecture

- Clean Architecture
- DDD
- TDD
- UseCases

### Clean Architecture and Layered Architecture

I'm using Clean Architecture and Layered Architecture following this approch:

![Screenshot 2025-05-20 at 14 44 36](https://github.com/user-attachments/assets/d5f4d1a1-50c3-4cda-901e-373095043dcd)

In other words:

- `Application`: It's responsible for creating application level contracts. Suppose we need to access the logged in user, we can create an abstration `UserContext` and retrive the information from Express. It's also called the orchestration layer between `Domain` and `Infrastrcuture`.
- `Presentation`: Responsible for comunication between User and Business Logic (UseCases). Does not know about Infrastructure details.
- `Domain`: Models that represent real Business Logic.
- `Infrastructure`: Implementations following `Application` contracts.

![Screenshot 2025-05-20 at 14 46 23](https://github.com/user-attachments/assets/9debe559-6a04-49b4-9187-8b1d1118a711)

### Design Principles

- SOLID.
- Separation of Concerns (SOC).
- Don't Repeat Yourself (DRY).
- You Aren't Gonna Need It (YAGNI).
- Keep It Simple, Silly (KISS).
- Composition Over Inheritance.

### Design Patterns

- Factory
- Adapter
- Decorator
- Dependency Injection
- Builder
- Singleton
- SOLID

## Domain-Driven Design

A software development approach that emphasizes understanding and modeling the business domain to create software that closely aligns with real-world business needs.

### Invariants

An invariant is a condition that must never be violated, no matter what actions or operations are performed in the system.

### Users Example

User is a person who will interact with Posts, Followers and Comments.

#### An Invariant Example

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

## Documentation

Following OpenAPI 3.0.3 with `tspec` to auto-generate documentation based on Domain models.

Here's an example:

### ArticleApiSpec Example

```ts
// src/Main/Docs/ArticleApiSpec.ts
import {
  CreateArticleParams,
  CreateArticleResponse
} from '@/Domain/Articles/UseCases/CreateArticle'
import {
  UpdateArticleParams,
  UpdateArticleResponse
} from '@/Domain/Articles/UseCases/UpdateArticle'
import { Tspec } from 'tspec'

export type ArticleApiSpec = Tspec.DefineApiSpec<{
  basePath: '/api/articles'
  tags: ['Articles']
  paths: {
    '/': {
      post: {
        summary: 'Create a new article'
        body: CreateArticleParams
        responses: { 201: CreateArticleResponse }
      }
    }
    '/{id}': {
      put: {
        summary: 'Update an existing article'
        path: { id: number }
        body: Omit<UpdateArticleParams, 'id'>
        responses: { 200: UpdateArticleResponse }
      }
    }
  }
}>
```

## Cross-Cutting Concerns

Cross-cutting concerns are aspects of a software system that affect multiple parts of the application and are not specific to any one feature or business logic, but are still essential to the overall system behavior.

### Overview

#### Logging:

This project uses [`Pino`](https://www.npmjs.com/package/pino) for logging.

This means we have a `Structured Logging`. Structured logging involves capturing log messages in a standardized format, using a predefined schema or format such as JSON or XML.

```ts
export class CreateArticleUseCase implements CreateArticle {
  constructor(
    private readonly userContext: UserContext,
    private readonly articleRepository: ArticleRepository
  ) {}

  async createArticle(
    params: CreateArticleParams
  ): Promise<CreateArticleResponse> {
    const user = this.userContext.getLoggedInUser()
    logger.info(`User (${user.id}) started creating an Article`)

    logger.info(`Trying to save article`, params)
    const article = await this.articleRepository.createArticle({
      body: params.body,
      status: 'ACTIVE',
      title: params.title,
      user_id: user.id
    })

    logger.info('Article was created successfully', article)
    return article
  }
}
```

This example will output in a json format:

```json
{
  "timestamp": "2023-06-22 12:34:56",
  "level": "INFO",
  "message": "User logged in",
  "user_id": "steve_rogers",
  "source": "login-service"
}
```

#### Authentication & Authorization:

Verifying user identity and access control in many parts of the system.

- Authentication Method: Email and password. Password compare.

This method requires the password to be hashed first before creating a user:

![Screenshot 2025-05-26 at 17 37 36](https://github.com/user-attachments/assets/6cc32c45-1b93-4f7d-9d7b-57f2654283d1)

- Authorization Method: JWT (`jsonwebtoken`) with `Cookie based` transport via HTTPS only.

- Caching: TODO

#### Error Handling

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

#### Validation

Checking data integrity or constraints in multiple places. I decided to use Zod. We can use ZodInfer and ZodOutput interfaces to directly transform the input to domain model.

## Known Issues

#### 1 - DDD:

- This project violates the Rich Domain approach (Value Objects, Entities, AggregateRoots, Domain Events, Domain Services). Insted I decided to use Anemic Domain with emphasis on invariants only. I don't have much time to elaborate this kind of features in TypeScript.

#### 2 - Authentication and Authorization:

- This project violates the generic subdomain approach. A generic subdomain is an area of the business that is important for operations but doesn't provide a competitive advantage. We shouldn't build authentication or authorization, but instead "buy, don't build". Alternatives like Keycloak and OAuth2 are battle tested and secure.

#### 3 - Cohesion and Layered Architecture

- Layered Architecture can be welcome on medium-size projects. This means that the level of cohesion can decreased when adding more Use Cases, making it hard for developers read, find modules and business rules. Vertical Slice Architecture or Feature-Based approaches can be a better alternative for refactoring later on.

#### 4 - Dependency Injection and Dependency Injection Container

- Alternatives like NestJs can be better option instead of manually injecting dependencies hierarchically. This project does not use any DI Containers.
