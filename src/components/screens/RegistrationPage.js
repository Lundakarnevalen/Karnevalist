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
    return (
      <View>
        <Header title='Create Profile' />
        <Input
        title='First name*'
        onChangeText={(firstName) => {
            this.setState({ firstName: firstName })
          }
        }
        />
        <Input
        title='Last name*'
        onChangeText={(lastName) => {
            this.setState({ lastName: lastName })
          }
        }
        />
        <Input
        title='Email*'
        onChangeText={(email) => {
            this.setState({ email: email })
          }
        }
        />
        <Input
        title='Confirm email*'
        onChangeText={(email) => {
            this.setState({ confirmedEmail: email })
          }
        }
        />
        <Input
        title='Address*'
        onChangeText={(address) => {
            this.setState({ address: address })
          }
        }
        />
        <Input
        title='Postcode*'
        onChangeText={(postcode) => {
            this.setState({ postcode: postcode })
          }
        }
        />
        <Input
        title='City*'
        onChangeText={(city) => {
            this.setState({ city: city })
          }
        }
        />
        <Input
        title='Phone number*'
        onChangeText={(phoneNbr) => {
            this.setState({ phoneNbr: phoneNbr })
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
  }
}

export default RegistrationPage;
