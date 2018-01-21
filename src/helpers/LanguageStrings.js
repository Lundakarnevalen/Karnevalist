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
  SE: 'Session Slut',
  EN: 'Session Expired'
};

const expiredTokenMessage = {
  SE: 'Din session har tagit slut var vänlig logga in igen om du vill fortsätta',
  EN: 'Your sessions has expired please login again to continue '
};

const studentUnion = {
  SE: 'Välj nation',
  EN: 'Choose student union'
};
const errorMsg400 = {
  SE: 'Fel email eller lösenord',
  EN: 'Wrong email or password'
};
const errorMsg401 = {
  SE: 'Fel email eller lösenord',
  EN: 'Wrong email or password'
};
const errorMsg404 = {
  SE: 'Något gick fel...',
  EN: 'Something went wrong...'
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
  SE: 'Email',
  EN: 'Email'
};
const address = {
  SE: 'Adress',
  EN: 'Address'
};
const postNumber = {
  SE: 'Postnummer',
  EN: 'Post number'
};
const city = {
  SE: 'Stad',
  EN: 'City'
};
const phoneNumber = {
  SE: 'Telefonnummer',
  EN: 'Phone number'
};
const foodPreferences = {
  SE: 'Matpreferenser',
  EN: 'Food preferences'
};
const personalNumber = {
  SE: 'Personnummer',
  EN: 'Personal number'
};
const driversLicense = {
  SE: 'Jag har körkort',
  EN: 'I have a drivers license'
};
const cancel = {
  SE: 'Avbryt',
  EN: 'Cancel'
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
    SE: 'Email Adress',
    EN: 'Email Address'
  },
  resetPasswordComplete: {
    SE: 'Ett email har skickats med information om hur du byter lösenord.',
    EN: 'An email has been send with information about how to reset your password.'
  },
  password,
  loginButton: {
    SE: 'Logga in',
    EN: 'Log in'
  },
  languageButton: {
    SE: 'Change to english',
    EN: 'Ändra till svenska'
  },
  forgotPassword: {
    SE: 'Glömt lösenord?',
    EN: 'Forgot your password?'
  },
  createProfile: {
    SE: 'Skapa profil',
    EN: 'Create profile'
  },
  readMore: {
    SE: 'Läs mer om registreringen',
    EN: 'Read more about the registration'
  },
  emailError: {
    SE: 'Email fältet måste fyllas i',
    EN: 'The email field is required'
  },
  passwordError: {
    SE: 'Lösenord fältet måste fyllas i',
    EN: 'The password field is required'
  },
  error,
  errorMsg400,
  errorMsg401,
  errorMsg404,
  errorMsgInternal,
  passwordPopupHeader: {
    SE: 'Glömt lösenord?',
    EN: 'Forgot password?'
  },
  passwordPopupInfo: {
    SE: 'Var god fyll i din email adress så skickas ett nytt lösenord till dig',
    EN: 'Please, fill in your email address below and you will receive a new password'
  },
  cancel: {
    SE: 'Avbryt',
    EN: 'Cancel'
  },
  ok: {
    SE: 'OK',
    EN: 'OK'
  },
  resetPassword: {
    SE: 'Återställ lösenord',
    EN: 'Reset password'
  },
  responseFail: {
    SE: 'Var god ange en giltig email adress',
    EN: 'Please enter a valid email address'
  },
  responseSuccess: {
    SE: 'Tack, kolla din inbox för ditt nya lösenord',
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
    'foodPreferences',
    'shirtSize',
    'shirtSizeArray',
    'studentUnion',
    'studentUnionArray',
    'activeKarneval',
    'driversLicense',
    'register',
    'error',
    'errorMsg400',
    'errorMsg401',
    'errorMsg404',
    'errorMsgInternal'
  ],
  header: {
    SE: 'Skapa profil',
    EN: 'Create Profile'
  },
  firstName,
  lastName,
  socialSecurityNumber,
  email,
  confirmEmail: {
    SE: 'Bekräfta email',
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
  foodPreferences,
  shirtSize,
  shirtSizeArray: {
    SE: [shirtSize.SE, 'Small', 'Medium', 'Large'],
    EN: [shirtSize.EN, 'Small', 'Medium', 'Large']
  },
  studentUnion,
  studentUnionArray: {
    SE: [
      studentUnion.SE,
      'Blekingska Nation',
      'Göteborgs Nation',
      'Hallands Nation',
      'Helsingkrona Nation',
      'Kalmar Nation',
      'Kristianstads Nation',
      'Malmö Nation',
      'Sydskånska Nation',
      'Västgöta Nation',
      'Wermlands Nation',
      'Östgöta Nation'
    ],
    EN: [
      studentUnion.EN,
      'Blekingska Nation',
      'Göteborgs Nation',
      'Hallands Nation',
      'Helsingkrona Nation',
      'Kalmar Nation',
      'Kristianstads Nation',
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
  driversLicense,
  register: {
    SE: 'Registrera',
    EN: 'Register'
  },
  error,
  errorMsg400: {
    SE: 'Ogiltig email eller lösenord',
    EN: 'Invalid email or password'
  },
  errorMsg401: {
    SE: 'Ogiltig email eller lösenord',
    EN: 'Invalid email or password'
  },
  errorMsg404,
  errorMsgInternal
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
    EN: 'About the registration'
  },
  header: {
    SE: '3 enkla steg för att bli Karnevalist',
    EN: '3 simple steps to become a Karnevalist'
  },
  panelTitle1: {
    SE: 'Skapa profil',
    EN: 'Create profile'
  },
  panelTitle2: {
    SE: 'Kom på uppropet och välj sektion',
    EN: 'Come to the call and choose section'
  },
  panelTitle3: {
    SE: 'Skicka din ansökan',
    EN: 'Send your application'
  },
  infoText1: {
    SE:
      'Första steget är att skapa en profil, antingen här eller på Karnevalist.se.' +
      'När du skapat en profil tilldelas du ett profil-ID som' +
      'du använder vid incheckning under uppropsdagen.',
    EN:
      'The first step is to create a profile, either here or at Karnevalist.se.' +
      'When you have created a profile, you are assigned a profile ID that you use' +
      'when checking in during the call day.'
  },
  infoText2: {
    SE: 'Välj vilken sektion du vill vara delaktig i under karnevalen.',
    EN: 'Choose which section you want to participate in during the carnival.'
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
  fields: ['title'],
  title: {
    SE: 'Sektioner',
    EN: 'Sections'
  }
};

export const NEWS_SCREEN_STRINGS = {
  fields: ['title'],
  title: {
    SE: 'Nyheter',
    EN: 'News'
  }
};

export const HOME_SCREEN_STRINGS = {
  fields: ['title', 'buttonText'],
  title: {
    SE: 'Hem',
    EN: 'Home'
  },
  buttonText: {
    SE: 'Påbörja din registrering',
    EN: 'Begin your registration'
  }
};

export const PROFILE_SCREEN_STRINGS = {
  fields: ['title', 'profile', 'registration', 'logout'],
  title: {
    SE: 'Min profil',
    EN: 'My profile'
  },
  profile: {
    SE: 'Min profil',
    EN: 'My profile'
  },
  registration: {
    SE: 'Min registrering',
    EN: 'My registration'
  },
  logout: {
    SE: 'Logga ut',
    EN: 'Logout'
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
    SE: '" bortagen',
    EN: '" removed'
  }
};

export const SONGBOOK_SCREEN_STRINGS = {
  fields: ['title'],
  title: {
    SE: 'Sångbok',
    EN: 'Song Book'
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
    'cancel'
  ],
  title: {
    SE: 'Bekräfta dina val',
    EN: 'Confirmation page'
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
  ok: {
    SE: 'OK',
    EN: 'OK'
  },
  yes: {
    SE: 'JA',
    EN: 'YES'
  },
  confirmMessage: {
    SE: "Är du säker på dina val? Efter att ha trycka 'Ja' går det inte att ångra sig",
    EN: "Are you sure about your choices? After pressing 'Yes' you can't change your mind"
  },
  confirmHeader: {
    SE: 'Bekräfta',
    EN: 'Confirm'
  },
  cancel
};

export const MY_PROFILE_SCREEN_STRINGS = {
  fields: [
    'title',
    'firstName',
    'lastName',
    'email',
    'address',
    'postNumber',
    'city',
    'phoneNumber',
    'foodPreferences',
    'language',
    'careOf',
    'driversLicense',
    'disability',
    'audition',
    'talent',
    'entertainmentCategory',
    'corps',
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
    'expiredTokenMessage'
  ],
  title: {
    SE: 'Användarinfo',
    EN: 'User info'
  },
  firstName,
  lastName,
  email,
  address,
  postNumber,
  city,
  phoneNumber,
  foodPreferences,
  careOf: {
    //TODO make accurate description
    SE: 'C/O',
    EN: 'C/O'
  },
  language: {
    SE: 'Språk',
    EN: 'Language'
  },
  driversLicense,
  disability: {
    SE: 'Handikapp',
    EN: 'disability'
  },
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
  startOfStudies: {
    SE: 'Studiestart',
    EN: 'Start of studies'
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
  expiredTokenTitle,
  expiredTokenMessage
};

export const MY_REGISTRATION_SCREEN_STRINGS = {
  fields: ['title', 'emptyListMessage'],
  title: {
    SE: 'Mina val',
    EN: 'My choices'
  },
  emptyListMessage: {
    SE: 'Du har inte valt några sektioner',
    EN: 'You have not chosen any sections'
  }
};

export const LOADING_STRINGS = {
  fields: ['loading'],
  loading
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
    'errorMsgAnyEmpty'
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
    SE: 'Ej giltig email adress',
    EN: 'Not valid email address'
  },
  errorMsgNoMatchEmail: {
    SE: 'Email adresserna matchar inte',
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
