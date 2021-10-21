export const calendarObject = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd DD MMMM',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd DD MMMM',
  sameElse: 'dddd DD MMMM'
}

export function fromCarerNameToId(name, carers) {
  const carer = carers && carers.find(carer => 
    carer.name == name
  )
  return carer.id.toString()
}

export function fromCarerIdToName(id, carers) {
  console.log("carers", carers)
  const carer = carers && carers.find(carer => 
    carer.id == id
  )
  return carer.name
}