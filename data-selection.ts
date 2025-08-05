type Session = { user: number; duration: number; equipment: Array<string> }
type Options = {
  user?: number
  minDuration?: number
  equipment?: Array<string>
  merge?: boolean
}

function mergeSessions(sessions: Session[]): Session[] {
  const map = new Map<Session['user'], Session>()

  sessions.forEach((session) => {
    if (!map.has(session.user)) {
      map.set(session.user, session)
    } else {
      const existed = map.get(session.user) as Session
      const merged: Session = {
        user: session.user,
        duration: existed.duration + session.duration,
        equipment: Array.from(new Set([...session.equipment, ...existed.equipment])).sort(),
      }

      map.delete(session.user)
      map.set(session.user, merged)
    }
  })

  return Array.from(map.values())
}

export default function selectData(source: Array<Session>, options?: Options): Array<Session> {
  if (!options) return source

  const { user, minDuration, equipment, merge } = options ?? {}
  const sessions = merge ? mergeSessions(source) : source

  if (Object.keys(options).length === 1 && merge) {
    return sessions
  }

  const result: Session[] = []

  sessions.forEach((session) => {
    const satisfied: Partial<Record<Exclude<keyof Options, 'merge'>, boolean>> = {}

    if (user !== undefined) {
      satisfied.user = user === session.user
    }
    if (minDuration !== undefined) {
      satisfied.minDuration = minDuration <= session.duration
    }
    if (equipment !== undefined) {
      const sessionEquipment = new Set(session.equipment)

      satisfied.equipment = equipment.some((name) => sessionEquipment.has(name))
    }

    if (Object.values(satisfied).every(Boolean)) {
      result.push(session)
    }
  })

  return result
}
