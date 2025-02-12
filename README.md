# IRCTC API

## Project Overview
This is a NodeJs-based IRCTC API that allows users to register, login, check train seat availability, and book seats. The system supports role-based access with admin and user roles.Uses Pessimistic Locking to handle race around condition.

## Tech Stack
- Backend: NodeJs
- Database: PostgreSQL
- Authentication: JsonWebToken
- Password Hashing: Bcrypt
- ORM: Prisma

## Prerequisites
-   **Node.js**  (v16+)
-   **PostgreSQL**
-   **npm**

## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/SudhanshuAi/irctc_api.git
cd irctc_api
```

```
`DATABASE_URL="postgresql://username:password@localhost:5432/railway_db"
ADMIN_API_KEY=your_secret_admin_api_key
JWT_SECRET=your_jwt_secret_key
```

### 5. Prisma Configuration
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init`
```

### 6. Run the Application
```bash
npm run dev
```

## API Endpoints

### User Registration
- **URL**: `/auth/register
- **Method**: POST
- **Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
  "role": "string"
}
```

### User Login
- **URL**: `/auth/login`
- **Method**: POST
- **Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```

### Add Train (Admin Only)
- **URL**: `/trains/add`
- **Method**: POST
- **Headers**: `X-API-Key: [Admin API Key]`
- **Request Body**:
```json
{
  "name": "string",
  "source": "string",
  "destination": "string",
  "totalSeats": "integer"
}
```

### Check Seat Availability
- **URL**: `/trains/availability`
- **Method**: GET
- **Query Parameters**: 
  - `source`: string
  - `destination`: string

### Book Seat
- **URL**: `/bookings/book`
- **Method**: POST
- **Headers**: `Authorization: Bearer [JWT Token]`
- **Request Body**:
```json
{
  "trainId": "integer",
}
```

### Get Booking Details
- **URL**: `/bookings/details`
- **Method**: GET
- **Headers**: `Authorization: Bearer [JWT Token]`

## Security Features
- Password hashing with bcrypt
- JWT-based authentication
- Admin API key protection
- Race condition handling for seat bookings

## Assumptions

- Bookings are confirmed instantly upon successful seat allocation
- Train is automatically marked inactive if no seats are available


## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.
