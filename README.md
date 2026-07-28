# EventVerse API 🎟️✨

**EventVerse API** is a RESTful backend web service designed for managing live events, venues, ticket sales, and attendee reviews. Built with Node.js, Express, MongoDB Atlas, and Auth0 for CSE341 (Web Services).

---

## 🌐 Live Deployment & API Documentation

- **Live Application:** Pending
- **Swagger Documentation:** Pending

---

## 🚀 Features

- **Complete CRUD Operations:** Full `GET`, `POST`, `PUT`, and `DELETE` support across 4 database collections.
- **Authentication:** Secured endpoints using Auth0 / OpenID Connect (`express-openid-connect`).
- **Data Validation:** Strict payload validation on `POST` and `PUT` routes using `express-validator`.
- **Error Handling:** Centralized exception middleware returning standardized HTTP status codes (400, 401, 404, 500).
- **Interactive Docs:** Auto-generated Swagger UI served at `/api-docs`.

---

## 🗄️ Database Collections Structure

The database (`eventverse_db`) contains four collections:

1. **`events`** _(Primary — 8 Fields)_: `title`, `description`, `category`, `date`, `ticketPrice`, `totalCapacity`, `organizerEmail`, `isPublished`
2. **`venues`** _(5 Fields)_: `name`, `address`, `city`, `capacity`, `contactPhone`
3. **`tickets`** _(6 Fields)_: `eventId`, `userEmail`, `purchaseDate`, `seatNumber`, `pricePaid`, `status`
4. **`reviews`** _(5 Fields)_: `eventId`, `userEmail`, `rating`, `comment`, `createdAt`

---

## 🛠️ Tech Stack & Dependencies

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Native Driver / Mongoose)
- **Authentication:** Auth0 (`express-openid-connect`)
- **Documentation:** `swagger-ui-express` & `swagger-autogen`
- **Validation:** `express-validator`
- **Environment Variables:** `dotenv`

---

## ⚙️ Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/itsmejared/EventVerse.git](https://github.com/itsmejared/EventVerse.git)
   cd eventverse-api
   pnpm i
   pnpm dev
   ```
