#!/usr/bin/env python3
"""
Tests for the scraper module
"""

import pytest
from scraper import SneakerScraper

@pytest.fixture
def scraper():
    """Create a scraper instance"""
    return SneakerScraper()

def test_scraper_initialization(scraper):
    """Test scraper initialization"""
    assert scraper is not None
    assert hasattr(scraper, 'ua')
    assert hasattr(scraper, 'session')

def test_scrape_new_sneakers(scraper):
    """Test scraping new sneakers"""
    sneakers = scraper.scrape_new_sneakers()
    
    assert isinstance(sneakers, list)
    
    # Check if we got some sneakers (mock data should return some)
    if len(sneakers) > 0:
        sneaker = sneakers[0]
        assert 'brand' in sneaker
        assert 'model' in sneaker
        assert 'price' in sneaker
        assert 'condition' in sneaker
        assert 'url' in sneaker
        assert sneaker['condition'] == 'New'

def test_scrape_used_sneakers(scraper):
    """Test scraping used sneakers"""
    sneakers = scraper.scrape_used_sneakers()
    
    assert isinstance(sneakers, list)
    
    # Check if we got some sneakers (mock data should return some)
    if len(sneakers) > 0:
        sneaker = sneakers[0]
        assert 'brand' in sneaker
        assert 'model' in sneaker
        assert 'price' in sneaker
        assert 'condition' in sneaker
        assert 'url' in sneaker
        assert 'Used' in sneaker['condition']

def test_get_page_method(scraper):
    """Test the _get_page method with invalid URL"""
    # Test with invalid URL - should return None
    result = scraper._get_page('http://invalid-url-that-does-not-exist.com')
    assert result is None