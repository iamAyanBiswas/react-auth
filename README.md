# Advanced React Authentication System

## Introduction

This project implements a robust authentication system for React applications. It uses a token-based authentication mechanism with separate access and refresh tokens, providing a secure and scalable solution for user authentication and authorization.

## Features

- User registration and login
- Token-based authentication (access token and refresh token)
- Role-based access control
- Protected routes based on user roles
- Automatic token refresh mechanism
- Secure token storage and handling

## System Components

1. **AuthContext**: Manages the authentication state and provides authentication methods.
2. **ProtectedRoute**: A component that restricts access to routes based on user authentication and roles.
3. **useAuth**: A custom hook for easy access to authentication functions and user data.

## Setup

1. Clone the repository
2. Change the directory
3. Install dependencies
4. Run server



```bash
git clone https://github.com/iamAyanBiswas/react-auth.git
cd react-auth
npm install
npm run dev
```

