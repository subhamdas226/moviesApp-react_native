import React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import Card from './Card'
import PropTypes from 'prop-types';

const propTypes = {
    errorText1 : PropTypes.string,
    errorText2 : PropTypes.string,
};
const defaultProps = {
    errorText1 : 'Oops! Something went wrong',
    errorText2 : 'Make sure internet is working or restart the App',
};
class Error extends React.PureComponent {
    
    render() {
        const {errorText1, errorText2} = this.props;
        return (
            <View style = {StyleSheet.container}>
                <Text style = {StyleSheet.text}>{errorText1}</Text>
                <Text style = {StyleSheet.text}>{errorText2}</Text>
                </View>
        );
    }
}
const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    text:{
        fontWeight:'bold'
    }
})
Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
export default Error;