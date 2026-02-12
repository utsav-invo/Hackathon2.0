import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './App.css';

// Demo Data
const demoData = [
  {
    id: 1,
    facility: { name: 'MedPlus Pharmacy', address: 'Thamel, Kathmandu', lat: 27.7172, lng: 85.3240, phone: '+977-1-4700123' },
    medicine: { name: 'Insulin Glargine' },
    quantity: 15, price: 1200, status: 'AVAILABLE', distance: 1.2,
    refillEta: '3 days', deliveryAvailable: true, updated: 'Feb 12, 2026 7:42 AM'
  },
  {
    id: 2,
    facility: { name: 'City Hospital', address: 'Lazimpat, Kathmandu', lat: 27.7150, lng: 85.3220, phone: '+977-1-4420123' },
    medicine: { name: 'Insulin Glargine' },
    quantity: 0, price: 1250, status: 'LIMITED', distance: 0.8,
    refillEta: '1 day', deliveryAvailable: false, updated: 'Feb 12, 2026 6:30 AM'
  },
  {
    id: 3,
    facility: { name: 'Health Pharmacy', address: 'Patan Hospital Road', lat: 27.6848, lng: 85.3297, phone: '+977-1-5520123' },
    medicine: { name: 'Insulin Glargine' },
    quantity: -1, price: null, status: 'OUT_OF_STOCK', distance: 3.5,
    refillEta: '5 days', deliveryAvailable: false, updated: 'Feb 11, 2026 4:15 PM'
  },
  {
    id: 4,
    facility: { name: 'LifeCare Medical', address: 'Boudha, Kathmandu', lat: 27.7211, lng: 85.3540, phone: '+977-1-4480123' },
    medicine: { name: 'Paracetamol 500mg' },
    quantity: 45, price: 25, status: 'AVAILABLE', distance: 2.1,
    refillEta: null, deliveryAvailable: true, updated: 'Feb 12, 2026 7:00 AM'
  },
  {
    id: 5,
    facility: { name: 'Everest Pharmacy', address: 'Koteshwor', lat: 27.6894, lng: 85.3480, phone: '+977-1-4460123' },
    medicine: { name: 'Amoxicillin 500mg' },
    quantity: 30, price: 80, status: 'AVAILABLE', distance: 4.2,
    updated: 'Feb 12, 2026 6:45 AM'
  }
];

const KATHMANDU_CENTER = [27.7172, 85.3240];

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load Leaflet dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      // Leaflet loaded
    };
    document.head.appendChild(script);
  }, []);

  const handleSearch = () => {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!query) return;

    setLoading(true);
    setNoResults(false);
    setShowMap(false);
    setResults([]);

    const btn = document.getElementById('searchBtn');
    btn.disabled = true;
    btn.textContent = 'Searching...';

    setTimeout(() => {
      const filteredResults = demoData.filter(item =>
        item.medicine.name.toLowerCase().includes(query)
      );

      setLoading(false);
      btn.disabled = false;
      btn.textContent = 'Search Again';

      if (filteredResults.length > 0) {
        setResults(filteredResults);
        setShowMap(true);
        displayMap(filteredResults);
      } else {
        setNoResults(true);
      }
    }, 1200);
  };

  const displayMap = (results) => {
    if (!window.L) return;

    if (!map) {
      const newMap = window.L.map('map').setView(KATHMANDU_CENTER, 13);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(newMap);
      setMap(newMap);
    }

    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    const newMarkers = [];

    results.forEach(item => {
      const marker = window.L.marker([item.facility.lat, item.facility.lng])
        .bindPopup(`
          <div style="min-width: 200px;">
            <h4 style="font-weight: bold; margin-bottom: 8px;">${item.facility.name}</h4>
            <div>${item.medicine.name}</div>
            <span style="padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;
              background: ${item.status === 'AVAILABLE' ? '#dcfce7' : item.status === 'LIMITED' ? '#fef3c7' : '#fee2e2'};">
              ${item.status}
            </span>
          </div>
        `);
      marker.addTo(map);
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
    map.setView(KATHMANDU_CENTER, 13);
    setTimeout(() => map.invalidateSize(), 100);
  };

  const openFacility = (id) => {
    alert(`Opening facility details for ID: ${id}\n\n📞 Call to confirm stock!\n\n*Demo - Full version has contact forms`);
  };



  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo">Medicine Tracker</a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#apply">Apply as Candidate</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
      </nav>

      <div className="container">
        {/* Hero */}
        <div className="hero" id="home">
          <h1>Medicine Tracker</h1>
          <p>Find nearby pharmacies & hospitals with medicine stock before you travel.</p>
          
          {/* Search */}
          <div className="search-container">
            <div style={{display: 'flex', gap: '12px'}}>
              <input type="text" className="search-input" id="searchInput" placeholder="e.g., Insulin, Paracetamol..." onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
              <button className="search-btn" id="searchBtn" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="results" id="resultsSection">
            {results.map(item => (
              <div key={item.id} className="card" onClick={() => openFacility(item.id)}>
                <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px'}}>
                  <h3 className="facility-name">{item.facility.name}</h3>
                  <span className={`status-badge ${item.status === 'AVAILABLE' ? 'status-available' : item.status === 'LIMITED' ? 'status-limited' : 'status-out'}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <p style={{color: '#6b7280', marginBottom: '12px'}}>{item.facility.address}</p>
                <div className="distance">
                  📍 <strong>{item.distance.toFixed(1)} km</strong> away
                </div>
                {item.quantity > 0 && (
                  <div className="distance">📦 {item.quantity} units available</div>
                )}
                {item.price && (
                  <div className="price">NPR {item.price.toLocaleString()}</div>
                )}
                <div className="details">
                  {item.deliveryAvailable && <div className="detail-item">🚚 Delivery available</div>}
                  {item.refillEta && <div className="detail-item">⏰ Refill: {item.refillEta}</div>}
                  {item.facility.phone && <div className="detail-item">📞 {item.facility.phone}</div>}
                </div>
                <div className="updated">
                  Updated {item.updated} • *Demo data
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading" id="loadingSection">
            🔍 Searching nearby pharmacies...
          </div>
        )}

        {/* No Results */}
        {noResults && (
          <div className="no-results" id="noResultsSection">
            No results found. Try "Insulin" or "Paracetamol".
          </div>
        )}

        {/* Map */}
        {showMap && (
          <div id="mapSection">
            <div id="map" className="map-container"></div>
          </div>
        )}

        {/* How It Works */}
        <div className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">🔍</div>
              <h3>Search Medicine</h3>
              <p>Enter the name of the medicine you need in the search bar above.</p>
            </div>
            <div className="step">
              <div className="step-icon">📍</div>
              <h3>Find Nearby Locations</h3>
              <p>View pharmacies and hospitals with available stock near your location.</p>
            </div>
            <div className="step">
              <div className="step-icon">🚀</div>
              <h3>Get Directions</h3>
              <p>Use the map to navigate to the facility and get your medicine quickly.</p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="key-features">
          <h2>Key Features</h2>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Real-Time Updates</h3>
              <p>Get live information on medicine availability to avoid unnecessary trips.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🗺️</div>
              <h3>Interactive Maps</h3>
              <p>Visualize locations on an interactive map for easy navigation.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access the tracker on any device, anywhere, anytime.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Reliable</h3>
              <p>Your data is protected with top-notch security measures.</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="why-choose-us">
          <h2>Why Choose Us?</h2>
          <div className="benefits">
            <div className="benefit">
              <div className="benefit-icon">💊</div>
              <h3>Comprehensive Coverage</h3>
              <p>We track availability across thousands of pharmacies and hospitals.</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">⏱️</div>
              <h3>Save Time</h3>
              <p>Reduce waiting times by knowing exactly where to go.</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">❤️</div>
              <h3>Health Focused</h3>
              <p>Dedicated to improving healthcare access for everyone.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <h3>Medicine Availability Tracker</h3>
          <p>Empowering patients with real-time medicine availability information.</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#apply">Apply as Candidate</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact</a>
          </div>
          <p>&copy; 2023 Medicine Tracker. All rights reserved.</p>
        </div>

        {/* Admin Section (Top Right) */}
        <div className="admin-top-right" id="adminSection">
          <button className="admin-btn" onClick={() => navigate('/admin-login')}>🛠 Admin</button>
        </div>
      </div>
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
