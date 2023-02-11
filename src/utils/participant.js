const getParticipantId = () => {
  const participantId = typeof localStorage !== 'undefined' && localStorage.getItem('participantId')
  if (participantId) {
    return participantId
  }
  
  const newParticipantId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  typeof localStorage !== 'undefined' && localStorage.setItem('participantId', newParticipantId)
  return newParticipantId
}

const setParticipantId = (id) => {
  typeof localStorage !== 'undefined' && localStorage.setItem('participantId', id)
}

export {
  getParticipantId,
  setParticipantId,
}
