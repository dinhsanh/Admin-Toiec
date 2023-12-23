import API_BASE from "../config";
import API from "../instance";

export function getAllVocabulariesbyCategoryPage(endpoint) {
   return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}
export function getAllVocabularies(endpoint) {
   return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}
export function postVocabularybyCategoryDto(endpoint, body) {
   return API.post(`${API_BASE.apiUrl}/${endpoint}`, body)
}
//Account
export function getAccount(endpoint, body) {
   return API.get(`${API_BASE.apiUrl}/${endpoint}`, body)
}
//question
export function getQuestionType(endpoint) {
   return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}
//4skill
export function getpractice(endpoint) {
   return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}
//part
export function getpracticepartId(endpoint) {
   return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}
export function createpracticepart(endpoint,body) {
   return API.get(`${API_BASE.apiUrl}/${endpoint}`,body)
}
export function updatepracticepart(endpoint,body) {
   return API.put(`${API_BASE.apiUrl}/${endpoint}`,body)
}
export function deletepracticepart(endpoint) {
   return API.delete(`${API_BASE.apiUrl}/${endpoint}`)
}