import axios from 'axios'

import config from '../config'
import Team from './team'

const baseUrl = config.apiBaseUrl
const Backend = {}

Backend.fetchTeams = authToken =>
  fetch(baseUrl + '/teams', {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(teams => teams.map(team => new Team(team)))

export default Backend
