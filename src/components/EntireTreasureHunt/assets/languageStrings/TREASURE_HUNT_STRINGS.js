export const LANGUAGE_STRINGS = {
  treasureHunt: {
    SE: 'Skattjakt',
    EN: 'Treasure Hunt'
  },
  startButton: {
    SE: 'Jag förstår, nu kör vi!',
    EN: 'I got it, let\'s GO!'
  },
  timeLeft: {
    SE: 'TID KVAR',
    EN: 'TIME LEFT'
  },
  firstHeader: {
    SE: 'Välkommen till vår skattjakt!',
    EN: 'Welcome to our treasure hunt! '
  },
  firstBody: {
    SE:
      'Leta er igenom Lund för att hitta var Stina gömt sig!\n\nDe 10 första vinner ett fantastiskt ett pris!',
    EN:
      'Find your way through Lund to find where Stina has hidden!\n\nThe first 10 to find him will recieve a special prize!'
  },
  secondHeader: {
    SE: 'Hur kommer det gå till?',
    EN: 'How will it work?'
  },
  secondBody: {
    SE:
      'Se till att du har igång GPS, vrid sen din mobil i olika riktningar och lägg märke till när den vibrerar. Detta betyder att den hemliga platsen är åt det hållet!',
    EN:
      'Ensure your location sensor is on, then turn your phone various directions and notice when it vibrates. That means the secret location is that way!'
  },
  thirdHeader: {
    SE: 'Och sen då?',
    EN: 'And then what?'
  },
  thirdBody: {
    SE: 'När du kommit nära Stina får du en QR-kod att visa henne!',
    EN: 'When you get close to Stine, you will get a QR code to show her!'
  },
  nextButton: {
    SE: 'Ge mig mer info!',
    EN: 'Tell me more!'
  },
  finishedText: {
    SE: 'Skattjakten är nu över',
    EN: 'The treasure hunt has ended'
  },
  showSture: {
    SE: 'Visa denna för Stina',
    EN: 'Show this to Stina'
  },
  goBack: {
    SE: 'Tillbaka',
    EN: 'Take me back'
  },
  instructions: {
    SE: 'Rotera mobilen för att hitta rätt!',
    EN: 'Rotate your phone to find the way!'
  },
  getQR: {
    SE: 'Tryck här när du hittat Stina!',
    EN: 'Press here when you find Stina!'
  },
  far: {
    SE: 'Stina är långt bort...',
    EN: 'Stina is far away...'
  },
  medium: {
    SE: 'Stina är närmre men fortfarande en bit bort.',
    EN: 'Stina is closer but still far away.'
  },
  close: {
    SE: 'Du är nära',
    EN: 'You are close'
  },
  veryClose: {
    SE: 'Nästan där!!',
    EN: 'Almost there!!'
  },
  secretEvent: {
    SE: 'Här kommer du hitta Lundakarnevalens nästa (TOPPHEMLIGA) äventyr!\nSe till att ha ett fullt batteri!',
    EN: 'Here you will find Lundakarnevalens next (TOP SECRET) adventure!\nMake sure you have a full battery!'
  },
  secretHeader: {
    SE: '???',
    EN: '????'
  },
  endedEvent: {
    SE: 'Skattjakten är nu över. Tack till er som deltog!',
    EN: 'The treasure hunt has ended. Thanks for participating!'
  },
  almostThere: {
    SE: 'Nästan där..',
    EN: 'Almost there..'
  }
}

export const getStrings = language => {
  const fields = Object.keys(LANGUAGE_STRINGS)
  const strings = {}
  fields.forEach(
    field => (strings[field] = LANGUAGE_STRINGS[field][language])
  )
  return strings
}
