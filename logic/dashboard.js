import axios from 'axios'

import config from '../config'
import Team from './team'

const Dashboard = { }

Dashboard.loadTeams = authId => {
  return axios({
    url: config.dashboardUrl,
    method: 'get',
    headers: { 'Authorization': `Bearer ${authId}` }
  }).then(({ data }) => {
  	return data.map(teamJson => new Team(teamJson))
  })
}

export default Dashboard