import { Dimensions, Platform } from 'react-native'

// Useful constants
export const HEIGHT = Dimensions.get('window').height
export const WIDTH = Dimensions.get('window').width
export const IS_IOS = Platform.OS === 'ios'

// for the treasurehunt
export const treasureLongitude = 13.2037983
export const treasureLatitidue = 55.7106452
export const startDate = new Date(2018, 3, 25, 15, 29, 0)
export const endDate = new Date(2018, 3, 26, 15, 29, 10)
// export const basePath = 'https://api.karnevalist.se/'