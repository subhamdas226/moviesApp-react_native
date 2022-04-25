import React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import Card from './Card'
import PropTypes from 'prop-types';

    const propTypes = {
        title : PropTypes.string,
        content : PropTypes.array,
    };
class List extends React.PureComponent {
    
    render() {
        const { navigation, title, content } = this.props
        return (
            <View style = {styles.list}>
                <View>
                <Text style = {styles.text}>{title}</Text>
                </View>
                <View>
                    <FlatList 
                    data={content}
                    horizontal = {true}
                    renderItem = {({item}) =>{
                        // return <Text>{item.title}</Text>
                        return <Card navigation={navigation} item={item} />
                    }}
                    >
                </FlatList>    
                </View>
            </View>

            
            
        );
    }
}

const styles = StyleSheet.create({
    list : {
        marginTop : 25,
    },
    text:{
        fontSize : 30,
        fontWeight : 'bold',
        padding:10,
        paddingBottom : 20,
        color : 'black'
    }
})
List.propTypes = propTypes;
export default List;