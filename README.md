# Elysia Unkey Template
A starter template integrating Elysia with Bun runtime, Drizzle ORM for SQLite database operations, and Unkey for API authorization and rate limiting. This template provides a robust base for creating scalable and secure APIs with powerful request controls and database management.

## Getting Started
To get started with this template, clone this repository and install the dependencies. This setup uses Bun as the runtime, so be sure to have Bun installed before proceeding.
### Prerequisites
- Bun - for runtime and package management
- Unkey Account - for API authorization and rate limiting

### Installation
#### 1. Clone the repository
```bash
git clone https://github.com/vardhaman619/elysia-unkey.git
```
#### 2. Install dependencies
```bash
bun install
```
#### 3. Configure environment variables:
Copy the `.env.example` file and create a `.env` file:
```bash
cp .env.example .env
```
Ensure you fill in all the required environment variables.

#### 4. Database Setup
```bash
bun run db:generate
bun run db:seed
```

### 5. Start the server
```bash
bun run start
```

## Project Structure
```
elysia-unkey/
├── src/
│   ├── index.ts         # Main application entry
│   ├── db/
│   │   ├── index.ts    # Database client
│   │   ├── schema.ts    # Database schema with Drizzle ORM
│   │   └── seed.ts      # Script to seed initial data
│   ├── plugins/          # Application routes
│   │   └── person.ts      # Route handler for /person
│   │   └── auth.ts        # Routes handler for /auth
│   └── middlewares/     # Middlewares
├── db.sqlite            # SQLite database
├── drizzle.config.ts    # Drizzle ORM configuration
├── package.json         # Project scripts and dependencies
├── tsconfig.json        # TypeScript configuration
├── .env                 # Environment variables
└── README.md            # Project documentation
```

## Usage Instructions
### 1. Authentication
To use the API, you need to generate an API key using Unkey. Once you have the API key, you can make requests to the API using the following format:
#### Request:
`POST /signup`
- Description: Registers a new user and provides them with an API key.
#### Example Request Body:
```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```
##### Response:
```json
{
  "apiKey": "your_api_key_for_authentication",
  "message": "Signup successful"
}
```

### 2. People API
Fetch all person records in JSON format.

#### Request:
`GET /person`

To use the API, you need to generate an API key using Unkey. Once you have the API key, you can make requests to the API using the following format:
#### Request:
`GET /person/`
- Description: Returns a list of all people.
#### Request Header:
```json
{
  "headers": {
    "Authorization": "Bearer your-api-key"
  }
}
```
##### Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 30,
    ...
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "age": 25,
    ...
  },
  ...
]
```

### 3. RateLimiting
`PUT /person/:id`
Insert or update person information in the database. This route also enforces the rate limit set by Unkey, allowing up to 10 requests per user per day.
#### Request:
```json
"body": {
  "name": "John Doe",
  "email": "johndoe@example.com",
  "gender": "male",
  "age": 30,
  "phone": "1234567890",
  "address": "123 Main St."
}
```
#### Request Header:
```json
{
  "headers": {
    "Authorization": "Bearer your-api-key"
  }
}
```
##### Response:
```json
{
  "message": "Successful Added"
}
```

## Technologies
- Elysia - Lightweight and fast web framework
- Bun - High-performance runtime with built-in tools
- Drizzle ORM - TypeScript ORM for SQL databases
- Unkey - API key and rate-limiting management

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
