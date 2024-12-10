# API Documentation

This document provides details about the API endpoints used in the Weather Application.

## Authentication

- **POST /api/auth/login**: Authenticates a user and returns a token.
- **POST /api/auth/register**: Registers a new user.

## Weather

- **GET /api/weather/:city**: Retrieves weather data for a specified city.
- **GET /api/weather/history**: Fetches the search history for the authenticated user.