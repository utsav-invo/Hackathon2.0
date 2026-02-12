// Demo Data (8 Kathmandu pharmacies)
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

let map, markers = [];
const KATHMANDU_CENTER = [27.7172, 85.3240];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('searchBtn').addEventListener('click', handleSearch);
  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleSearch();
  });
});

function handleSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const btn = document.getElementById('searchBtn');

  if (!query) return;

  // Show loading
  document.getElementById('loadingSection').style.display = 'block';
  document.getElementById('resultsSection').style.display = 'none';
  document.getElementById('noResultsSection').style.display = 'none';
  document.getElementById('mapSection').style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Searching...';

  // Simulate API delay
  setTimeout(() => {
    const results = demoData.filter(item =>
      item.medicine.name.toLowerCase().includes(query)
    );

    document.getElementById('loadingSection').style.display = 'none';

    if (results.length > 0) {
      displayResults(results);
      document.getElementById('resultsSection').style.display = 'block';
      document.getElementById('mapSection').style.display = 'block';
      document.getElementById('adminSection').style.display = 'block';
      displayMap(results);
      // Invalidate map size after container is visible
      if (map) map.invalidateSize();
    } else {
      document.getElementById('noResultsSection').style.display = 'block';
      document.getElementById('adminSection').style.display = 'block';
    }

    btn.disabled = false;
    btn.textContent = 'Search Again';
  }, 1200);
}

function displayResults(results) {
  const container = document.getElementById('resultsList');
  container.innerHTML = results.map(item => createCard(item)).join('');
}

function createCard(item) {
  const statusClass = item.status === 'AVAILABLE' ? 'status-available' :
                     item.status === 'LIMITED' ? 'status-limited' : 'status-out';

  const price = item.price ? `<div class="price">NPR ${item.price.toLocaleString()}</div>` : '';
  const quantity = item.quantity > 0 ? `<div class="distance">📦 ${item.quantity} units available</div>` : '';
  const delivery = item.deliveryAvailable ?
    '<div class="detail-item">🚚 Delivery available</div>' : '';
  const refill = item.refillEta ?
    `<div class="detail-item">⏰ Refill: ${item.refillEta}</div>` : '';

  return `
    <div class="card" onclick="openFacility(${item.id})">
      <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px;">
        <h3 class="facility-name">${item.facility.name}</h3>
        <span class="status-badge ${statusClass}">${item.status.replace('_', ' ')}</span>
      </div>
      <p style="color: #6b7280; margin-bottom: 12px;">${item.facility.address}</p>
      <div class="distance">
        📍 <strong>${item.distance.toFixed(1)} km</strong> away
      </div>
      ${quantity}
      ${price}
      <div class="details">
        ${delivery}${refill}
        ${item.facility.phone ? `<div class="detail-item">📞 ${item.facility.phone}</div>` : ''}
      </div>
      <div class="updated">
        Updated ${item.updated} • *Demo data
      </div>
    </div>
  `;
}

function displayMap(results) {
  // Initialize map if not already done
  if (!map) {
    map = L.map('map').setView(KATHMANDU_CENTER, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  }

  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  results.forEach(item => {
    const marker = L.marker([item.facility.lat, item.facility.lng])
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
    markers.push(marker);
  });

  map.setView(KATHMANDU_CENTER, 13);
}

function openFacility(id) {
  alert(`Opening facility details for ID: ${id}\n\n📞 Call to confirm stock!\n\n*Demo - Full version has contact forms`);
}


