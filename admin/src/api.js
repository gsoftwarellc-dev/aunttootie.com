// Central place for all API calls — just change BASE_URL for production
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

function getToken() {
  return localStorage.getItem('admin_token');
}

function headers(json = true) {
  const h = { Authorization: `Bearer ${getToken()}` };
  if (json) h['Content-Type'] = 'application/json';
  return h;
}

export const api = {
  // Auth
  login: (email, password) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(r => r.json()),

  // Subscribers
  getSubscribers: () =>
    fetch(`${BASE_URL}/subscribers`, { headers: headers() }).then(r => r.json()),
  deleteSubscriber: (id) =>
    fetch(`${BASE_URL}/subscribers/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json()),

  // Premium members
  getPremium: () =>
    fetch(`${BASE_URL}/premium`, { headers: headers() }).then(r => r.json()),
  updatePremiumStatus: (id, status) =>
    fetch(`${BASE_URL}/premium/${id}/status`, {
      method: 'PATCH', headers: headers(),
      body: JSON.stringify({ status }),
    }).then(r => r.json()),
  deletePremium: (id) =>
    fetch(`${BASE_URL}/premium/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json()),

  // Image upload
  uploadImage: (file) => {
    const form = new FormData();
    form.append('image', file);
    return fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: form,
    }).then(r => r.json());
  },

  // Page content
  getContent: (page) =>
    fetch(`${BASE_URL}/content/${page}`, { headers: headers() }).then(r => r.json()),
  saveContent: (page, data) =>
    fetch(`${BASE_URL}/content/${page}`, {
      method: 'PUT', headers: headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // Settings
  getSettings: () =>
    fetch(`${BASE_URL}/settings`, { headers: headers() }).then(r => r.json()),
  saveSettings: (data) =>
    fetch(`${BASE_URL}/settings`, {
      method: 'PUT', headers: headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // Categories
  getCategories: () =>
    fetch(`${BASE_URL}/categories`, { headers: headers() }).then(r => r.json()),
  createCategory: (name) =>
    fetch(`${BASE_URL}/categories`, {
      method: 'POST', headers: headers(),
      body: JSON.stringify({ name }),
    }).then(r => r.json()),
  updateCategory: (id, name) =>
    fetch(`${BASE_URL}/categories/${id}`, {
      method: 'PUT', headers: headers(),
      body: JSON.stringify({ name }),
    }).then(r => r.json()),
  deleteCategory: (id) =>
    fetch(`${BASE_URL}/categories/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json()),

  // Magazine
  getMagazinePosts: () =>
    fetch(`${BASE_URL}/magazine`, { headers: headers() }).then(r => r.json()),
  createMagazinePost: (data) =>
    fetch(`${BASE_URL}/magazine`, {
      method: 'POST', headers: headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),
  updateMagazinePost: (id, data) =>
    fetch(`${BASE_URL}/magazine/${id}`, {
      method: 'PUT', headers: headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),
  deleteMagazinePost: (id) =>
    fetch(`${BASE_URL}/magazine/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json()),

  // Recipes
  getRecipes: () =>
    fetch(`${BASE_URL}/recipes`, { headers: headers() }).then(r => r.json()),
  createRecipe: (data) =>
    fetch(`${BASE_URL}/recipes`, {
      method: 'POST', headers: headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),
  updateRecipe: (id, data) =>
    fetch(`${BASE_URL}/recipes/${id}`, {
      method: 'PUT', headers: headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),
  deleteRecipe: (id) =>
    fetch(`${BASE_URL}/recipes/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json()),
};
