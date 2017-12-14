import React, { Component } from 'react'
import { Alert, ScrollView, View, Text, Dimensions } from 'react-native'
import axios from 'axios'
import Header from '../common/Header'
import Input from '../common/Input'
import DKPicker from '../common/DKPicker'
import CustomButton from '../common/CustomButton'
import ButtonChoiceManager from '../common/ButtonChoiceManager'

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
    return (
      <View>
        <Header
          title='Create Profile'
          navigation={this.props.navigation}
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
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder='Last name'
            onChangeText={(lastNameInput) => {
              this.setState({ lastName: lastNameInput })
            }}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder='Email'
            onChangeText={(emailInput) => {
              this.setState({ email: emailInput })
            }}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder='Confirm email'
            onChangeText={(emailInput) => {
              this.setState({ confirmedEmail: emailInput })
            }}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder='Address'
            onChangeText={(addressInput) => {
              this.setState({ address: addressInput })
            }}
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
            />
            <Input
              placeholder='City'
              onChangeText={(cityInput) => {
                this.setState({ city: cityInput })
              }}
              width={(width / 2) - 4}
              style={{ marginBottom: 8 }}
            />
          </View>
          <Input
            placeholder='Phone number'
            onChangeText={(phoneNbrInput) => {
              this.setState({ phoneNbr: phoneNbrInput })
            }}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder='Food preferences'
            onChangeText={(foodPreferencesInput) => {
              this.setState({ foodPreferences: foodPreferencesInput })
            }}
            style={{ marginBottom: 8 }}
          />
          <Text>
            Choose shirt size
          </Text>
          <CustomButton
            text={this.state.shirtSizeTitle === '' ? 'Choose' : this.state.shirtSizeTitle}
            style='standardButton'
            width={width}
            onPress={() => this.setState({ showShirtPicker: true })}
          />
          <ButtonChoiceManager
            buttonInputVector={['I have a drives license']}
            multipleChoice
          />
          <Text>
            Choose student union
          </Text>
          <CustomButton
            text={this.state.studentUnionTitle === '' ? 'Choose' : this.state.studentUnionTitle}
            style='standardButton'
            width={width}
            onPress={() => this.setState({ showStudentUnionPicker: true })}
          />
          <Input
            title='What did you do at the student union?'
            onChangeText={(studentUnionInfoInput) => {
              this.setState({ studentUnionInfo: studentUnionInfoInput })
            }}
          />
          <ButtonChoiceManager
            buttonInputVector={['I was engaged in the karneval 2014']}
            multipleChoice
          />
          <CustomButton
            text='Register'
            style='standardButton'
            width={width}
            onPress={() => {
              axios.post(
                'http://146.185.173.31:3000/register',
                {
                  email: this.state.email,
                  password: '123',
                  postNumber: this.state.postcode,
                  talent: 'saknas',
                }
              ).then((response) => {
                if (response.data.success) {
                  this.props.navigation.navigate('HomeScreen')
                }
              }
              ).catch((error) => {
                let msg = '';
                if (error.message.includes('400')) {
                  msg = 'Invalid email or password';
                } else if (error.message.includes('401')) {
                  msg = 'Invalid email or password';
                } else if (error.message.includes('404')) {
                  msg = 'Something went wrong...';
                } else if (error.message.includes('500')) {
                  msg = 'Internal error, please try again later';
                }
                Alert.alert(
                  'Error',
                  msg
                );
              })
            }}
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
  header: {
    backgroundColor: 'pink',
    alignItems: 'center'
  },
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
