# Deployment Guide

## Overview

This document provides instructions for deploying the Sneakers Market Scraper web application.

## Architecture

- **Backend**: Python Flask API (runs on port 5000)
- **Frontend**: Static HTML/CSS/JS (can be served from any web server)
- **CI/CD**: GitHub Actions pipeline
- **Deployment**: GitHub Pages for frontend

## Local Development

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the backend server:
```bash
python app.py
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Serve the frontend files:
```bash
python -m http.server 8000
```

The frontend will be available at `http://localhost:8000`

## Production Deployment

### GitHub Pages (Frontend)

The frontend is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

**To enable GitHub Pages:**

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically deploy the frontend

### Backend Deployment Options

The backend can be deployed to various platforms:

#### Option 1: Heroku
1. Create a `Procfile` in the backend directory:
```
web: python app.py
```

2. Deploy to Heroku:
```bash
heroku create your-app-name
git subtree push --prefix backend heroku main
```

#### Option 2: Railway
1. Connect your GitHub repository to Railway
2. Set the root directory to `backend`
3. Railway will automatically detect and deploy the Flask app

#### Option 3: DigitalOcean App Platform
1. Create a new app on DigitalOcean
2. Connect your GitHub repository
3. Set the source directory to `backend`
4. Configure the run command: `python app.py`

## Environment Variables

For production deployment, consider setting these environment variables:

- `FLASK_ENV=production`
- `PORT` (for cloud platforms)
- Any API keys for actual scraping services

## API Endpoints

Once deployed, the backend provides these endpoints:

- `GET /` - Health check
- `GET /api/sneakers` - All sneaker listings
- `GET /api/sneakers/new` - New sneakers only
- `GET /api/sneakers/used` - Used sneakers only
- `GET /api/refresh` - Trigger data refresh

## Frontend Configuration

To connect the frontend to your deployed backend, update the `getApiBaseUrl()` function in `frontend/script.js`:

```javascript
getApiBaseUrl() {
    // Replace with your backend URL
    return 'https://your-backend-url.com';
}
```

## Monitoring

- GitHub Actions provides build and deployment logs
- Backend logs can be monitored through your hosting platform
- Frontend is static and requires no monitoring

## Security Considerations

- The current implementation uses mock data for demonstration
- For production, implement proper rate limiting
- Add authentication if needed
- Use HTTPS for all communications
- Respect website terms of service when scraping

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure Flask-CORS is properly configured
2. **API Connection**: Check that the backend URL is correct in the frontend
3. **GitHub Pages**: Ensure the workflow has proper permissions
4. **Dependencies**: Make sure all requirements are listed in requirements.txt

### Logs

- GitHub Actions logs: Repository → Actions tab
- Backend logs: Check your hosting platform's logs
- Frontend errors: Browser developer console