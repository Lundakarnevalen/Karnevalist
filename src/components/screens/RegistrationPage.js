import React, { Component } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'
import Header from '../common/Header'
import Input from '../common/Input'
import Dropdownpicker from '../common/Dropdownpicker'

const width = Dimensions.get('window').width

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
      <ScrollView>
        <Header title='Create Profile' />
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
        <Dropdownpicker
          default="Matpreferenser"
          navigation={this.props.navigation}
          items={['Glutenfri', 'Vegan', 'Hästkött']}
        />
        <Dropdownpicker
          default="Tröjstorlek"
          navigation={this.props.navigation}
          items={['S', 'M', 'L', 'XL', 'XXL']}
        />
        <Dropdownpicker
          default="Jag är/har varit aktiv i kår..."
          navigation={this.props.navigation}
          items={['Teknologkåren', 'Något annat']}
        />
        <Dropdownpicker
          default="Jag är/har varit aktiv i nation..."
          navigation={this.props.navigation}
          items={['Kalmar nation', 'Smålands', 'Lunds nation']}
        />
      </ScrollView>
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
  }
}

export default RegistrationPage;
