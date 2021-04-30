import axios from 'axios'
import { Ballot, Choice, Poll } from '@/types'

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
  deletePoll(pollId: string) {
    return apiClient.delete('/poll/' + pollId + '/')
  },
  getChoices(poll: Poll) {
    return apiClient.get('/poll/' + poll.id + '/choices/')
  },
  saveChoice(poll: Poll, choice: Choice) {
    return apiClient.put(
      '/poll/' + poll.id + '/choice/' + choice.id + '/',
      choice
    )
  },
  getBallots(poll: Poll) {
    return apiClient.get('/poll/' + poll.id + '/ballots/')
  },
  saveBallot(poll: Poll, ballot: Ballot) {
    // Save ballot choices as comma-separated string
    let choicesString = ''
    if (ballot.choices.length > 0) {
      choicesString = ballot.choices[0].id
    }
    for (let i = 1; i < ballot.choices.length; i++) {
      choicesString += ',' + ballot.choices[i].id
    }
    return apiClient.put(
      '/poll/' + poll.id + '/ballot/' + ballot.voterId + '/',
      { choices: choicesString }
    )
  }
}
