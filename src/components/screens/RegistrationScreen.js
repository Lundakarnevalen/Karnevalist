import React, { Component } from 'react';
import { Alert, ScrollView, View, Dimensions, Picker, Platform } from 'react-native';
import axios from 'axios';
import Header from '../common/Header';
import Input from '../common/Input';
import DKPicker from '../common/DKPicker';
import CustomButton from '../common/CustomButton';
import ButtonChoiceManager from '../common/ButtonChoiceManager';
import BackgroundImage from '../common/BackgroundImage';

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
      showStudentUnionPicker: false
    };
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
      confirmedPassword
    } = this.state;
    return (
      <View>
        <BackgroundImage imagePath={require('../../../assets/images/background5.png')} />
        <Header
          title="Create Profile"
          navigation={this.props.navigation}
          textStyle={{ color: '#f4376d' }}
          style={{ backgroundColor: '#FFFFFF' }}
        />
        <ScrollView contentContainerStyle={styles.contentContainer} style={{ height: height - 64 }}>
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
            color={'rgb(138, 71, 151)'}
          />
          <ButtonChoiceManager
            buttonInputVector={['I have a drives license']}
            multipleChoice
            size={30}
            color={'rgb(138, 71, 151)'}
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
                axios
                  .post('https://api.10av10.com/register', {
                    email: this.state.email,
                    password: '123',
                    postNumber: this.state.postcode,
                    talent: 'saknas'
                  })
                  .then(() => {
                    this.props.navigation.navigate('HomeScreen');
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
                    Alert.alert('Error', msg);
                  });
              }
            }}
          />
        </ScrollView>
        <DKPicker
          onValueChange={shirtSize => this.onValueChangeShirtSize(shirtSize)}
          items={shirtSizeArray}
          value={this.state.shirtSize}
          isShowing={this.state.showShirtPicker}
          close={() => this.setState({ showShirtPicker: false })}
        />
        <DKPicker
          onValueChange={studentUnion => this.onValueChangeStudentUnion(studentUnion)}
          items={studentUnionArray}
          value={this.state.studentUnion}
          isShowing={this.state.showStudentUnionPicker}
          close={() => this.setState({ showStudentUnionPicker: false })}
        />
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

export default RegistrationScreen;
