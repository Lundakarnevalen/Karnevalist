import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions, Platform, Picker, Alert } from 'react-native';
import Header from '../common/Header';
import Input from '../common/Input';
import DKPicker from '../common/DKPicker';
import CustomButton from '../common/CustomButton';
import axios from 'axios';
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
      address: '',
      postcode: '',
      city: '',
      phoneNbr: '',
      foodPreferences: '',
      shirtSize: '',
      shirtSizeTitle: '',
      studentUnion: '',
      studentUnionInfo: '',
      studentUnionTitle: '',
      showShirtPicker: false,
      showStudentUnionPicker: false
    };
  }

  renderPickerForPlatform(title, tag) {
    if (Platform.OS === 'ios') {
      return (
        <CustomButton
          text={title === '' ? 'Choose' : title}
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
      studentUnionInfo
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
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder="Last name"
            onChangeText={lastNameInput => {
              this.setState({ lastName: lastNameInput });
            }}
            value={lastName}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder="Email"
            onChangeText={emailInput => {
              this.setState({ email: emailInput });
            }}
            value={email}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder="Confirm email"
            onChangeText={emailInput => {
              this.setState({ confirmedEmail: emailInput });
            }}
            value={confirmedEmail}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder="Address"
            onChangeText={addressInput => {
              this.setState({ address: addressInput });
            }}
            value={address}
            style={{ marginBottom: 8 }}
          />
          <View style={flexHorizontal}>
            <Input
              placeholder="Postcode"
              onChangeText={postcodeInput => {
                this.setState({ postcode: postcodeInput });
              }}
              width={width / 2 - 4}
              style={{
                marginBottom: 8,
                marginRight: 8
              }}
              value={postcode}
            />
            <Input
              placeholder="City"
              onChangeText={cityInput => {
                this.setState({ city: cityInput });
              }}
              width={width / 2 - 4}
              style={{ marginBottom: 8 }}
              value={city}
            />
          </View>
          <Input
            placeholder="Phone number"
            onChangeText={phoneNbrInput => {
              this.setState({ phoneNbr: phoneNbrInput });
            }}
            style={{ marginBottom: 8 }}
            value={phoneNbr}
          />
          <Input
            placeholder="Food preferences"
            onChangeText={foodPreferencesInput => {
              this.setState({ foodPreferences: foodPreferencesInput });
            }}
            style={{ marginBottom: 8 }}
            value={foodPreferences}
          />
          <Text>Choose shirt size</Text>
          {this.renderPickerForPlatform(this.state.shirtSizeTitle, 'shirt')}
          <ButtonChoiceManager buttonInputVector={['I have a drives license']} multipleChoice />
          <Text>Choose student union</Text>
          {this.renderPickerForPlatform(this.state.studentUnionTitle, 'union')}
          <Input
            title="What did you do at the student union?"
            onChangeText={studentUnionInfoInput => {
              this.setState({ studentUnionInfo: studentUnionInfoInput });
            }}
            value={studentUnionInfo}
          />
          <ButtonChoiceManager
            buttonInputVector={['I was engaged in the karneval 2014']}
            multipleChoice
          />
          <CustomButton
            text="Register"
            style="standardButton"
            width={width}
            onPress={() => {
              axios
                .post('http://146.185.173.31:3000/register', {
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
