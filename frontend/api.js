// ===== API HELPER =====
const API_BASE = 'http://localhost:7000/api';

function getToken() { return localStorage.getItem('token'); }
function getRole() { return localStorage.getItem('role'); }

async function api(method, path, body = null, isFormData = false) {
    const headers = {};
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (!isFormData && body) headers['Content-Type'] = 'application/json';

    const opts = { method, headers };
    if (body) opts.body = isFormData ? body : JSON.stringify(body);

    const res = await fetch(API_BASE + path, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
}

const API = {
    get: (path) => api('GET', path),
    post: (path, body, fd) => api('POST', path, body, fd),
    put: (path, body, fd) => api('PUT', path, body, fd),
    delete: (path) => api('DELETE', path),
};

// ===== AUTH GUARD =====
function requireAuth(allowedRoles) {
    const token = getToken();
    const role = getRole();
    if (!token) { window.location.href = 'login.html'; return false; }
    if (allowedRoles && !allowedRoles.includes(role)) {
        window.location.href = role === 'STAFF' ? 'staff-dashboard.html' : 'dashboard.html';
        return false;
    }
    return true;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    window.location.href = 'login.html';
}

// ===== TOAST =====
function toast(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3500);
}

// ===== MODAL =====
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ===== SIDEBAR ACTIVE =====
function setActiveNav(page) {
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.dataset.page === page);
    });
}

// ===== TOPBAR INFO =====
function initTopbar() {
    const role = getRole();
    const roleEl = document.getElementById('topbar-role');
    if (roleEl) roleEl.textContent = role || '';
}

// ===== FORMAT HELPERS =====
function fmtCurrency(n) { return '₹ ' + Number(n || 0).toLocaleString('en-IN'); }
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('en-IN') : 'N/A'; }
