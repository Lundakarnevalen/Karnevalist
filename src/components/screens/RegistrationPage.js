import React, { Component } from 'react'
import { View } from 'react-native'
import Header from '../common/Header'
import Input from '../Input'

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
      shirtSize: ''
    }
  }

  render() {
    console.log(this.state.firstName)
    console.log(this.state.lastName)
    const { flexHorizontal } = styles;
    return (
      <View>
        <Header title='Create Profile' />
        <Input
        title='First name*'
        onChangeText={(firstNameInput) => {
            this.setState({ firstName: firstNameInput })
          }
        }
        />
        <Input
        title='Last name*'
        onChangeText={(lastNameInput) => {
            this.setState({ lastName: lastNameInput })
          }
        }
        />
        <Input
        title='Email*'
        onChangeText={(emailInput) => {
            this.setState({ email: emailInput })
          }
        }
        />
        <Input
        title='Confirm email*'
        onChangeText={(emailInput) => {
            this.setState({ confirmedEmail: emailInput })
          }
        }
        />
        <Input
        title='Address*'
        onChangeText={(addressInput) => {
            this.setState({ address: addressInput })
          }
        }
        />
        <View style={flexHorizontal}>
          <Input
          title='Postcode*'
          onChangeText={(postcodeInput) => {
              this.setState({ postcode: postcodeInput })
            }
          }
          />
          <Input
          title='City*'
          onChangeText={(cityInput) => {
              this.setState({ city: cityInput })
            }
          }
          />
        </View>
        <Input
        title='Phone number*'
        onChangeText={(phoneNbrInput) => {
            this.setState({ phoneNbr: phoneNbrInput })
          }
        }
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
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  }
}

export default RegistrationPage;
