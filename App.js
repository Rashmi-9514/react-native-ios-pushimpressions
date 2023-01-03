import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

import DefaultPreference from 'react-native-default-preference';

const CleverTap = require('clevertap-react-native');
CleverTap.setDebugLevel(3);
        // for iOS only: register for push notifications
        CleverTap.registerForPush();
   
        CleverTap.initializeInbox();
        CleverTap.createNotificationChannel("1", "1", "CT React Native Testing", 5, true);

const appGroupIdentifier = "group.com.ct-push";

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    state = {
      email : '',
      password: '',
      name:'',
      phone_no:'',
      id:''
    }
  }

  onUser_Login = () => {
    alert('User Profile Updated');
  
   
     alert(this.state.email);
     console.log(this.state.email);
   
    //On user Login
    CleverTap.onUserLogin({
        'Name': this.state.name, 
        'Email': this.state.email, 
        'Identity':this.state.id,
        'custom1': 123,
        'birthdate': new Date('1992-12-22T06:35:31'),
        'Phone':this.state.phone_no
    })
    console.log("Email before calling storage",this.state.email);
    this.saveUserDataToSharedStorage(this.state.email);
  //SharedGroupPreferences.setItem("email", this.email, appGroupIdentifier);
  //console.log(SharedGroupPreferences.getItem("email", appGroupIdentifier));
    
  }
  onProfile = () => {
  CleverTap.profileSet({"Identity":this.state.phone_no,'Email': this.state.email});
  console.log("Profile Set,",this.state.email);
  }
  get_CTid=()=>{
    CleverTap.getCleverTapID((err, res) => {
      console.log('CleverTapID', res, err);
      alert(`CleverTapID: \n ${res}`);
    });
  //CleverTap.recordEvent('Viewed Clevertap ID');
  CleverTap.recordEvent('Check CTid');
  }

async saveUserDataToSharedStorage(data) {

    try {
      console.log("Email ID from saveUserDataToSharedStorage",data)
      console.log("Email ID this.state.email",this.state.email)
      await DefaultPreference.setItem("email", this.state.email, appGroupIdentifier)
      this.loadUsernameFromSharedStorage()
    } catch(errorCode) {
      // errorCode 0 = There is no suite with that name
      console.log("Saved data error",errorCode)
    }
  }
  async loadUsernameFromSharedStorage() {
    try {
      const loadedData = await DefaultPreference.getItem("email", appGroupIdentifier)
      console.log("This is LoadedData",loadedData)
      //this.setState({username:loadedData.name})
    } catch(errorCode) {
      // errorCode 0 = there is no value for that key
      console.log("loaded data ka error code",errorCode)
    }
  }
 

  onClickListener = (viewId) => {
   Alert.alert("Alert", "Button pressed "+viewId);
 }
 
  render() {
    return (

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({name:text})}/>
          </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({email:text})}/>
          </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({password: text})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Phone Number"
              secureTextEntry={false}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({phone_no: text})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Identity"
              secureTextEntry={false}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({id: text})}/>
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onUser_Login()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={()=>this.onProfile()} >
            <Text>Set Profile?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.get_CTid()}>
            <Text>Get CleverTapID</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
