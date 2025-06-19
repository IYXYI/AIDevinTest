# Sneakers Market Scraper Web App

A web application that scrapes French market websites for sneakers (both new and used) and displays them in a clean, interactive interface.

## Features

- **Backend**: Python-based scraper that fetches sneaker listings from French websites
- **Frontend**: Clean web interface displaying sneaker listings with filtering
- **API**: REST API endpoint serving scraped data
- **CI/CD**: GitHub Actions pipeline with automated testing and deployment

## Project Structure

```
├── backend/           # Python backend with scraping logic
├── frontend/          # HTML/CSS/JS frontend
├── .github/workflows/ # CI/CD pipeline
└── README.md
```

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
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

2. Open `index.html` in a web browser or serve it with a local server:
```bash
python -m http.server 8000
```

The frontend will be available at `http://localhost:8000`

## API Endpoints

- `GET /api/sneakers` - Get all sneaker listings
- `GET /api/sneakers/new` - Get only new sneaker listings
- `GET /api/sneakers/used` - Get only used sneaker listings

## Deployment

The frontend is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

## Development

### Running Tests

Backend tests:
```bash
cd backend
python -m pytest tests/
```

### Manual Testing

1. Start the backend server
2. Open the frontend in a browser
3. Click the "Refresh" button to fetch latest data
4. Verify that sneaker listings are displayed correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

MIT License