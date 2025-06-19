#!/usr/bin/env python3
"""
Tests for the Flask API
"""

import pytest
import json
from app import app

@pytest.fixture
def client():
    """Create a test client"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_endpoint(client):
    """Test the home endpoint"""
    response = client.get('/')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['status'] == 'running'
    assert 'endpoints' in data

def test_all_sneakers_endpoint(client):
    """Test the all sneakers endpoint"""
    response = client.get('/api/sneakers')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'data' in data
    assert 'count' in data
    assert isinstance(data['data'], list)

def test_new_sneakers_endpoint(client):
    """Test the new sneakers endpoint"""
    response = client.get('/api/sneakers/new')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'data' in data
    assert isinstance(data['data'], list)

def test_used_sneakers_endpoint(client):
    """Test the used sneakers endpoint"""
    response = client.get('/api/sneakers/used')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'data' in data
    assert isinstance(data['data'], list)

def test_refresh_endpoint(client):
    """Test the refresh endpoint"""
    response = client.get('/api/refresh')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'message' in data

def test_404_endpoint(client):
    """Test 404 handling"""
    response = client.get('/nonexistent')
    assert response.status_code == 404
    
    data = json.loads(response.data)
    assert 'error' in data