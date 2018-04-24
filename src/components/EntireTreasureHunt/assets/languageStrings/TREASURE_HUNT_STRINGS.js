const LANGUAGE_STRINGS = {
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
      'Lundakarnevalen anordnar en skattjakt där deltagarna letar sig igenom Lund för att hitta den hemliga plats där Sture gömt sig.\n\nDe 25 första får ett pris!',
    EN:
      'Lundakarnevalen arranges a treasure hunt where the contestans compete to find Sture, who is hiding at a the (top) secret location.\n\nThe first 25 to find him will recieve a special prize!'
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
    SE: 'När du kommit nära Sture får du en QR-kod att visa honom!',
    EN: 'When you get close to Sture, you will get a QR code to show him!'
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
    SE: 'Visa denna för Sture',
    EN: 'Show this to Sture'
  },
  goBack: {
    SE: 'Tillbaka',
    EN: 'Take me back'
  },
  instructions: {
    SE: 'Rotera mobilen för att hitta rätt!',
    EN: 'Rotate your phone to find your way!'
  },
  getQR: {
    SE: 'Tryck här när du hittat Sture!',
    EN: 'Press here when you find Sture!'
  },
  far: {
    SE: 'Sture är långt bort...',
    EN: 'Sture is far away...'
  },
  medium: {
    SE: 'Sture är närmre men fortfarande en bit bort.',
    EN: 'Sture is closer but still far away.'
  },
  close: {
    SE: 'Du är nära',
    EN: 'You are close'
  },
  veryClose: {
    SE: 'Nästan där!!',
    EN: 'Almost there!!'
  },
}

const getStrings = language => {
  const fields = Object.keys(LANGUAGE_STRINGS)
  const strings = {}
  fields.forEach(
    field => (strings[field] = LANGUAGE_STRINGS[field][language])
  )
  return strings
}

module.exports = {LANGUAGE_STRINGS, getStrings}
