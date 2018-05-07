import React from 'react'
import { Image, View } from 'react-native'
import { styles } from './styles'
import skattjakt from '../../assets/images/skattjakt.png'

const BackgroundImage = () => {
  const {containerStyle, backgroundImageStyle, opacityStyle} = styles
  return (
    <View style={containerStyle}>
      <Image
        defaultSource={skattjakt}
        source={skattjakt}
        style={backgroundImageStyle}
      />
      <View style={opacityStyle}/>
    </View>
  )
}

export { BackgroundImage }
