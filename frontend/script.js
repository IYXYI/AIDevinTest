/**
 * Sneakers Market Scraper Frontend JavaScript
 * Handles API calls and UI interactions
 */

class SneakersApp {
    constructor() {
        this.apiBaseUrl = this.getApiBaseUrl();
        this.sneakersData = [];
        this.filteredData = [];
        
        this.initializeElements();
        this.bindEvents();
        this.loadInitialData();
    }
    
    getApiBaseUrl() {
        // For development, try localhost first, then fall back to mock data
        const isDevelopment = window.location.hostname === 'localhost' || 
                             window.location.hostname === '127.0.0.1' ||
                             window.location.hostname.includes('work-');
        
        if (isDevelopment) {
            // Try to detect if backend is running on different ports
            if (window.location.port === '12000') {
                return 'http://localhost:5000'; // Backend on port 5000
            } else if (window.location.port === '12001') {
                return 'http://localhost:5000'; // Backend on port 5000
            }
            return 'http://localhost:5000';
        }
        
        // For production, use relative URLs or configure your backend URL
        return '/api';
    }
    
    initializeElements() {
        this.refreshBtn = document.getElementById('refreshBtn');
        this.conditionFilter = document.getElementById('conditionFilter');
        this.totalCount = document.getElementById('totalCount');
        this.lastUpdated = document.getElementById('lastUpdated');
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        this.tableBody = document.getElementById('sneakersTableBody');
        this.noData = document.getElementById('noData');
        this.table = document.getElementById('sneakersTable');
    }
    
    bindEvents() {
        this.refreshBtn.addEventListener('click', () => this.refreshData());
        this.conditionFilter.addEventListener('change', () => this.filterData());
    }
    
    async loadInitialData() {
        await this.fetchSneakers();
    }
    
    async refreshData() {
        this.showLoading();
        
        try {
            // Trigger backend refresh
            await this.triggerBackendRefresh();
            
            // Wait a moment for the refresh to process
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Fetch updated data
            await this.fetchSneakers();
        } catch (error) {
            console.error('Error refreshing data:', error);
            this.showError();
        }
    }
    
    async triggerBackendRefresh() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/refresh`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.warn('Could not trigger backend refresh:', error);
            // Don't throw error here, just log it
        }
    }
    
    async fetchSneakers() {
        this.showLoading();
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/sneakers`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                this.sneakersData = result.data || [];
                this.updateStats(result.count || 0, result.last_updated);
                this.filterData();
            } else {
                throw new Error('API returned unsuccessful response');
            }
            
        } catch (error) {
            console.error('Error fetching sneakers:', error);
            
            // Fallback to mock data if API is not available
            this.loadMockData();
        }
        
        this.hideLoading();
    }
    
    loadMockData() {
        console.log('Loading mock data as fallback');
        
        this.sneakersData = [
            {
                brand: 'Nike',
                model: 'Air Max 90',
                price: '€129.99',
                condition: 'New',
                url: 'https://example.com/nike-air-max-90',
                source: 'Demo Store'
            },
            {
                brand: 'Adidas',
                model: 'Stan Smith',
                price: '€89.99',
                condition: 'New',
                url: 'https://example.com/adidas-stan-smith',
                source: 'Demo Store'
            },
            {
                brand: 'Nike',
                model: 'Air Jordan 1',
                price: '€85.00',
                condition: 'Used - Good',
                url: 'https://example.com/used-air-jordan-1',
                source: 'Demo Marketplace'
            },
            {
                brand: 'Converse',
                model: 'Chuck Taylor All Star',
                price: '€65.00',
                condition: 'New',
                url: 'https://example.com/converse-chuck-taylor',
                source: 'Demo Store'
            },
            {
                brand: 'Vans',
                model: 'Old Skool',
                price: '€75.00',
                condition: 'New',
                url: 'https://example.com/vans-old-skool',
                source: 'Demo Store'
            },
            {
                brand: 'Adidas',
                model: 'Yeezy Boost 350',
                price: '€180.00',
                condition: 'Used - Very Good',
                url: 'https://example.com/used-yeezy-350',
                source: 'Demo Marketplace'
            }
        ];
        
        this.updateStats(this.sneakersData.length, new Date().toISOString());
        this.filterData();
    }
    
    filterData() {
        const condition = this.conditionFilter.value;
        
        if (condition === 'all') {
            this.filteredData = [...this.sneakersData];
        } else if (condition === 'new') {
            this.filteredData = this.sneakersData.filter(sneaker => 
                sneaker.condition.toLowerCase().includes('new')
            );
        } else if (condition === 'used') {
            this.filteredData = this.sneakersData.filter(sneaker => 
                sneaker.condition.toLowerCase().includes('used')
            );
        }
        
        this.renderTable();
    }
    
    renderTable() {
        if (this.filteredData.length === 0) {
            this.showNoData();
            return;
        }
        
        this.hideNoData();
        
        this.tableBody.innerHTML = '';
        
        this.filteredData.forEach(sneaker => {
            const row = document.createElement('tr');
            
            const conditionClass = sneaker.condition.toLowerCase().includes('new') ? 
                'condition-new' : 'condition-used';
            
            row.innerHTML = `
                <td class="brand-cell">${this.escapeHtml(sneaker.brand)}</td>
                <td class="model-cell">${this.escapeHtml(sneaker.model)}</td>
                <td class="price-cell">${this.escapeHtml(sneaker.price)}</td>
                <td class="condition-cell">
                    <span class="${conditionClass}">${this.escapeHtml(sneaker.condition)}</span>
                </td>
                <td class="source-cell">${this.escapeHtml(sneaker.source || 'Unknown')}</td>
                <td class="link-cell">
                    <a href="${this.escapeHtml(sneaker.url)}" target="_blank" rel="noopener noreferrer">
                        View
                    </a>
                </td>
            `;
            
            this.tableBody.appendChild(row);
        });
    }
    
    updateStats(count, lastUpdated) {
        this.totalCount.textContent = `Total: ${count}`;
        
        if (lastUpdated) {
            const date = new Date(lastUpdated);
            const formattedDate = date.toLocaleString();
            this.lastUpdated.textContent = `Last updated: ${formattedDate}`;
        } else {
            this.lastUpdated.textContent = 'Last updated: Never';
        }
    }
    
    showLoading() {
        this.loading.classList.remove('hidden');
        this.error.classList.add('hidden');
        this.refreshBtn.disabled = true;
        this.refreshBtn.innerHTML = '<span class="btn-icon">⏳</span> Loading...';
    }
    
    hideLoading() {
        this.loading.classList.add('hidden');
        this.refreshBtn.disabled = false;
        this.refreshBtn.innerHTML = '<span class="btn-icon">🔄</span> Refresh Data';
    }
    
    showError() {
        this.error.classList.remove('hidden');
        this.loading.classList.add('hidden');
        this.hideLoading();
    }
    
    showNoData() {
        this.noData.classList.remove('hidden');
        this.table.classList.add('hidden');
    }
    
    hideNoData() {
        this.noData.classList.add('hidden');
        this.table.classList.remove('hidden');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SneakersApp();
});

// Add some global error handling
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});