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

Backend.postMatch = (authToken, teamId, body) =>
  fetch(baseUrl + `/${teamId}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    body
  })

export default Backend
