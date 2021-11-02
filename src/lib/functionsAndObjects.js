export const calendarObject = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd DD MMMM',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd DD MMMM',
  sameElse: 'dddd DD MMMM'
}

export const timeframes = [
  {
    name: "morning",
  },
  {
    name: "afternoon",
  },
  {
    name: "evening",
  },
  {
    name: "overnight",
  },
  {
    name: "general/unknown",
  },
]

export const stayTypes = [
  {
    name: "quick check",
  },
  {
    name: "extended stay",
  }
]

export function fromCarerNameToId(name, carersArray) {
  const carer = carersArray.find(carer => {
    if(carer.name === name){
      return carer.id
    }
  })
  return carer
}

export function orderSlotsByTimeframe (slotsArray){
  if(slotsArray.length > 0){
    const timeframePriority = ["general/unknown", "morning", "afternoon", "evening", "overnight"]
    slotsArray.sort((a, b) => timeframePriority.indexOf(a.timeframe) - timeframePriority.indexOf(b.timeframe))
    return slotsArray    
  }
}