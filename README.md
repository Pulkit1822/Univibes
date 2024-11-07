
# Univibes

## Project Overview

Univibes is a comprehensive event management platform designed to streamline the process of organizing and managing events within a university campus. The platform consists of three main components: the backend service, the faculty admin panel, and the student panel. Each component plays a crucial role in ensuring a seamless experience for both event organizers and attendees.

### Purpose and Features

- **User Authentication**: Secure user registration and login system with JWT-based authentication.
- **Event Management**: Create, update, and manage events with detailed information including title, description, images, and themes.
- **Booking System**: Efficient booking system for users to book seats for events, with real-time seat availability updates.
- **Admin Panel**: Admin functionalities to manage users, events, and auditoriums.
- **Auditorium Management**: Manage auditoriums with details like location, seating arrangement, and event schedules.
- **Event Discovery**: Browse and discover upcoming events by category.
- **Profile Management**: Manage user profile and view booking history.

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
- **Next.js**: For building a scalable and high-performance frontend.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: For type safety and better code maintainability.
- **Axios**: For making HTTP requests.
- **React Toastify**: For providing notifications.
- **Swiper**: For creating carousels and sliders.

These technologies ensure that Univibes is not only robust and scalable but also easy to maintain and extend.

## How to Use Univibes

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB instance (local or cloud-based).
- Cloudinary account for image management.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pulkit1822/Univibes.git
   ```

2. Install dependencies for each component:

   For the backend:
   ```bash
   cd Univibes/Univibe_Backend
   npm install
   ```

   For the faculty admin panel:
   ```bash
   cd ../Univibe_Faculty
   npm install
   ```

   For the student panel:
   ```bash
   cd ../Univibe_Student
   npm install
   ```

3. Create a `.env` file in the root directory of each component and add the following environment variables:

   For the backend:
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

   For the faculty admin panel:
   ```env
   NEXT_PUBLIC_BACKEND_API=<your-backend-api-url>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```

   For the student panel:
   ```env
   NEXT_PUBLIC_BACKEND_API=<your-backend-api-url>
   ```

4. Start the server for each component:

   For the backend:
   ```bash
   cd Univibes/Univibe_Backend
   npm start
   ```

   For the faculty admin panel:
   ```bash
   cd ../Univibe_Faculty
   npm start
   ```

   For the student panel:
   ```bash
   cd ../Univibe_Student
   npm start
   ```

The backend server will start on port 8000 by default, and the faculty admin panel and student panel will start on port 3000 by default.

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

## Feedback

If you have any feedback, suggestions, or questions regarding this repository, please feel free to open an issue or contact me below on any of the platforms you prefer 😊
<br/>
<p align="center">
  <a href="https://pulkitmathur.tech/"><img src="https://github.com/Pulkit1822/Pulkit1822/blob/main/animated-icons/pic.jpeg" alt="portfolio" width="32"></a>&nbsp;&nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/pulkitkmathur/"><img src="https://github.com/TheDudeThatCode/TheDudeThatCode/blob/master/Assets/Linkedin.svg" alt="Linkedin Logo" width="32"></a>&nbsp;&nbsp;&nbsp;
  <a href="mailto:pulkitmathur.me@gmail.com"><img src="https://github.com/TheDudeThatCode/TheDudeThatCode/blob/master/Assets/Gmail.svg" alt="Gmail logo" height="32"></a>&nbsp;&nbsp;&nbsp;
  <a href="https://www.instagram.com/pulkitkumarmathur/"><img src="https://github.com/TheDudeThatCode/TheDudeThatCode/blob/master/Assets/Instagram.svg" alt="Instagram Logo" width="32"></a>&nbsp;&nbsp;&nbsp;
  <a href="https://in.pinterest.com/pulkitkumarmathur/"><img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png?20160129083321" alt="Pinterest Logo" width="32"></a>&nbsp;&nbsp;&nbsp;
  <a href="https://twitter.com/pulkitkmathur"><img src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png" alt="Twitter Logo" width="32"></a>&nbsp;&nbsp;&nbsp;
</p>



Happy learning and coding!

---

If you find this repository useful, don't forget to star it! ⭐️

### Written by [Pulkit](https://github.com/Pulkit1822)
