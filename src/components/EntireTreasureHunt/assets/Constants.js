import { Dimensions, Platform } from 'react-native'

// Useful constants
export const HEIGHT = Dimensions.get('window').height
export const WIDTH = Dimensions.get('window').width
export const IS_IOS = Platform.OS === 'ios'

// for the treasurehunt
export const treasureLongitude = 13.2126718
export const treasureLatitidue = 55.7202683
export const startDate = new Date(2018, 4, 2, 9, 35, 0)
export const endDate = new Date(2018, 4, 2, 9, 50, 0)
// export const basePath = 'https://api.karnevalist.se/' THESE NEED TO BE RESET ON UPDATE
export const basePath = 'https://api.10av10.com'