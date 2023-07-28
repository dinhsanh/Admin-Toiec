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