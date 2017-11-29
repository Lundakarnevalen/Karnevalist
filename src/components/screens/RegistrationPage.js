import React, { Component } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'
import Header from '../common/Header'
import Input from '../common/Input'
import DKPicker from '../common/DKPicker'
import CustomButton from '../common/CustomButton'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class RegistrationPage extends Component {

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
      studenUnion: '',
      studentUnionInfo: '',
      showShirtPicker: false,
      showStudentUnionPicker: false
    }
  }

  render() {
    console.log(this.state.firstName)
    console.log(this.state.lastName)
    const { flexHorizontal } = styles;
    return (
      <View>
        <Header title='Create Profile' />
        <ScrollView style={{ height: (height - 64) }}>
          <Input
          title='First name'
          onChangeText={(firstNameInput) => {
              this.setState({ firstName: firstNameInput })
            }
          }
          />
          <Input
          title='Last name'
          onChangeText={(lastNameInput) => {
              this.setState({ lastName: lastNameInput })
            }
          }
          />
          <Input
          title='Email'
          onChangeText={(emailInput) => {
              this.setState({ email: emailInput })
            }
          }
          />
          <Input
          title='Confirm email'
          onChangeText={(emailInput) => {
              this.setState({ confirmedEmail: emailInput })
            }
          }
          />
          <Input
          title='Address'
          onChangeText={(addressInput) => {
              this.setState({ address: addressInput })
            }
          }
          />
          <View style={flexHorizontal}>
            <Input
            title='Postcode'
            onChangeText={(postcodeInput) => {
                this.setState({ postcode: postcodeInput })
              }
            }
            width={width / 2}
            />
            <Input
            title='City'
            onChangeText={(cityInput) => {
                this.setState({ city: cityInput })
              }
            }
            width={width / 2}
            />
          </View>
          <Input
          title='Phone number'
          onChangeText={(phoneNbrInput) => {
              this.setState({ phoneNbr: phoneNbrInput })
            }
          }
          />
          <Input
          title='Food preferences'
          onChangeText={(foodPreferencesInput) => {
              this.setState({ foodPreferences: foodPreferencesInput })
            }
          }
          />
          <CustomButton
            text={this.state.shirtSize === '' ? 'Välj tröjstorlek' : this.state.shirtSize}
            textStyle={{
              color: 'white',
              fontSize: 16
            }}
            buttonStyle={{
              backgroundColor: '#f4376d',
              padding: 10
            }}
            onPress={() => this.setState({ showShirtPicker: true })}
          />
          <CustomButton
            text={this.state.studenUnion === '' ? 'Choose studenunion' : this.state.studenUnion}
            textStyle={{
              color: 'white',
              fontSize: 16
            }}
            buttonStyle={{
              backgroundColor: '#f4376d',
              padding: 10
            }}
            onPress={() => this.setState({ showStudentUnionPicker: true })}
          />
          <Input
          title='What did you do there?'
          onChangeText={(studentUnionInfoInput) => {
              this.setState({ studentUnionInfo: studentUnionInfoInput })
            }
          }
          />
        </ScrollView>
        <DKPicker
          onValueChange={(shirtSize) => {
            this.setState({ shirtSize })
          }}
          items={[
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' }
          ]}
          isShowing={this.state.showShirtPicker}
          close={() => this.setState({ showShirtPicker: false })}
        />
        <DKPicker
          onValueChange={(studenUnion) => {
            this.setState({ studenUnion })
          }}
          items={[
            { label: 'Lunds Nation', value: 'lundsNation' },
            { label: 'Kalmar Nation', value: 'kalmarNation' }
          ]}
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
}

export default RegistrationPage;
