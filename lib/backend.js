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

Backend.fetchTeamData = (authToken, teamAtEventId) =>
  fetch(baseUrl + `/teams/${teamAtEventId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => res.json())

Backend.postMatch = (authToken, teamId, video) => {
  const body = new FormData()
  body.append('video', {
    name: 'video',
    type: `video/${video.codec || 'mp4'}`,
    uri: video.uri
  })
  return fetch(baseUrl + `/${teamId}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    body
  })
}

export default Backend
