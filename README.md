# 2FA Auth API

[![GitHub](https://img.shields.io/badge/GitHub-Edarth002-181717?logo=github)](https://github.com/Edarth002)

A backend API for handling Two-Factor Authentication (2FA), designed to integrate seamlessly with frontend 2FA overlay applications. Provides endpoints for user registration, login, and 2FA verification using TOTP (Time-based One-Time Password).

## Features

- User registration and login
- OTP-based 2FA generation and verification
- Token authentication
- Simple RESTful API structure
- Designed to work with a 2FA overlay frontend

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Database (None needed, connected to aiven MySQL using .env file, request for details or create and configure according to your own choosen MySQL database, remote or locally)

### Installation

```bash
git clone https://github.com/Edarth002/2faAuth-api.git
cd 2faAuth-api
npm install
