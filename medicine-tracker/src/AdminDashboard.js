import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// Demo Data (same as in App.js)
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

function AdminDashboard() {
  const navigate = useNavigate();

  const adminLogout = () => {
    // In a real app, clear authentication state
    navigate('/');
  };

  return (
    <div className="App">
      {/* Admin Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#admin" className="nav-logo">Admin Dashboard</a>
          <ul className="nav-links">
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#inventory">Inventory</a></li>
            <li><a href="#analytics">Analytics</a></li>
            <li><button onClick={adminLogout} style={{background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer'}}>Logout</button></li>
          </ul>
        </div>
      </nav>

      <div className="container">
        {/* Admin Dashboard */}
        <div className="hero" id="admin">
          <h1>Admin Dashboard</h1>
          <p>Manage medicine inventory and view analytics.</p>
        </div>

        {/* Dashboard Stats */}
        <div className="key-features">
          <h2>Dashboard Overview</h2>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">📊</div>
              <h3>Total Facilities</h3>
              <p>5 pharmacies & hospitals tracked</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💊</div>
              <h3>Medicines Available</h3>
              <p>4 different medicines in stock</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔍</div>
              <h3>Today's Searches</h3>
              <p>127 medicine searches</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📈</div>
              <h3>Stock Alerts</h3>
              <p>2 items running low</p>
            </div>
          </div>
        </div>

        {/* Inventory Management */}
        <div className="results" id="inventory">
          <h2>Inventory Management</h2>
          {demoData.map(item => (
            <div key={item.id} className="card">
              <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px'}}>
                <h3 className="facility-name">{item.facility.name}</h3>
                <span className={`status-badge ${item.status === 'AVAILABLE' ? 'status-available' : item.status === 'LIMITED' ? 'status-limited' : 'status-out'}`}>
                  {item.status.replace('_', ' ')}
                </span>
              </div>
              <p style={{color: '#6b7280', marginBottom: '12px'}}>{item.medicine.name}</p>
              <div className="distance">
                📦 Quantity: {item.quantity > 0 ? item.quantity : 'Out of stock'}
              </div>
              {item.price && (
                <div className="price">NPR {item.price.toLocaleString()}</div>
              )}
              <div className="details">
                <div className="detail-item">📞 {item.facility.phone}</div>
                {item.refillEta && <div className="detail-item">⏰ Refill: {item.refillEta}</div>}
              </div>
              <div className="updated">
                Last updated: {item.updated}
              </div>
              <div style={{marginTop: '16px'}}>
                <button className="admin-btn" style={{marginRight: '8px'}}>Update Stock</button>
                <button className="admin-btn" style={{background: '#dc2626'}}>Remove Item</button>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="how-it-works" id="analytics">
          <h2>Analytics</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">📈</div>
              <h3>Search Trends</h3>
              <p>Most searched: Insulin (45%), Paracetamol (30%), Amoxicillin (15%)</p>
            </div>
            <div className="step">
              <div className="step-icon">🏥</div>
              <h3>Facility Performance</h3>
              <p>Top facility: MedPlus Pharmacy - 89% availability rate</p>
            </div>
            <div className="step">
              <div className="step-icon">⏰</div>
              <h3>Response Time</h3>
              <p>Average search time: 1.2 seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
