import { Dimensions, Platform } from 'react-native'

// Useful constants
export const HEIGHT = Dimensions.get('window').height
export const WIDTH = Dimensions.get('window').width
export const IS_IOS = Platform.OS === 'ios'

// for the treasurehunt
export const treasureLongitude = 13.2037983
export const treasureLatitidue = 55.7106452
export const startDate = new Date(2018, 3, 29, 15, 0, 0)
export const endDate = new Date(2018, 3, 29, 16, 30, 0)
// export const basePath = 'https://api.karnevalist.se/' THESE NEED TO BE RESET ON UPATE
export const basePath = 'https://api.10av10.com'