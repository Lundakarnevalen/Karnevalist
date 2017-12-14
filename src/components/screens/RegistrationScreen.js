import React, { Component } from 'react'
import { ScrollView, View, Text, Dimensions } from 'react-native'
import Header from '../common/Header'
import Input from '../common/Input'
import DKPicker from '../common/DKPicker'
import CustomButton from '../common/CustomButton'
import ButtonChoiceManager from '../common/ButtonChoiceManager'
import BackgroundImage from '../common/BackgroundImage';

const width = Dimensions.get('window').width - 32
const height = Dimensions.get('window').height

const shirtSizeArray = [
  { label: '-', value: '' },
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' }
]
const studentUnionArray = [
  { label: '-', value: '' },
  { label: 'Lunds Nation', value: 'lundsNation' },
  { label: 'Kalmar Nation', value: 'kalmarNation' }
]

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
      studentUnionInfo: '',
      studentUnionTitle: '',
      showShirtPicker: false,
      showStudentUnionPicker: false
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
      studentUnionInfo,
      password,
      confirmedPassword
    } = this.state;
    return (
      <View>
        <BackgroundImage
          imagePath={require('../../../assets/images/background5.png')}
        />
        <Header
          title='Create Profile'
          navigation={this.props.navigation}
          textStyle={{ color: '#f4376d' }}
          style={{ backgroundColor: '#FFFFFF' }}
        />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={{ height: (height - 64) }}
        >
          <Input
            placeholder='First name'
            onChangeText={(firstNameInput) => {
              this.setState({ firstName: firstNameInput })
            }}
            value={firstName}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder='Last name'
            onChangeText={(lastNameInput) => {
              this.setState({ lastName: lastNameInput })
            }}
            value={lastName}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder='Email'
            onChangeText={(emailInput) => {
              this.setState({ email: emailInput })
            }}
            value={email}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder='Confirm email'
            onChangeText={(emailInput) => {
              this.setState({ confirmedEmail: emailInput })
            }}
            value={confirmedEmail}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder='Password'
            onChangeText={(text) => {
              this.setState({ password: text })
            }}
            value={password}
            style={{ marginBottom: 8 }}
            secureText
          />
          <Input
            placeholder='Confirm password'
            onChangeText={(text) => {
              this.setState({ confirmedPassword: text })
            }}
            value={confirmedPassword}
            style={{ marginBottom: 8 }}
            secureText
          />
          <Input
            placeholder='Address'
            onChangeText={(addressInput) => {
              this.setState({ address: addressInput })
            }}
            value={address}
            style={{ marginBottom: 8 }}
          />
          <View style={flexHorizontal}>
            <Input
              placeholder='Postcode'
              onChangeText={(postcodeInput) => {
                this.setState({ postcode: postcodeInput })
              }}
              width={(width / 2) - 4}
              style={{
                marginBottom: 8,
                marginRight: 8
              }}
              value={postcode}
            />
            <Input
              placeholder='City'
              onChangeText={(cityInput) => {
                this.setState({ city: cityInput })
              }}
              width={(width / 2) - 4}
              style={{ marginBottom: 8 }}
              value={city}
            />
          </View>
          <Input
            placeholder='Phone number'
            onChangeText={(phoneNbrInput) => {
              this.setState({ phoneNbr: phoneNbrInput })
            }}
            style={{ marginBottom: 8 }}
            value={phoneNbr}
          />
          <Input
            placeholder='Food preferences'
            onChangeText={(foodPreferencesInput) => {
              this.setState({ foodPreferences: foodPreferencesInput })
            }}
            style={{ marginBottom: 8 }}
            value={foodPreferences}
          />
          <CustomButton
            text={this.state.shirtSizeTitle === '' ? 'Choose shirt size' : this.state.shirtSizeTitle}
            style='standardButton'
            width={width}
            onPress={() => this.setState({ showShirtPicker: true })}
          />
          <CustomButton
            text={this.state.studentUnionTitle === '' ? 'Choose student union' : this.state.studentUnionTitle}
            style='standardButton'
            width={width}
            onPress={() => this.setState({ showStudentUnionPicker: true })}
          />
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
            text='Register'
            style='standardButton'
            width={width}
            onPress={() => this.props.navigation.navigate('ConfirmationScreen')}
          />
        </ScrollView>
        <DKPicker
          onValueChange={(shirtSize) => {
            this.setState({ shirtSize })
            shirtSizeArray.map(item => {
              if (shirtSize === item.value) {
                return (this.setState({ shirtSizeTitle: item.label }))
              }
              return (null)
            })
          }}
          items={shirtSizeArray}
          value={this.state.shirtSize}
          isShowing={this.state.showShirtPicker}
          close={() => this.setState({ showShirtPicker: false })}
        />
        <DKPicker
          onValueChange={(studentUnion) => {
            this.setState({ studentUnion })
            studentUnionArray.map(item => {
              if (studentUnion === item.value) {
                return (this.setState({ studentUnionTitle: item.label }))
              }
              return (null)
            })
          }}
          items={studentUnionArray}
          value={this.state.studentUnion}
          isShowing={this.state.showStudentUnionPicker}
          close={() => this.setState({ showStudentUnionPicker: false })}
        />
      </View>
    )
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
  }
}

export default RegistrationScreen;
