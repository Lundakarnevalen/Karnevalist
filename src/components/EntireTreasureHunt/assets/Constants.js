import { Dimensions, Platform } from 'react-native'

// Useful constants
export const HEIGHT = Dimensions.get('window').height
export const WIDTH = Dimensions.get('window').width
export const IS_IOS = Platform.OS === 'ios'

// for the treasurehunt
export const treasureLongitude = 13.215988
export const treasureLatitidue = 55.722816
export const startDate = new Date(2018, 3, 24, 14, 28, 10)
export const endDate = new Date(2018, 3, 24, 14, 40, 0)
export const basePath = 'https://api.lundakarnevalen.se/'