import { Dimensions, Platform } from 'react-native'

// Useful constants
export const HEIGHT = Dimensions.get('window').height
export const WIDTH = Dimensions.get('window').width
export const IS_IOS = Platform.OS === 'ios'

// for the treasurehunt
export const treasureLongitude = 13.181820
export const treasureLatitude = 55.684364

export const startDate = new Date(2018, 4, 16, 17, 0, 0)
export const endDate = new Date(2018, 4, 16, 21, 0, 0)

export const basePath = 'https://api.karnevalist.se/'

