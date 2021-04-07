import axios from 'axios'
import { Poll } from '@/types'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPolls() {
    return apiClient.get('/polls')
  },
  savePoll(poll: Poll) {
    return apiClient.put('/poll/' + poll.id + '/', poll)
  }
}
