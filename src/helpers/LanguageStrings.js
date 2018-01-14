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
    'cancel',
    'resetPassword',
    'responseFail',
    'responseSuccess'
  ],
  email: {
    SE: 'Email Adress',
    EN: 'Email Address'
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
    'errorFirstName',
    'errorLastName',
    'errorEmail',
    'errorConfirmEmail',
    'errorAddress',
    'errorPostNumber',
    'errorCity',
    'errorPhoneNumber',
    'errorPassword',
    'errorConfirmPassword',
    'errorEmailMatch',
    'errorPasswordMatch',
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
    SE: [studentUnion.SE, 'Lunds Nation', 'Göteborgs Nation', 'Malmös Nation'],
    EN: [studentUnion.EN, 'Lunds Nation', 'Göteborgs Nation', 'Malmös Nation']
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
  errorFirstName: {
    SE: 'Förnamn krävs',
    EN: 'First name is required'
  },
  errorLastName: {
    SE: 'Efternamn krävs',
    EN: 'Last name is required'
  },
  errorEmail: {
    SE: 'Email krävs',
    EN: 'Email is required'
  },
  errorConfirmEmail: {
    SE: 'Var god bekräfta din email',
    EN: 'Please confirm your email'
  },
  errorAddress: {
    SE: 'Adress krävs',
    EN: 'Address is required'
  },
  errorPostNumber: {
    SE: 'Postnummer krävs',
    EN: 'Post number is required'
  },
  errorCity: {
    SE: 'Stad krävs',
    EN: 'City is required'
  },
  errorPhoneNumber: {
    SE: 'Telefonnummer krävs',
    EN: 'Phone number is required'
  },
  errorPassword: {
    SE: 'Lösenord krävs',
    EN: 'Password is required'
  },
  errorConfirmPassword: {
    SE: 'Var god bekräfta ditt lösenord',
    EN: 'Please confirm your password'
  },
  errorEmailMatch: {
    SE: 'Email adresserna matchar inte',
    EN: "The emails doesn't match"
  },
  errorPasswordMatch: {
    SE: 'Lösenorden matchar inte',
    EN: "The passwords doesn't match"
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
  fields: ['messageStart', 'messageEnd'],
  messageStart: {
    SE: 'Sektion: "',
    EN: 'Section: "'
  },
  messageEnd: {
    SE: '" tillagd',
    EN: '" added'
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
  fields: ['title', 'sectionSelection', 'selectionOK', 'send', 'toSections'],
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
    EN: 'Thanks for your choices'
  },
  send: {
    SE: 'Skicka',
    EN: 'Send'
  },
  toSections: {
    SE: 'Till val av sektioner',
    EN: 'To section selection'
  }
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
    'personalNumber',
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
    'updateInfoMessageFail'
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
  personalNumber,
  careOf: {
    //TODO make accurate description
    SE: 'BRY SIG OM??? VET INTE VAD DETTA ÄR SNÄLLA ERSÄTT',
    EN: 'CARE OF??? DO NOT KNOW WHAT THIS IS PLS REPLACE'
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
  }
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
}

export const CAMERA_STRINGS = {
  fields: ['take', 'your', 'picture'],
  take: {
    SE: 'Ta',
    EN: 'Take'
  },
  your: {
    SE: 'Din',
    EN: 'Your'
  },
  picture: {
    SE: 'Bild',
    EN: 'Picture'
  }
};

export const LOADING_STRINGS = {
  fields: ['loading'],
  loading
};

export const ERROR_MSG_INPUT_FIELD = {
  fields: ['errorMsgOnlyDigits', 'errorMsgOnlyLetters'],
  errorMsgOnlyDigits: {
    SE: 'Detta fält får endast innehålla siffror',
    EN: 'This field may only contain digits'
  },
  errorMsgOnlyLetters: {
    SE: 'Detta fält får endast innehålla bokstäver',
    EN: 'This field may only contain letters'
  }
};