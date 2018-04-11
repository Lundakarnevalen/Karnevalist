const loading = {
  SE: 'LADDAR ',
  EN: 'LOADING '
};
const password = {
  SE: 'Lösenord',
  EN: 'Password'
};
const shirtSize = {
  SE: 'Välj tröjstorlek',
  EN: 'Choose shirt size'
};
const expiredTokenTitle = {
  SE: 'Sessionen har förfallit',
  EN: 'Session Expired'
};
const expiredTokenMessage = {
  SE:
    'Din session har tagit slut var vänlig logga in igen om du vill fortsätta',
  EN: 'Your session has expired please log in again to continue'
};
const studentNation = {
  SE: 'Välj nation',
  EN: 'Choose your student nation'
};
const driversLicense = {
  SE: 'Välj körkortstyp',
  EN: "Choose type of driver's license"
};
const errorMsg400 = {
  SE: 'Fel mail eller lösenord',
  EN: 'Wrong email or password'
};
const errorMsg401 = {
  SE: 'Fel mail eller lösenord',
  EN: 'Wrong email or password'
};
const errorMsg404 = {
  SE: 'Något gick fel...',
  EN: 'Something went wrong...'
};
const errorMsg409EmailAndPersonalNumber = {
  SE: 'Mail och personnummer är redan i bruk',
  EN: 'Email and social security number is already in use'
};
const errorMsg409Email = {
  SE: 'Mail är redan i bruk',
  EN: 'Email is already in use'
};
const errorMsg409PersonalNumber = {
  SE: 'Personnummer är redan i bruk',
  EN: 'Social security number is already in use'
};
const errorMsgInternal = {
  SE: 'Internt fel, var god försök igen senare',
  EN: 'Internal error, please try again later'
};
const error = {
  SE: 'Fel',
  EN: 'Error'
};
const firstName = {
  SE: 'Förnamn',
  EN: 'First name'
};
const lastName = {
  SE: 'Efternamn',
  EN: 'Last name'
};
const socialSecurityNumber = {
  SE: 'Personnummer',
  EN: 'Social security number'
};
const email = {
  SE: 'Mail',
  EN: 'Email'
};
const address = {
  SE: 'Adress',
  EN: 'Address'
};
const postNumber = {
  SE: 'Postnummer',
  EN: 'Postal code'
};
const city = {
  SE: 'Stad',
  EN: 'City'
};
const phoneNumber = {
  SE: 'Telefonnummer',
  EN: 'Phone number'
};
const foodPreference = {
  SE: 'Matpreferenser',
  EN: 'Food preferences'
};
const cancel = {
  SE: 'Avbryt',
  EN: 'Cancel'
};
const ok = {
  SE: 'OK',
  EN: 'OK'
};

const profile = {
  SE: 'Min Profil',
  EN: 'My Profile'
};
const registration = {
  SE: 'Min Registrering',
  EN: 'My Registration'
};

const alertHeader = {
  SE: 'Bekräfta',
  EN: 'Confirm'
};

const yes = {
  SE: 'JA',
  EN: 'YES'
};

const no = {
  SE: 'NEJ',
  EN: 'NO'
};

export const LOGIN_SCREEN_STRINGS = {
  fields: [
    'email',
    'password',
    'loginButton',
    'languageButton',
    'forgotPassword',
    'createProfile',
    'readMore',
    'emailError',
    'passwordError',
    'error',
    'errorMsg400',
    'errorMsg401',
    'errorMsg404',
    'errorMsgInternal',
    'passwordPopupHeader',
    'passwordPopupInfo',
    'ok',
    'cancel',
    'resetPassword',
    'responseFail',
    'responseSuccess',
    'resetPasswordComplete'
  ],
  email: {
    SE: 'Mailadress',
    EN: 'Email Address'
  },
  resetPasswordComplete: {
    SE: 'Ett mail har skickats med information om hur du byter lösenord.',
    EN:
      'An email has been sent with information about how to reset your password.'
  },
  password,
  loginButton: {
    SE: 'Logga in',
    EN: 'Log in'
  },
  languageButton: {
    SE: 'Change to English',
    EN: 'Ändra till svenska'
  },
  forgotPassword: {
    SE: 'Glömt ditt lösenord?',
    EN: 'Forgotten your password?'
  },
  createProfile: {
    SE: 'Skapa din profil',
    EN: 'Create your profile'
  },
  readMore: {
    SE: 'Läs mer om registreringen',
    EN: 'Read more about the registration'
  },
  emailError: {
    SE: 'Mail-fältet måste fyllas i',
    EN: 'The email field is required'
  },
  passwordError: {
    SE: 'Lösenord-fältet måste fyllas i',
    EN: 'The password field is required'
  },
  error,
  errorMsg400,
  errorMsg401,
  errorMsg404,
  errorMsgInternal,
  passwordPopupHeader: {
    SE: 'Glömt ditt lösenord?',
    EN: 'Forgotten your password?'
  },
  passwordPopupInfo: {
    SE: 'Var god fyll i din mailadress så skickas ett nytt lösenord till dig',
    EN: 'Please fill in your email address below to receive a new password'
  },
  cancel: {
    SE: 'Avbryt',
    EN: 'Cancel'
  },
  ok,
  resetPassword: {
    SE: 'Återställ lösenord',
    EN: 'Reset password'
  },
  responseFail: {
    SE: 'Var god ange en giltig mailadress',
    EN: 'Please enter a valid email address'
  },
  responseSuccess: {
    SE: 'Tack, kolla din inkorg för ditt nya lösenord',
    EN: 'Thank you, check your inbox for your new password'
  }
};

export const REGISTRATION_SCREEN_STRINGS = {
  fields: [
    'header',
    'firstName',
    'lastName',
    'socialSecurityNumber',
    'email',
    'confirmEmail',
    'password',
    'confirmPassword',
    'address',
    'postNumber',
    'city',
    'phoneNumber',
    'foodPreference',
    'shirtSize',
    'shirtSizeArray',
    'studentNation',
    'studentNationArray',
    'activeKarneval',
    'driversLicense',
    'driversLicenseArray',
    'auditionSmallSceneHeader',
    'auditionBigSceneHeader',
    'auditionCheckboxes',
    'checkBoxNames',
    'checkBoxesHeader',
    'checkBoxesHeaderToLearn',
    'register',
    'error',
    'errorMsg400',
    'errorMsg401',
    'errorMsg404',
    'errorMsgInternal',
    'ok',
    'co',
    'other',
    'plenipotentiary',
    'yearStudyStart',
    'previousInvolvement',
    'corps',
    'bff',
    'bffInfo',
    'smallPleasuresHeader',
    'bigPleasuresHeader',
    'smallPleasuresInfo',
    'bigPleasuresInfo',
    'groupLeader',
    'gdpr1',
    'gdpr2',
    'gdpr3',
    'gdpr4',
    'corpsArray',
    'errorMsg409EmailAndPersonalNumber',
    'errorMsg409Email',
    'errorMsg409PersonalNumber',
    'cancel',
    'confirmRegister',
    'alertHeader'
  ],
  header: {
    SE: 'Skapa profil',
    EN: 'Create Profile'
  },
  firstName,
  lastName,
  socialSecurityNumber,
  email,
  co: {
    SE: 'C/O',
    EN: 'C/O'
  },
  corps: {
    SE: 'Studentkår',
    EN: 'Student union'
  },
  confirmEmail: {
    SE: 'Bekräfta mail',
    EN: 'Confirm email'
  },
  password,
  confirmPassword: {
    SE: 'Bekräfta lösenord',
    EN: 'Confirm password'
  },
  address,
  postNumber,
  city,
  phoneNumber,
  foodPreference,
  previousInvolvement: {
    SE: 'Tidigare studentengagemang',
    EN: 'Previous student involvement'
  },
  checkBoxesHeader: {
    SE: 'Jag har erfarenhet av:',
    EN: 'I have experience in:'
  },
  checkBoxesHeaderToLearn: {
    SE: 'Jag vill lära mig om:',
    EN: 'I want to learn:'
  },
  driversLicense,
  driversLicenseArray: {
    SE: ['Jag har inget körkort', 'B', 'C', 'D', 'BE', 'CE', 'DE'],
    EN: ["I do not have a driver's license", 'B', 'C', 'D', 'BE', 'CE', 'DE']
  },
  shirtSize,
  shirtSizeArray: {
    SE: ['Small', 'Medium', 'Large', 'X-Large'],
    EN: ['Small', 'Medium', 'Large', 'X-Large']
  },
  studentNation,
  studentNationArray: {
    SE: [
      'Blekingska Nation',
      'Göteborgs Nation',
      'Hallands Nation',
      'Helsingkrona Nation',
      'Kalmar Nation',
      'Kristianstads Nation',
      'Lunds Nation',
      'Malmö Nation',
      'Sydskånska Nation',
      'Västgöta Nation',
      'Wermlands Nation',
      'Östgöta Nation'
    ],
    EN: [
      'Blekingska Nation',
      'Göteborgs Nation',
      'Hallands Nation',
      'Helsingkrona Nation',
      'Kalmar Nation',
      'Kristianstads Nation',
      'Lunds Nation',
      'Malmö Nation',
      'Sydskånska Nation',
      'Västgöta Nation',
      'Wermlands Nation',
      'Östgöta Nation'
    ]
  },
  activeKarneval: {
    SE: 'Jag var aktiv under karnevalen 2014',
    EN: 'I was active during the karneval 2014'
  },
  register: {
    SE: 'Registrera',
    EN: 'Register'
  },
  error,
  errorMsg400: {
    SE: 'Ogiltig mailadress eller lösenord',
    EN: 'Invalid email address or password'
  },
  errorMsg401: {
    SE: 'Ogiltig mailadress eller lösenord',
    EN: 'Invalid email address or password'
  },
  errorMsg404,
  errorMsg409EmailAndPersonalNumber,
  errorMsg409Email,
  errorMsg409PersonalNumber,
  errorMsgInternal,
  cancel,
  ok,
  confirmRegister: {
    SE:
      'Du kan endast ändra dina uppgifter via karnevalist.se efter att du har registrerat dig',
    EN:
      'You can only change your information from karnevalist.se after you have registered'
  },
  alertHeader,
  other: {
    SE: 'Övrigt',
    EN: 'Other'
  },
  plenipotentiary: {
    SE: 'Jag har ett fullmaktsombud',
    EN: 'There is a power of attorney for me'
  },
  corpsArray: {
    SE: [
      'Corpus Medicum',
      'Humanistiska och teologiska studentkåren',
      'Juridiska Föreningen',
      'LundaEkonomerna',
      'Lunds Naturvetarkår',
      'Samhällsvetarkåren',
      'Studentkåren vid Konstnärliga fakulteten i Malmö',
      'TLTH',
      'Lunds Doktorandkår',
      'Malmös Studentkår'
    ],
    EN: [
      'Corpus Medicum',
      'Humanistiska och teologiska studentkåren',
      'Juridiska Föreningen',
      'LundaEkonomerna',
      'Lunds Naturvetarkår',
      'Samhällsvetarkåren',
      'Studentkåren vid Konstnärliga fakulteten i Malmö',
      'TLTH',
      'Lunds Doktorandkår',
      'Malmös Studentkår'
    ]
  },
  yearStudyStart: {
    SE: 'Jag började studera år',
    EN: 'Year of study start'
  },
  bff: {
    SE: 'Karnekompis',
    EN: 'BFF'
  },
  bffInfo: {
    SE:
      'En karnekompis är någon som du vill jobba med under eller i föreberedelserna till Lundakarnevalen. Skriv in din karnekompis mail i fältet! OBS, det finns ingen garanti för att du kommer tillsammans med din karnekompis.',
    EN:
      "A BFF is someone you wish to work with during or in the preparation for Lundakarnevalen. Enter your BFF's email in the field. There are no guarantee that you will end up with your BFF."
  },
  smallPleasuresHeader: {
    SE: 'Audition (Små nöjen)',
    EN: 'Audition (Small Pleasures)'
  },
  bigPleasuresHeader: {
    SE: 'Audition (Stora nöjen)',
    EN: 'Audition (Big Pleasures)'
  },
  smallPleasuresInfo: {
    SE:
      'Vill du gå på audition för något av våra små nöjen? Klicka i vad du skulle vilja gå på audition för.',
    EN:
      'Do you want to audition for any of our small pleasures? Click the checkboxes of the ones you want to audition for.'
  },
  bigPleasuresInfo: {
    SE:
      'Vill du gå på audition för något av våra stora nöjen? Klicka i vad du skulle vilja gå på audition för.',
    EN:
      'Do you want to audition for any of our big pleasures? Click the checkboxes of the ones you want to audition for.'
  },
  groupLeader: {
    SE: 'Jag vill vara gruppledare',
    EN: 'I want to be group leader'
  },
  auditionSmallSceneHeader: {
    SE: 'Audition (Små nöjen): ',
    EN: 'Audition (Small Pleasures): '
  },
  auditionBigSceneHeader: {
    SE: 'Audition (Stora nöjen): ',
    EN: 'Audition (Big Pleasures): '
  },
  auditionCheckboxes: {
    SE: ['Scen', 'Orkester', 'Dans'],
    EN: ['Scene', 'Orchestra', 'Dance']
  },
  checkBoxNames: {
    SE: [
      'Logistik',
      'Administration',
      'Spexa',
      'Peppa & Tagga',
      'Laga mat',
      'Bar',
      'Teknik- Ljud & Ljus',
      'Redigera Foto/Film/Animeringar',
      'Programmering & Nätverk',
      'Bygga & Snickra',
      'Design',
      'Sy',
      'Ekonomi',
      'Kommunikation',
      'Serviceinriktad',
      'Säkerhet',
      'Alltiallo'
    ],
    EN: [
      'Logistics',
      'Administration',
      'Spex',
      'Cheer',
      'Cook food',
      'Bar',
      'Lights & sound',
      'Editing - photos/movie/animation',
      'Programming & Networks',
      'Construction',
      'Design',
      'Sew',
      'Economics',
      'Communication',
      'Service',
      'Safety',
      'Allround'
    ]
  },
  gdpr1: {
    SE:
      'Jag är medveten om och godkänner att Lundakarnevalen samlar in mina personuppgifter för att:' +
      ' kontrollera mitt Studentlundsmedlemsskap, registrera mig i Folkuniversitetets Studiecirklar' +
      ' (för att kunna söka bidrag till Lundakarnevalens verksamheter kan studiecirklar förekomma, detta kommer att informeras om i respektive sektion)' +
      ' samt användas tillsammans med Lundakarnevalens samarbetsorganisation ung media.',
    EN:
      'I am aware of and allow the use of my personal information by Lundakarnevalen to: Control my membership in Studentlund, ' +
      'register me for study circles at Folkuniversitetet (to be able to get benefits for the activities organized by Lundakarnevalen study circles might occur, the section will provide information about this)' +
      ' and to be used together with ung media, a cooperation organization of Lundakarnevalen.'
  },
  gdpr2: {
    SE:
      'Jag är medveten om att Lundakarnevalen kommer att fota/filma och att jag kan förekomma i Lundakarnevalens bilder.' +
      ' Jag godkänner att Lundakarnevalen använder sådant foto och film på Facebook, Instagram, Youtube och i karnevalsboxen.',
    EN:
      'I am aware that Lundakarnevalen will take pictures/movies and that I can appear in these. I allow Lundakarnevalen to' +
      ' use these pictures and movies on Facebook, Instagram, Youtube and in karnevalsboxen.'
  },
  gdpr3: {
    SE:
      'Jag är medveten om och godkänner att mina kontaktuppgifter behövs under hela år 2018.',
    EN:
      'I am aware of and allow the use of my contact information during the whole year of 2018.'
  },
  gdpr4: {
    SE:
      'Om jag accepterar en post med mer ansvar godkänner jag att mina kontaktuppgifter sparas till nästa Lundakarneval,' +
      ' för att göra en överlämning till en efterträdare.',
    EN:
      'If I accept a post with more responsibility I allow my contact information to be saved until the next Lundakarneval,' +
      ' to make a handover to a successor.'
  }
};

export const REGISTRATION_INFO_SCREEN_STRINGS = {
  fields: [
    'title',
    'header',
    'panelTitle1',
    'panelTitle2',
    'panelTitle3',
    'infoText1',
    'infoText2',
    'infoText3',
    'buttonText'
  ],
  title: {
    SE: 'Om registreringen',
    EN: 'About the Registration'
  },
  header: {
    SE: '3 enkla steg för att bli Karnevalist',
    EN: '3 simple steps to become a Karnevalist'
  },
  panelTitle1: {
    SE: 'Skapa en profil',
    EN: 'Create a profile'
  },
  panelTitle2: {
    SE: 'Kom på uppropet och välj dina sektioner',
    EN: 'Come to the call and choose your sections'
  },
  panelTitle3: {
    SE: 'Skicka din ansökan',
    EN: 'Send your application'
  },
  infoText1: {
    SE:
      'Första steget är att skapa en profil, antingen här eller på Karnevalist.se.' +
      ' När du skapat en profil tilldelas du ett profil-ID som' +
      ' du använder vid incheckning under uppropsdagen.',
    EN:
      'The first step is to create a profile, either here or at Karnevalist.se.' +
      ' When you have created a profile, you are assigned a profile ID that you use' +
      ' when checking in during the call day.'
  },
  infoText2: {
    SE: 'Välj vilka sektioner du vill vara delaktig i under karnevalen.',
    EN: 'Choose which sections you want to participate in during the carnival.'
  },
  infoText3: {
    SE: 'Skicka in din ansökan och vänta på svar.',
    EN: 'Submit your application and wait for an answer.'
  },
  buttonText: {
    SE: 'Jag förstår',
    EN: 'I understand'
  }
};

export const SECTION_SCREEN_STRINGS = {
  fields: ['title', 'refresh', 'popoverText', 'headerTitle'],
  title: {
    SE: 'Sektioner',
    EN: 'Sections'
  },
  popoverText: {
    SE: 'Här skickar du in dina val',
    EN: 'Submit your choices here'
  },
  refresh: {
    SE: 'Dra ner för att uppdatera',
    EN: 'Pull down to refresh'
  },
  headerTitle: {
    SE: 'Sektionsinfo',
    EN: 'Section Info'
  }
};

export const NEWS_SCREEN_STRINGS = {
  fields: ['title'],
  title: {
    SE: 'Nyheter',
    EN: 'News'
  }
};

export const KARNESKOJ_SCREEN_STRINGS = {
  fields: ['title', 'KarneJodel', 'Eldoradio', 'Songbook'],
  title: {
    SE: 'Karneskoj',
    EN: 'Karnefun'
  },
  KarneJodel: {
    SE: 'KarneJodel',
    EN: 'KarneJodel'
  },
  Eldoradio: {
    SE: 'EldoRadio',
    EN: 'EldoRadio'
  },
  Songbook: {
    SE: 'Sångbok',
    EN: 'Songbook'
  },
};

export const HOME_SCREEN_STRINGS = {
  fields: [
    'title',
    'createProfile',
    'Karnevalist',
    'RightNow',
    'CheckIn',
    'ChooseSections',
    'info',
    'SendIn',
    'popoverText',
    'step1',
    'step2',
    'step3',
    'step4',
    'CheckInInformation',
    'ok'
  ],
  title: {
    SE: 'Hem',
    EN: 'Home'
  },
  createProfile: {
    SE: 'Skapa profil',
    EN: 'Create a profile'
  },
  ok,
  RightNow: {
    SE: 'Du är just nu',
    EN: 'You are now'
  },
  Karnevalist: {
    SE: 'Karnevalist',
    EN: 'Karnevalist'
  },
  CheckIn: {
    SE: 'Checka in på uppropsdagen längst fram i kön.',
    EN: 'Check in on call day at the head of the queue.'
  },
  ChooseSections: {
    SE: 'Välj minst 5 sektioner',
    EN: 'Choose at least 5 sections'
  },
  info: {
    SE: 'Check in sker den 4 februari.',
    EN: 'Check in happens February the 4th.'
  },
  SendIn: {
    SE: 'Skicka in dina val',
    EN: 'Submit your choices'
  },
  popoverText: {
    SE: 'Här väljer du dina sektioner',
    EN: 'Select your sections here'
  },
  step1: {
    SE: 'Steg 1',
    EN: 'Step 1'
  },
  step2: {
    SE: 'Steg 2',
    EN: 'Step 2'
  },
  step3: {
    SE: 'Steg 3',
    EN: 'Step 3'
  },
  step4: {
    SE: 'Steg 4',
    EN: 'Step 4'
  },
  CheckInInformation: {
    SE:
      'Du kommer kunna checka in när du är längst fram i kön. Fram tills dess kan du välja sektioner men det kommer inte synas här på första sidan.',
    EN:
      'You will be able to check in when you are first in line. Until then you can choose sections but it will not be shown here on the home screen.'
  }
};

export const SETTINGS_SCREEN_STRINGS = {
  fields: [
    'title',
    'changeLanguage',
    'profile',
    'registration',
    'sections',
    'logout',
    'cancel',
    'ok',
    'alertHeader',
    'alertMessage'
  ],
  title: {
    SE: 'Inställningar',
    EN: 'Settings'
  },
  changeLanguage: {
    SE: 'Byt språk',
    EN: 'Change language'
  },
  profile,
  registration,
  logout: {
    SE: 'Logga ut',
    EN: 'Logout'
  },
  sections: {
    SE: 'Sektioner',
    EN: 'Sections'
  },
  cancel,
  ok,
  alertHeader: {
    SE: 'Bekräfta',
    EN: 'Confirm'
  },
  alertMessage: {
    SE: 'Du loggas nu ut',
    EN: 'You will now be logged out'
  }
};

export const SECTION_ITEM_SCREEN_STRINGS = {
  fields: ['messageStart', 'messageEndAdd', 'messageEndRemove'],
  messageStart: {
    SE: 'Sektion: "',
    EN: 'Section: "'
  },
  messageEndAdd: {
    SE: '" tillagd',
    EN: '" added'
  },
  messageEndRemove: {
    SE: '" borttagen',
    EN: '" removed'
  }
};

export const SONGBOOK_SCREEN_STRINGS = {
  fields: ['title', 'headerTitle', 'search', 'searchPopover'],
  title: {
    SE: 'Sångbok',
    EN: 'Song Book'
  },
  headerTitle: {
    SE: 'Sångtext',
    EN: 'Song Text'
  },
  search: {
    SE: 'Sök...',
    EN: 'Search...'
  },
  searchPopover: {
    SE: 'Sök efter namn, melodi eller kategori',
    EN: 'Search for name, melody or category'
  }
};

export const CONFIRM_PAGE_STRINGS = {
  fields: [
    'title',
    'sectionSelection',
    'selectionOK',
    'send',
    'toSections',
    'expiredTokenTitle',
    'expiredTokenMessage',
    'alertErrorHeader',
    'alertSuccessHeader',
    'ok',
    'confirmMessage',
    'confirmHeader',
    'yes',
    'cancel',
    'checkinMessage',
    'notCheckedInButton',
    'notFiveSections',
    'sectionsPriosMessage',
    'sectionsPriosHeader'
  ],
  title: {
    SE: 'Bekräfta dina val',
    EN: 'Confirmation Page'
  },
  sectionSelection: {
    SE: 'Vänligen välj minst 5 stycken sektioner',
    EN: 'Please choose at least 5 sections'
  },
  selectionOK: {
    SE: 'Tack för dina val',
    EN: 'Thank you for your choices'
  },
  send: {
    SE: 'Skicka',
    EN: 'Send'
  },
  toSections: {
    SE: 'Till val av sektioner',
    EN: 'To section selection'
  },
  expiredTokenTitle,
  expiredTokenMessage,
  alertErrorHeader: {
    SE: 'Fel',
    EN: 'Error'
  },
  alertSuccessHeader: {
    SE: 'WEHEJ',
    EN: 'WEHEJ'
  },
  ok,
  yes,
  confirmMessage: {
    SE:
      'Är du säker på dina val? Efter att ha tryckt "Ja" går det inte att ångra sig',
    EN:
      'Are you sure about your choices? After pressing "Yes" you can\'t change your mind'
  },
  confirmHeader: {
    SE: 'Bekräfta',
    EN: 'Confirm'
  },
  cancel,
  checkinMessage: {
    SE: 'Du måste vara incheckad innan du kan skicka in',
    EN: 'You must be checked in to send'
  },
  notCheckedInButton: {
    SE: 'Var god checka in',
    EN: 'Please check in'
  },
  notFiveSections: {
    SE: 'Var god välj 5 sektioner',
    EN: 'Please select 5 sections'
  },
  sectionsPriosMessage: {
    SE: 'Registreringen har stängt',
    EN: 'The registration is closed'
  },
  sectionsPriosHeader: {
    SE: 'Registrering stängd',
    EN: 'Registration closed'
  }
};

export const MY_PROFILE_SCREEN_STRINGS = {
  fields: [
    'title',
    'firstName',
    'lastName',
    'email',
    'careOf',
    'address',
    'postNumber',
    'city',
    'phoneNumber',
    'foodPreference',
    'language',
    'driversLicense',
    'audition',
    'talent',
    'entertainmentCategory',
    'corps',
    'studentNation',
    'startOfStudies',
    'pastInvolvement',
    'groupLeader',
    'interests',
    'misc',
    'cancel',
    'save',
    'popUpHeader',
    'popUpInfo',
    'updateInfoMessageSuccess',
    'updateInfoMessageFail',
    'expiredTokenTitle',
    'expiredTokenMessage',
    'ok',
    'invalidChangesMadeText',
    'invalidChangesMadeHeader',
    'yes',
    'no'
  ],
  title: profile,
  firstName,
  lastName,
  email,
  address,
  postNumber,
  city,
  phoneNumber,
  foodPreference,
  careOf: {
    // TODO make accurate description
    SE: 'C/O',
    EN: 'C/O'
  },
  language: {
    SE: 'Språk',
    EN: 'Language'
  },
  driversLicense,
  audition: {
    SE: 'Audition',
    EN: 'Audition'
  },
  talent: {
    SE: 'Talang',
    EN: 'Talent'
  },
  entertainmentCategory: {
    SE: 'Underhållningskategori',
    EN: 'Entertainment category'
  },
  corps: {
    SE: 'Kår',
    EN: 'Corps'
  },
  studentNation: {
    SE: 'Nation',
    EN: 'Nation'
  },
  startOfStudies: {
    SE: 'Jag började studera år',
    EN: 'Year of study start'
  },
  pastInvolvement: {
    SE: 'Tidigare engagemang',
    EN: 'Past involvement'
  },
  groupLeader: {
    SE: 'Gruppledare',
    EN: 'Group leader'
  },
  interests: {
    SE: 'Intressen',
    EN: 'Interests'
  },
  misc: {
    SE: 'Allmänt',
    EN: 'Misc'
  },
  cancel,
  save: {
    SE: 'Spara',
    EN: 'Save'
  },
  popUpHeader: {
    SE: 'Profilinfo',
    EN: 'Profile info'
  },
  popUpInfo: {
    SE: 'Spara ändringar?',
    EN: 'Save changes?'
  },
  updateInfoMessageSuccess: {
    SE: 'Användarinfo uppdaterad',
    EN: 'Userinfo updated'
  },
  updateInfoMessageFail: {
    SE: 'Något gick fel',
    EN: 'Something went wrong'
  },
  invalidChangesMadeText: {
    SE: 'Vänligen se till att alla val är korrekt ifyllda',
    EN: 'Please make sure the fields are filled in correctly'
  },
  invalidChangesMadeHeader: {
    SE: 'OBS!',
    EN: 'Error'
  },
  expiredTokenTitle,
  expiredTokenMessage,
  ok,
  yes,
  no
};

export const MY_REGISTRATION_SCREEN_STRINGS = {
  fields: ['title', 'emptyListMessage'],
  title: registration,
  emptyListMessage: {
    SE: 'Du har inte valt några sektioner',
    EN: 'You have not chosen any sections'
  }
};
export const CHANGE_LANGUAGE_SCREEN_STRINGS = {
  fields: ['title'],
  title: {
    SE: 'Byt språk',
    EN: 'Change language'
  }
};

export const LOADING_STRINGS = {
  fields: ['loading'],
  loading
};

export const COUNT_DOWN_STRINGS = {
  fields: ['karneval', 'upprop'],
  karneval: {
    SE: 'Det är karneval!',
    EN: "It's carnival!"
  },
  upprop: {
    SE: 'Det är upprop!',
    EN: "It's call day!"
  }
};

export const ERROR_MSG_INPUT_FIELD = {
  fields: [
    'errorMsgOnlyDigits',
    'errorMsgOnlyLetters',
    'errorMsgInvalidEmail',
    'errorMsgNoMatchEmail',
    'errorMsgPwd',
    'errorMsgPhoneNbr',
    'errorMsgSocialSecurity',
    'errorMsgNoMatchPassword',
    'errorMsgZipCode',
    'errorMsgFoodPreference',
    'errorMsgWrongInput',
    'errorMsgCity',
    'errorMsgAnyEmpty',
    'errorMsgShortOnlyDigits'
  ],
  errorMsgOnlyDigits: {
    SE: 'Detta fält får endast innehålla siffror',
    EN: 'This field may only contain digits'
  },
  errorMsgOnlyLetters: {
    SE: 'Detta fält får endast innehålla bokstäver',
    EN: 'This field may only contain letters'
  },
  errorMsgInvalidEmail: {
    SE: 'Ej giltig mailadress',
    EN: 'Not a valid email address'
  },
  errorMsgNoMatchEmail: {
    SE: 'Mailadresserna matchar inte',
    EN: 'The email addresses do not match'
  },
  errorMsgNoMatchPassword: {
    SE: 'Lösenorden matchar inte',
    EN: 'The passwords do not match'
  },
  errorMsgPwd: {
    SE: 'Måste bestå av minst 5 tecken',
    EN: 'Must consist of at least 5 characters'
  },
  errorMsgPhoneNbr: {
    SE: 'Format: (+)XXXXXXXXXX',
    EN: 'Format: (+)XXXXXXXXXX'
  },
  errorMsgSocialSecurity: {
    SE: 'Format: YYMMDDXXXX',
    EN: 'Format: YYMMDDXXXX'
  },
  errorMsgZipCode: {
    SE: '5 siffror',
    EN: '5 digits'
  },
  errorMsgShortOnlyDigits: {
    SE: 'Endast siffror',
    EN: 'Only Digits'
  },
  errorMsgCity: {
    SE: 'Endast bokstäver',
    EN: 'Only letters'
  },
  errorMsgFoodPreference: {
    SE: 'Ex: gluten, laktos...',
    EN: 'Ex: gluten, lactose intolerant... '
  },
  errorMsgWrongInput: {
    SE: 'Vänligen se till att alla val är korrekt ifyllda',
    EN: 'Please make sure the fields are filled in correctly'
  },
  errorMsgAnyEmpty: {
    SE: 'Vänligen se till att inga obligatoriska fält är tomma',
    EN: 'Please make sure no mandatory fields are left empty'
  }
};
