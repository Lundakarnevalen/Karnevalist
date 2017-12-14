import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

class HomeScreenTimeLine extends Component {

	constructor(props) {
		super(props)
		this.state = {
			timelineProgress: 3
		}
	}

	getIconColor(nbr) {
		if (nbr < this.state.timelineProgress) {
			return 'black'
		}
		return 'transparent'
	}

  render() {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
    			justifyContent: 'center',
    			alignItems: 'center'
    		}}
			>
      	<View 
      		style={{ 
      			backgroundColor: 'transparent',
      			flexDirection: 'row',
      			justifyContent: 'center',
      			alignItems: 'center'
      		}}
      	>
      		<View style={[styles.roundView, { marginRight: -5 }]}>
      			<Ionicons
      				name='md-checkmark'
      				size={Dimensions.get('window').width / 7}
      				color={this.getIconColor(0)}
      			/>
       		</View>
      		<View style={styles.barView} />
      		<View style={[styles.roundView, { marginRight: -5, marginLeft: -5 }]}>
      			<Ionicons
      				name='md-checkmark'
      				size={Dimensions.get('window').width / 7}
      				color={this.getIconColor(1)}
      			/>
      		</View>
      		<View style={styles.barView} />
      		<View style={[styles.roundView, { marginRight: -5, marginLeft: -5 }]}>
      			<Ionicons
      				name='md-checkmark'
      				size={Dimensions.get('window').width / 7}
      				color={this.getIconColor(2)}
      			/>
      		</View>
      		<View style={styles.barView} />
      		<View style={[styles.roundView, { marginLeft: -5 }]}>
      			<Ionicons
      				name='md-checkmark'
      				size={Dimensions.get('window').width / 7}
      				color={this.getIconColor(3)}
      			/>
      		</View>
      	</View>
      	<View 
					style={{
      			flexDirection: 'row',
      			alignItems: 'center',
      			justifyContent: 'center'
      		}}
      	>
      		<View style={styles.textView}>
      			<Text style={styles.textStyle}>Create a profile</Text>
      		</View>
      		<View style={styles.bufferView} />
      		<View style={styles.textView}>
      			<Text style={styles.textStyle}>Attend the registration</Text>
      		</View>
      		<View style={styles.bufferView} />
      		<View style={styles.textView}>
      			<Text style={styles.textStyle}>Choose your sections</Text>
      		</View>
      		<View style={styles.bufferView} />
      		<View style={styles.textView}>
      			<Text style={styles.textStyle}>Send your application</Text>
      		</View>
      	</View>
      </View>
    );
  }
}

const styles = {
	roundView: {
		backgroundColor: '#F7A021',
		height: Dimensions.get('window').width / 7,
		width: Dimensions.get('window').width / 7,
		borderRadius: 90,
		justifyContent: 'center',
		alignItems: 'center'
	},
	barView: {
		height: Dimensions.get('window').width / 9 / 4,
		width: Dimensions.get('window').width / 8,
		backgroundColor: '#F7A021'
	},
	bufferView: {
		height: Dimensions.get('window').width / 9 / 4,
		width: Dimensions.get('window').width / 8,
		backgroundColor: 'transparent',
		margin: -10
	},
	textView: {
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		width: (Dimensions.get('window').width / 7) + 10
	},
	textStyle: {
		textAlign: 'center',
		fontSize: 11
	}
}

export default HomeScreenTimeLine;
