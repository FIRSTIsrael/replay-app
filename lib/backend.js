import config from '../config'
import Team from './team'

const baseUrl = config.apiBaseUrl
const Backend = {}

const parseJSONResponse = async res => {
  let json = {}
  try {
    json = await res.json()
  } catch (error) {
    throw 'http-error'
  }

  if (!res.ok) {
    throw typeof json?.error === 'string' ? json.error : 'http-error'
  } else {
    return json
  }
}

Backend.fetchTeams = authToken =>
  fetch(baseUrl + '/teams', {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(parseJSONResponse)
    .then(teams => teams.map(team => new Team(team)))

Backend.fetchTeamData = (authToken, teamAtEventId) =>
  fetch(baseUrl + `/teams/${teamAtEventId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }).then(parseJSONResponse)

Backend.postMatch = (authToken, matchId, teamAtEventId, video) => {
  const body = new FormData()
  body.append('video', {
    name: matchId,
    type: `video/${video.codec || 'mp4'}`,
    uri: video.uri
  })
  return fetch(baseUrl + `/teams/${teamAtEventId}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    body
  }).then(parseJSONResponse)
}

export default Backend
