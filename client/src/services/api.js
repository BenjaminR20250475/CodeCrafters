import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// Add JWT token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Category ID mapping
const categoryMap = { 'Arts': 1, 'Mathematics': 2, 'Technology': 3 }
const categoryNameMap = { 1: 'Arts', 2: 'Mathematics', 3: 'Technology' }

// Type ID mapping
const typeMap = { 'Biography': 1, 'Programming': 2, 'Painting': 3, 'Theorem': 4, 'Algorithm': 5 }
const typeNameMap = { 1: 'Biography', 2: 'Programming', 3: 'Painting', 4: 'Theorem', 5: 'Algorithm' }

// Transform backend article to frontend format
const transformArticle = (data) => ({
  id: data.article_id,
  title: data.name,
  content: data.about,
  category: categoryNameMap[data.category_id] || 'Arts',
  type: typeNameMap[data.type_id] || 'Biography',
  ...data
})

export const loginUser = (email, password) =>
  api.post('/users/login', { email, password })

export const getArticlesByCategory = (categoryId) =>
  api.get(`/articles/category/${categoryId}`).then(res => ({
    ...res,
    data: Array.isArray(res.data) ? res.data.map(transformArticle) : []
  }))

export const searchArticles = (keyword) =>
  api.get('/articles/search', { params: { keyword } }).then(res => ({
    ...res,
    data: Array.isArray(res.data) ? res.data.map(transformArticle) : []
  }))

export const createArticle = (article) => api.post('/articles', article)

export const updateArticle = (id, article) => api.put(`/articles/${id}`, article)

export const deleteArticle = (id, data) => api.delete(`/articles/${id}`, { data })
