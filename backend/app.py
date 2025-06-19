#!/usr/bin/env python3
"""
Sneakers Market Scraper Backend
A Flask API that scrapes French market websites for sneaker listings
"""

import json
import time
import threading
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
from scraper import SneakerScraper

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global data storage
sneakers_data = {
    'new': [],
    'used': [],
    'last_updated': None
}

# Initialize scraper
scraper = SneakerScraper()

def update_sneakers_data():
    """Background task to update sneakers data"""
    global sneakers_data
    try:
        print(f"[{datetime.now()}] Starting sneaker data update...")
        
        # Scrape new sneakers
        new_sneakers = scraper.scrape_new_sneakers()
        
        # Scrape used sneakers  
        used_sneakers = scraper.scrape_used_sneakers()
        
        # Update global data
        sneakers_data = {
            'new': new_sneakers,
            'used': used_sneakers,
            'last_updated': datetime.now().isoformat()
        }
        
        print(f"[{datetime.now()}] Data updated: {len(new_sneakers)} new, {len(used_sneakers)} used sneakers")
        
    except Exception as e:
        print(f"[{datetime.now()}] Error updating data: {str(e)}")

def periodic_update():
    """Run periodic updates every 30 minutes"""
    while True:
        update_sneakers_data()
        time.sleep(1800)  # 30 minutes

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        'status': 'running',
        'message': 'Sneakers Market Scraper API',
        'last_updated': sneakers_data.get('last_updated'),
        'endpoints': [
            '/api/sneakers',
            '/api/sneakers/new', 
            '/api/sneakers/used'
        ]
    })

@app.route('/api/sneakers')
def get_all_sneakers():
    """Get all sneaker listings (new and used)"""
    all_sneakers = sneakers_data['new'] + sneakers_data['used']
    
    return jsonify({
        'success': True,
        'data': all_sneakers,
        'count': len(all_sneakers),
        'last_updated': sneakers_data.get('last_updated')
    })

@app.route('/api/sneakers/new')
def get_new_sneakers():
    """Get only new sneaker listings"""
    return jsonify({
        'success': True,
        'data': sneakers_data['new'],
        'count': len(sneakers_data['new']),
        'last_updated': sneakers_data.get('last_updated')
    })

@app.route('/api/sneakers/used')
def get_used_sneakers():
    """Get only used sneaker listings"""
    return jsonify({
        'success': True,
        'data': sneakers_data['used'],
        'count': len(sneakers_data['used']),
        'last_updated': sneakers_data.get('last_updated')
    })

@app.route('/api/refresh')
def refresh_data():
    """Manually trigger data refresh"""
    threading.Thread(target=update_sneakers_data, daemon=True).start()
    return jsonify({
        'success': True,
        'message': 'Data refresh initiated'
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Initial data load
    print("Loading initial sneaker data...")
    update_sneakers_data()
    
    # Start periodic update thread
    update_thread = threading.Thread(target=periodic_update, daemon=True)
    update_thread.start()
    
    # Start Flask app
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5000, debug=False)