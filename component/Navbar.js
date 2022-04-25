import React from 'react';
import { Text, View, 
    TouchableOpacity ,StyleSheet, Image, StatusBar,Platform   } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';

const propTypes = {
    main : PropTypes.bool,
    
};
const defaultProps = {
    main : false
};
class Navbar extends React.PureComponent {
    
    render() {
        
        const {navigation, main} = this.props
        return (
            //style={styles.AndroidSafeArea}
            <SafeAreaView >
                { main 
                ? 
                    (
                    
                        <View style = {styles.mainNav}>
                            <Image 
                            style = {styles.logo}
                            source = {require('../assets/images/movies.png')}/>

                            <TouchableOpacity  onPress={ ()=>{
                                navigation.navigate('Search')
                                }}>
                                <Icon name={'search-outline'} size={30} 
                                color={'#000'} />
                            </TouchableOpacity>
                        </View>
                    
                    ) 
                :
                <View>
                    <TouchableOpacity  onPress={ ()=>{
                        navigation.goBack()
                    }}>
                        <Icon name={'chevron-back'} size={40} 
                        color={'#000'} />
                    </TouchableOpacity>
                </View>
                }
            </SafeAreaView >
            
        );
        
    }
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight  : 0
      },
      mainNav:{
        // marginTop:100,
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor:"grey",
        // padding:30,
        alignItems: 'center'
      },
    logo : {
        width : 50,
        height: 50,  
    }
})

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Navbar;