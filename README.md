# EventVerse API

EventVerse API is a Node.js/Express RESTful API designed to manage events, venues, tickets, and user reviews with MongoDB as the database, fully documented with Swagger UI and secured using Auth0 OAuth authentication.

## 🚀 Live Demo & API Documentation

- **Render Live API Docs:** [https://eventverse.onrender.com/api-docs](https://eventverse.onrender.com/api-docs) _(Replace with your Render URL)_

---

## 🔐 Auth0 Credentials for Testing

To test protected routes (POST, PUT, DELETE operations) via Swagger UI or directly, you can use the test user account:

- **Email:** `susana@eventverse.com`
- **Password:** `123456`

---

## 🛠️ Features & Architecture

- **MVC Pattern:** Modular structure separating routes, controllers, and database handlers.
- **Data Validation:** Strict input validation using `express-validator` returning HTTP 400 Bad Request on invalid payloads.
- **Error Handling:** Global try/catch wrappers and error-handling middleware.
- **OAuth Authentication:** Integration with Auth0 (`express-openid-connect`). Unprotected GET routes remain publicly accessible; POST, PUT, and DELETE routes require an active session.
- **Interactive Swagger UI Bar:** Dynamic header bar displaying login status (`Logged in as: ...` or `Not logged in`) with quick Login/Logout action buttons.
- **Unit Testing:** Automated unit tests using Jest and Supertest.

---

## ⚙️ Environment Variables (.env)

Create a `.env` file in the root directory with the following variables:

```env
PORT=8080
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/eventverse
SECRET=a_long_random_string_with_at_least_32_characters
BASE_URL=http://localhost:8080
CLIENT_ID=your_auth0_client_id
ISSUER_BASE_URL=[https://your-domain.us.auth0.com](https://your-domain.us.auth0.com)
```
