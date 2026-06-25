import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

export const getArticles = () => api.get('/articles')
export const createArticle = (article) => api.post('/articles', article)
export const updateArticle = (id, article) => api.put(`/articles/${id}`, article)
export const deleteArticle = (id) => api.delete(`/articles/${id}`)
