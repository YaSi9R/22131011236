# URL Shortener Web App – Frontend Test Submission

This repository contains the frontend implementation for the Company Frontend Assessment. The application is a URL Shortener built using **React** and **Material UI**, with logging middleware integrated as per the assignment requirements.
## Screenshots

### Shortener Page
![Shorten Page](src/assets/shorten.png)

### Statistics Page
![Stats Page](src/assets/stats.png)




## Folder Structure
-> LoggingMiddleware/
│ |-> logger.js # Reusable logging utility
|-> FrontendTestSubmission/
|-> public/
|-> src/
│ -> components/ # Reusable components
│ -> pages/ # Route-based pages
│ -> services/ # URL and localStorage utilities
│ -> App.js # Routes configuration
│ -> index.js # Entry point
-> package.json

## Tech Stack

- React (JavaScript)
- Material UI (MUI)
- React Router DOM
- LocalStorage for temporary session data
- Custom reusable logging middleware (integrated)

## Features

### 1. URL Shortener Page
- Shorten up to 5 URLs at once
- Inputs: Long URL, optional validity (in minutes), optional custom shortcode
- Validations: URL format, validity must be integer, unique shortcode
- Displays: Shortened URL, expiry time, copyable links
- Logs info/errors using custom middleware

### 2. Statistics Page
- Shows all shortened URLs from session
- For each entry: Short URL, creation & expiry times, click count, click details
- Logs interactions using logging middleware

### 3. Redirection Handling
- Handles routes like /:shortCode
- Redirects if link is valid & not expired
- Logs redirection events or expiry issues

## Logging Middleware

Located in `../LoggingMiddleware/logger.js`, the `logEvent()` function logs events to the company test server.

### Signature
```js
logEvent(stack, level, pkg, message)
