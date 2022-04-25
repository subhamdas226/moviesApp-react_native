import React from 'react';
import { Pressable,Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
class PlayButton extends React.PureComponent {
    state = {  }
    
    render() {
        const { handlePress} = this.props;
        return (
            //onPress have a default function in which we have to pass our custom function
            // and that custom functn basically we are receiving from another component using props
            // handlePress = {()=>{ }} like this ; this is custom func passing as a key value to their child component
           <Pressable onPress = { ()=> handlePress() } style = {styles.button}>
               <Icon name={'caret-forward-outline'} size={40} color={'#fff'}/>
           </Pressable> 
        );
    }
}

const styles = StyleSheet.create({
   button : {
       alignContent: 'center',
       alignItems:'center',
       borderRadius : 50,
       width : 63,
       padding : 10,
       backgroundColor : '#4481FC'
   }
})

export default PlayButton;