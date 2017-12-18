const password = {
  SE: 'Lösenord',
  EN: 'Password'
}
const shirtSize= {
  SE: 'Välj tröjstorlek',
  EN: 'Choose shirt size'
}

const studentUnion= {
  SE: 'Välj nation',
  EN: 'Choose student union'
}
export const LOGIN_SCREEN_STRINGS = {
  fields: [
    'email',
    'password',
    'loginButton',
    'forgotPassword',
    'createProfile',
    'readMore',
    'emailError',
    'passwordError',
    'errorMsg',
    'errorMsg404',
    'passwordPopupHeader',
    'passwordPopupInfo',
    'passwordPopupCancel',
    'passwordPopupResetPassword'
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
  errorMsg: {
    SE: 'Fel email eller lösenord',
    EN: 'Wrong email or password'
  },
  errorMsg404: {
    SE: 'Något gick fel...',
    EN: 'Something went wrong...'
  },
  errorMsgInternal: {
    SE: 'Internt fel, var god försök igen senare',
    EN: 'Internal error, please try again later'
  },
  passwordPopupHeader: {
    SE: 'Glömt ditt lösenord?',
    EN: 'Forgot password?'
  },
  passwordPopupInfo: {
    SE: 'Var god fyll i din email adress och du kommer få ett nytt lösenord',
    EN: 'Please, fill in your email address below and you will receive a new password'
  },
  passwordPopupCancel: {
    SE: 'Avbryt',
    EN: 'Cancel'
  },
  passwordPopupResetPassword: {
    SE: 'Återställ lösenord',
    EN: 'Reset password'
  },
}

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
    'postcode',
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
  ],
  header: {
    SE: 'Skapa profil',
    EN: 'Create Profile'
  },
  firstName: {
    SE: 'Förnamn',
    EN: 'First name'
  },
  lastName: {
    SE: 'Efternamn',
    EN: 'Last name'
  },
  email: {
    SE: 'Email',
    EN: 'Email'
  },
  confirmEmail: {
    SE: 'Bekräfta email',
    EN: 'Confirm email'
  },
  password,
  confirmPassword: {
    SE: 'Bekräfta lösenord',
    EN: 'Confirm password"'
  },
  address: {
    SE: 'Adress',
    EN: 'Address'
  },
  postcode: {
    SE: 'Postnummer',
    EN: 'Postcode'
  },
  city: {
    SE: 'Stad',
    EN: 'City'
  },
  phoneNumber: {
    SE: 'Telefonnummer',
    EN: 'Phone number'
  },
  foodPreferences: {
    SE: 'Matpreferenser',
    EN: 'Food preferences'
  },
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
    EN: 'I was active in the karneval 2014'
  },
  driversLicense: {
    SE: 'Jag har körkort',
    EN: 'I have a drivers license'
  },
  register: {
    SE: 'Registrera',
    EN: 'Register'
  }
}

export const SECTION_SCREEN_STRINGS = {
  title: {
    SE: 'Sektioner',
    EN: 'Sections'
  }
}

export const NEWS_SCREEN_STRINGS = {
  title: {
    SE: 'Nyheter',
    EN: 'News'
  }
}

export const HOME_SCREEN_STRINGS = {
  title: {
    SE: 'Hem',
    EN: 'Home'
  },
  buttonText: {
    SE: 'Påbörja din registrering',
    EN: 'Begin your registration'
  }

}

export const PROFILE_SCREEN_STRINGS = {
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
}

export const SECTION_ITEM_SCREEN_STRINGS = {
  title: {
    SE: 'Hem',
    EN: 'Home'
  }
}

export const SONGBOOK_SCREEN_STRINGS = {
  title: {
    SE: 'Sångbok',
    EN: 'Song Book'
  }
}
