export const calendarObject = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd DD MMMM',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd DD MMMM',
  sameElse: 'dddd DD MMMM'
}

export function fromCarerNameToId(name, carersArray) {
  const carer = carersArray.find(carer => {
    if(carer.name == name){
      return carer.id
    }
  })
  return carer
}
