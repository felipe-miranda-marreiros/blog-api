# blog-api

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

- Error Handling:
Managing exceptions and failures in a consistent way.

- Validation:
Checking data integrity or constraints in multiple places.

- Monitoring & Telemetry:
Collecting performance and health data across the application.

- Security (e.g., input sanitization, encryption):
Applied throughout the codebase.

### Know Issues

#1 DDD:
- I'm not using the Rich Domain (Value Objects, Entities, AggregateRoots, Domain Events, Domain Services) on this project. Insted I decided to use Anemic Domain with emphasis on invariants only. I don't have much time to elaborate this kind of features in TypeScript. However, you can see the same project but in Java (Spring Boot) here (soon).
