// import React, {useState} from 'react';
// import { Text,TouchableOpacity,SafeAreaView, StyleSheet, TextInput, View } from "react-native";
// // import {SafeAreaView} from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons'
// import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
// import {searchMovieTv} from '../services/services'

// const Search = ({navigation}) => {
//     const [text, onChangeText] = useState( );
//     const [searchResult, setSearchResult] = useState( );
//     const onSubmit = (query)=>{
//         console.log(query);
//         onChangeText(query);

//         searchMovieTv(query, type).then((data)=>{
//             setSearchResult(data)
//         })
//     }
//   return (
//     <React.Fragment>
//       <SafeAreaView>
//         <View style={styles.container}>
//             <View style={styles.form }>
//                 <TextInput
//                 placeholder='search movie or tv show'
//                 style={styles.input}
//                 onChangeText={onChangeText}
//                 value={text}
//                 />
//             </View>
//             <TouchableOpacity  onPress={ ()=>{
//                                 onSubmit(text)
//                                 }}>
//                                 <Icon name={'search-outline'} size={30} 
//                                 color={'#000'} />
//                             </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//       <Text>{text}</Text>
//     </React.Fragment>
//   );
// };

// const styles = StyleSheet.create({
//     container:{
        
//         padding : 10, 
//         paddingTop: 60,
//         flexDirection: 'row',
//     },
//   input: {
//       borderRadius : 15,
//     height: 50,
//     borderWidth: 0.5,
//     padding: 8,
//   },
//   form:{
//       flexBasis:'auto',
//       flexGrow: 1,
//       paddingRight: 8
//   }
// });

// export default Search;


import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';
import Card from '../component/Card';
import Error from '../component/Error';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = (query) => {
    Promise.all(
        [
            searchMovieTv(query, 'movie'), 
            searchMovieTv(query, 'tv')]
        )
      .then(([movies, tv]) => {
        console.log(movies)
        const data = [...movies, ...tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
      console.log(query)
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={'Search Movie or TV Show'}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name={'search-outline'} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchItems}>
          {/* Searched items results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={4}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {/* When searched but no results */}
          {searchResults && searchResults.length == 0 && (
            <View style={styles.noResults}>
              <Text>No results matching your criteria.</Text>
              <Text>Try different keywords.</Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text>Type something to start searching</Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 8,
  },
  container: {
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },

  searchItems: {
    padding: 5,
  },

  noResults: {
    paddingTop: 20,
  },
});

export default Search;
