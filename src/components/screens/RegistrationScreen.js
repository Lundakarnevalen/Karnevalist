import React, { Component } from 'react';
import {
  Alert,
  ScrollView,
  View,
  Dimensions,
  Picker,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import Header from '../common/Header';
import Input from '../common/Input';
import DKPicker from '../common/DKPicker';
import CustomButton from '../common/CustomButton';
import ButtonChoiceManager from '../common/ButtonChoiceManager';
import CameraButton from '../common/CameraButton';
import BackgroundImage from '../common/BackgroundImage';
import Loading from '../common/Loading';

const width = Dimensions.get('window').width - 32;
const height = Dimensions.get('window').height;

const shirtSizeArray = [
  { label: 'Shirt size', value: '' },
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' }
];
const studentUnionArray = [
  { label: 'Student Union', value: '' },
  { label: 'Lunds Nation', value: 'lundsNation' },
  { label: 'Kalmar Nation', value: 'kalmarNation' }
];

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      confirmedEmail: '',
      password: '',
      confirmedPassword: '',
      address: '',
      postcode: '',
      city: '',
      phoneNbr: '',
      foodPreferences: '',
      shirtSize: '',
      shirtSizeTitle: '',
      studentUnion: '',
      studentUnionTitle: '',
      showShirtPicker: false,
      showStudentUnionPicker: false,
      loading: false,
      loadingComplete: false
    };
  }

  getColor() {
    return this.props.theme === 'day' ? 'rgb(138, 71, 151)' : 'white';
  }

  renderPickerForPlatform(defaultTitle, title, tag) {
    if (Platform.OS === 'ios') {
      return (
        <CustomButton
          text={title === '' ? defaultTitle : title}
          style="standardButton"
          width={width}
          onPress={() => {
            return tag === 'shirt'
              ? this.setState({ showShirtPicker: true })
              : this.setState({ showStudentUnionPicker: true });
          }}
        />
      );
    }
    return (
      <View>
        <Picker
          onValueChange={itemValue => {
            return tag === 'shirt'
              ? this.onValueChangeShirtSize(itemValue)
              : this.onValueChangeStudentUnion(itemValue);
          }}
          selectedValue={tag === 'shirt' ? this.state.shirtSize : this.state.studentUnion}
          style={styles.androidPicker}
        >
          {this.renderPickerArray(tag)}
        </Picker>
      </View>
    );
  }

  renderPickerArray(tag) {
    if (tag === 'shirt') {
      return shirtSizeArray.map(item => {
        return <Picker.Item key={item.label} label={item.label} value={item.value} />;
      });
    }
    return studentUnionArray.map(item => {
      return <Picker.Item key={item.label} label={item.label} value={item.value} />;
    });
  }

  onValueChangeShirtSize(shirtSize) {
    this.setState({ shirtSize });
    shirtSizeArray.map(item => {
      if (shirtSize === item.value) {
        return this.setState({ shirtSizeTitle: item.label });
      }
      return null;
    });
    return null;
  }

  onValueChangeStudentUnion(studentUnion) {
    this.setState({ studentUnion });
    shirtSizeArray.map(item => {
      if (studentUnion === item.value) {
        return this.setState({ studentUnionTitle: item.label });
      }
      return null;
    });
    return null;
  }

  renderDKBackgroundCloser() {
    const { showShirtPicker, showStudentUnionPicker } = this.state;
    if (showShirtPicker || showStudentUnionPicker) {
      return (
        <TouchableWithoutFeedback
          style={{ position: 'absolute' }}
          onPress={() => this.setState({ showShirtPicker: false, showStudentUnionPicker: false })}
        >
          <View
            style={{
              position: 'absolute',
              width: width + 32,
              height,
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }}
          />
        </TouchableWithoutFeedback>
      );
    }
  }

  render() {
    const { flexHorizontal } = styles;
    const {
      firstName,
      lastName,
      email,
      confirmedEmail,
      address,
      postcode,
      city,
      phoneNbr,
      foodPreferences,
      password,
      confirmedPassword,
      loading,
      loadingComplete,
      shirtSize,
      showShirtPicker,
      studentUnion,
      showStudentUnionPicker
    } = this.state;
    return (
      <View>
        <BackgroundImage pictureNumber={5} />
        <Header title="Create Profile" navigation={this.props.navigation} />
        <ScrollView contentContainerStyle={styles.contentContainer} style={{ height: height - 64 }}>
          <CameraButton
            onPress={() => this.props.navigation.navigate('CameraScreen')}
            source={this.props.picture}
          />
          <Input
            placeholder="First name"
            onChangeText={firstNameInput => {
              this.setState({ firstName: firstNameInput });
            }}
            value={firstName}
          />
          <Input
            placeholder="Last name"
            onChangeText={lastNameInput => {
              this.setState({ lastName: lastNameInput });
            }}
            value={lastName}
          />
          <Input
            placeholder="Email"
            onChangeText={emailInput => {
              this.setState({ email: emailInput });
            }}
            value={email}
          />
          <Input
            placeholder="Confirm email"
            onChangeText={emailInput => {
              this.setState({ confirmedEmail: emailInput });
            }}
            value={confirmedEmail}
          />
          <Input
            placeholder="Password"
            onChangeText={text => {
              this.setState({ password: text });
            }}
            value={password}
            secureText
          />
          <Input
            placeholder="Confirm password"
            onChangeText={text => {
              this.setState({ confirmedPassword: text });
            }}
            value={confirmedPassword}
            secureText
          />
          <Input
            placeholder="Address"
            onChangeText={addressInput => {
              this.setState({ address: addressInput });
            }}
            value={address}
          />
          <View style={flexHorizontal}>
            <Input
              placeholder="Postcode"
              onChangeText={postcodeInput => {
                this.setState({ postcode: postcodeInput });
              }}
              width={width / 2 - 4}
              extraContainerStyle={{ marginRight: 8 }}
              value={postcode}
            />
            <Input
              placeholder="City"
              onChangeText={cityInput => {
                this.setState({ city: cityInput });
              }}
              width={width / 2 - 4}
              value={city}
            />
          </View>
          <Input
            placeholder="Phone number"
            onChangeText={phoneNbrInput => {
              this.setState({ phoneNbr: phoneNbrInput });
            }}
            value={phoneNbr}
          />
          <Input
            placeholder="Food preferences"
            onChangeText={foodPreferencesInput => {
              this.setState({ foodPreferences: foodPreferencesInput });
            }}
            value={foodPreferences}
          />
          {this.renderPickerForPlatform('Choose shirt size', this.state.shirtSizeTitle, 'shirt')}
          {this.renderPickerForPlatform(
            'Choose student union',
            this.state.studentUnionTitle,
            'union'
          )}
          <ButtonChoiceManager
            buttonInputVector={['I was engaged in the karneval 2014']}
            multipleChoice
            size={30}
            color={this.getColor()}
          />
          <ButtonChoiceManager
            buttonInputVector={['I have a drives license']}
            multipleChoice
            size={30}
            color={this.getColor()}
          />
          <CustomButton
            text={'Register'}
            style={'standardButton'}
            width={width}
            onPress={() => {
              if (firstName === '') {
                Alert.alert('Error', 'First name is required.');
              } else if (lastName === '') {
                Alert.alert('Error', 'Last name is required.');
              } else if (email === '') {
                Alert.alert('Error', 'Email is required.');
              } else if (confirmedEmail === '') {
                Alert.alert('Error', 'Please confirm your email.');
              } else if (address === '') {
                Alert.alert('Error', 'Address is required.');
              } else if (postcode === '') {
                Alert.alert('Error', 'Postcode is required.');
              } else if (city === '') {
                Alert.alert('Error', 'City is required.');
              } else if (phoneNbr === '') {
                Alert.alert('Error', 'Phone number is required.');
              } else if (password === '') {
                Alert.alert('Error', 'Password is required.');
              } else if (confirmedPassword === '') {
                Alert.alert('Error', 'Please confirm your password.');
              } else if (email !== confirmedEmail) {
                Alert.alert('Error', "Your emails doesn't match.");
              } else if (password !== confirmedPassword) {
                Alert.alert('Error', "Your passwords doesn't match.");
              } else {
                this.setState({ loadingComplete: false, loading: true });
                axios
                  .post('https://api.10av10.com/register', {
                    email,
                    password,
                    postNumber: postcode,
                    firstName,
                    lastName,
                    phoneNumber: phoneNbr,
                    address,
                    city,
                    foodPreferences
                  })
                  .then(() => {
                    this.setState({ loadingComplete: true });
                  })
                  .catch(error => {
                    let msg;
                    if (error.message.includes('400')) {
                      msg = 'Invalid email or password';
                    } else if (error.message.includes('401')) {
                      msg = 'Invalid email or password';
                    } else if (error.message.includes('404')) {
                      msg = 'Something went wrong...';
                    } else {
                      msg = 'Internal error, please try again later';
                    }
                    this.setState({ loadingComplete: false, loading: false });
                    Alert.alert('Error', msg);
                  });
              }
            }}
          />
        </ScrollView>
        {this.renderDKBackgroundCloser()}
        <DKPicker
          onValueChange={newValue => this.onValueChangeShirtSize(newValue)}
          items={shirtSizeArray}
          value={shirtSize}
          isShowing={showShirtPicker}
          close={() => this.setState({ showShirtPicker: false })}
        />
        <DKPicker
          onValueChange={newValue => this.onValueChangeStudentUnion(newValue)}
          items={studentUnionArray}
          value={studentUnion}
          isShowing={showStudentUnionPicker}
          close={() => this.setState({ showStudentUnionPicker: false })}
        />
        {loading ? (
          <Loading
            loadingComplete={loadingComplete}
            redirect={() => {
              this.props.navigation.navigate('HomeScreen');
              this.setState({ loading: false, loadingComplete: false });
            }}
          />
        ) : null}
      </View>
    );
  }
}

const styles = {
  titelTextStyle: {
    fontSize: 40
  },
  flexHorizontal: {
    flexDirection: 'row'
  },
  contentContainer: {
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 64,
    paddingLeft: 16
  },
  androidPicker: {
    color: '#f4376d',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'black',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const mapStateToProps = ({ currentTheme, userInformation }) => {
  const { theme } = currentTheme;
  const { picture } = userInformation;
  return { theme, picture };
};

export default connect(mapStateToProps, null)(RegistrationScreen);
