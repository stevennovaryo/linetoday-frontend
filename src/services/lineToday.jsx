import http from '../utils/https'

export function serviceLineToday() {
  return http.get()
}