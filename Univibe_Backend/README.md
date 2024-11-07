# Univibes Backend

## Project Overview

Univibes is a comprehensive event management platform designed to streamline the process of organizing and managing events within a university campus. This backend service is the core of the Univibes platform, providing robust APIs for user authentication, event management, booking, and more.

### Purpose and Features

- **User Authentication**: Secure user registration and login system with JWT-based authentication.
- **Event Management**: Create, update, and manage events with detailed information including title, description, images, and themes.
- **Booking System**: Efficient booking system for users to book seats for events, with real-time seat availability updates.
- **Admin Panel**: Admin functionalities to manage users, events, and auditoriums.
- **Auditorium Management**: Manage auditoriums with details like location, seating arrangement, and event schedules.

## Why Univibes is Better

Univibes stands out from other event management platforms due to its focus on university campuses, providing a tailored solution that addresses the unique needs of campus event management. The platform offers a seamless integration of user and admin functionalities, ensuring a smooth experience for both event organizers and attendees. Additionally, Univibes leverages modern technologies to provide a scalable and efficient solution.

## Technologies Used

- **Node.js**: For building a scalable and high-performance backend.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing user, event, and booking data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Cloudinary**: For managing and storing images.
- **Nodemailer**: For sending emails.
- **Multer**: For handling file uploads.
- **Sharp**: For image processing.

These technologies ensure that Univibes is not only robust and scalable but also easy to maintain and extend.

## How to Use Univibes Backend

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB instance (local or cloud-based).
- Cloudinary account for image management.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pulkit1822/Univibes.git
   cd Univibes/Univibe_Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MONGO_URL=<your-mongodb-url>
   DB_NAME=<your-database-name>
   JWT_SECRET_KEY=<your-jwt-secret-key>
   JWT_REFRESH_SECRET_KEY=<your-jwt-refresh-secret-key>
   JWT_ADMIN_SECRET_KEY=<your-jwt-admin-secret-key>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will start on port 8000 by default.

## Contributing

We welcome contributions to improve Univibes. Here are some ways you can contribute:

- **Bug Reports & Feature Requests**: If you encounter any bugs or have feature requests, please create an issue on GitHub.
- **Pull Requests**: If you have a fix or a new feature, please fork the repository, create a new branch, and submit a pull request.
- **Documentation**: Improve the documentation to help others understand and use Univibes.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on GitHub.

Thank you for contributing to Univibes!
