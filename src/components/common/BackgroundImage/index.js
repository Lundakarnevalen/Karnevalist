import React from 'react';
import { Image, View } from 'react-native';
import images from 'assets/images';
import { styles } from './styles';

const getPath = pictureNumber => {
  switch (pictureNumber) {
    case 1:
      return images.night1;
    case 2:
      return images.night2;
    case 3:
      return images.night3;
    case 4:
      return images.night4;
    case 'background-login':
      return images.login;
    default:
      return images.night5;
  }
};

const BackgroundImage = ({ pictureNumber }) => {
  const { containerStyle, backgroundImageStyle, opacityStyle } = styles;
  return (
    <View style={containerStyle}>
      <Image
        defaultSource={getPath(pictureNumber)}
        source={getPath(pictureNumber)}
        style={backgroundImageStyle}
      />
      <View style={opacityStyle} />
    </View>
  );
};

// class BackgroundImage extends Component {
//   render() {
//     const { containerStyle, backgroundImageStyle, opacityStyle } = styles;
//     return (
//       <View style={containerStyle}>
//         <Image
//           defaultSource={this.getPath()}
//           source={this.getPath()}
//           style={backgroundImageStyle}
//         />
//         <View style={opacityStyle} />
//       </View>
//     );
//   }
// }

export { BackgroundImage };
