
# Aspirant Blog - Frontend

![Admin Dashboard](https://github.com/user-attachments/assets/dbddfc46-c3c2-4f57-9a32-d8d68a1844bb)


Welcome to the frontend repository for the Aspirant Blog! This project is a full-stack blog website featuring a React frontend that communicates with a REST API served by a Node.js backend and uses MongoDB for data storage.

## Live Link

You can view the live version of the site [here](https://aspirant-blog.web.app).

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Git**

## Getting Started

### Clone the Repository

Clone the repository from GitHub and navigate to the project directory:

```bash
git clone https://github.com/Anawrulkabir/Sitemark-client.git
cd Sitemark-client
```

### Set Up Environment Variables

To configure the necessary environment variables, follow these steps:

1. **Create the `.env.local` file:**

   Inside the `Sitemark-client` directory, create a file named `.env.local`.

   ```bash
   touch .env.local
   ```

2. **Add the following environment variables to the `.env.local` file:**

   ```bash
   VITE_APIKEY=your_firebase_api_key
   VITE_AUTHDOMAIN=your_firebase_auth_domain
   VITE_PROJECTID=your_firebase_project_id
   VITE_STORAGEBUCKET=your_firebase_storage_bucket
   VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
   VITE_APPID=your_firebase_app_id
   VITE_MEASUREMENTID=your_firebase_measurement_id
   VITE_CONNECTION_STRING=your_backend_connection_string
   VITE_IMGBB_API_KEY=your_imgbb_api_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

   Replace the placeholders (`your_firebase_api_key`, `your_backend_connection_string`, etc.) with your actual configuration values.

### Install Dependencies

Install the required dependencies:

```bash
npm install
```

### Run the Development Server

Start the development server:

```bash
npm run dev
```

### Access the Application

Once the server is running, you can access the application by visiting [http://localhost:5173](http://localhost:5173) in your web browser.

## Notes

- Make sure to configure your backend API to match the `VITE_CONNECTION_STRING` value.
- Ensure all environment variables are correctly set up for the application to work seamlessly.
