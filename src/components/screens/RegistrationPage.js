import React, { Component } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'
import Header from '../common/Header'
import Input from '../common/Input'
import DKPicker from '../common/DKPicker'
import CustomButton from '../common/CustomButton'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const itemArray = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' }
];

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
      shirtSize: 'small',
      showShirtPicker: false
    }
  }

  renderDKPicker() {
      return (
        <DKPicker
          onValueChange={(shirtSize) => {
            this.setState({ shirtSize })
          }}
          items={itemArray}
          value={this.state.shirtSize}
          isShowing={this.state.showShirtPicker}
          close={() => this.setState({ showShirtPicker: false })}
        />
      );
  }

  render() {
    console.log(this.state.firstName)
    console.log(this.state.lastName)
    const { flexHorizontal } = styles;
    return (
      <View>
        <Header
        title='Create Profile'
        navigation={this.props.navigation}
        />
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
          <CustomButton
            text={this.state.shirtSize}
            onPress={() => this.setState({ showShirtPicker: true })}
          />
        </ScrollView>
        {this.renderDKPicker()}
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
