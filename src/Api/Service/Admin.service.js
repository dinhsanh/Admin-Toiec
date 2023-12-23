import API_BASE from "../config";
import API from "../instance";
// Topic
export function createCategory(endpoint, body) {
   return API.post(`${API_BASE.apiUrl}/${endpoint}`, body)
}
export function deleteCategory(endpoint) {
   return API.delete(`${API_BASE.apiUrl}/${endpoint}`)
}
export function putCategory(endpoint,body) {
   return API.put(`${API_BASE.apiUrl}/${endpoint}`, body)
}  
// All
export function updateVocabulary(endpoint,body) {
   return API.put(`${API_BASE.apiUrl}/${endpoint}`, body)
}  
export function createVocabulary(endpoint, body) {
   return API.post(`${API_BASE.apiUrl}/${endpoint}`, body)
}
export function deleteVocabulary(endpoint) {
   return API.delete(`${API_BASE.apiUrl}/${endpoint}`)
}
