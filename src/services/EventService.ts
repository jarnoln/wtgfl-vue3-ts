import axios from 'axios'
import { Choice, Poll } from '@/types'

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
    return apiClient.get('/polls/')
  },
  savePoll(poll: Poll) {
    return apiClient.put('/poll/' + poll.id + '/', poll)
  },
  getChoices(poll: Poll) {
    return apiClient.get('/poll/' + poll.id + '/choices/')
  },
  saveChoice(poll: Poll, choice: Choice) {
    return apiClient.put('/poll/' + poll.id + '/choice/' + choice.id + '/', choice)
  }
}
