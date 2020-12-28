import { Dimensions, AsyncStorage } from 'react-native'

import { TEAM_CONFIG } from '../config'

class Team {
  constructor(data) {
    Object.assign(this, data)
  }

  valid() {
    return TEAM_CONFIG.REQUIRED_FIELDS.every(field => this.hasOwnProperty(field) && (typeof this[field] !== 'undefined'))
  }

  async save() {
    return await AsyncStorage.multiSet([
       ['teamNumber', this.team.number],
       ['teamName', this.team.name],
       ['teamOrganization',this.team.organization],
       ['teamCity', this.team.city],
       ['teamVideoUrl', this['upload-url']]
      ])
  }

  static async loadFromMemory() {
    const entries = await AsyncStorage.multiGet(TEAM_CONFIG.STORAGE_FIELDS)
    return new Team(entries.reduce((data, [key, value]) => Object.assign(data, { [key]: value }), { }))
  }

  static async delete () {
    return await AsyncStorage.multiRemove(TEAM_CONFIG.STORAGE_FIELDS)
  }
}

export async function login (rawJson) {
  try {
    const json = JSON.parse(rawJson)
    const team = new Team(json)
    if (team.valid()) {
      await team.save()
    } else {
      throw new Error('Invalid team')
    }
  } catch (error) {
  throw new Error('Illegal team data format')
  }
}

export async function load () {
  const team = await Team.loadFromMemory()
  if (team.valid()) {
  	return team
  } else {
  	return undefined
  }
}

export async function logout () {
  return await Team.delete()
}

export async function loggedIn () {
  return Boolean(await load())
}
