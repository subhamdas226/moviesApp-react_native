import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
  Pressable,
} from 'react-native';
import {getMovie} from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat, {masks} from 'dateformat';
import PlayButton from '../component/PlayButton';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
// import VideoPlayer from 'react-native-video-controls';
// import VideoPlayer from 'react-native-video-controls';
import Video from '../component/Video';

const height = Dimensions.get('screen').height;
const dimen = Dimensions.get('screen');

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const placeHolderImage = require('../assets/images/no-image.jpg');

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);
  // console.log(movieDetail)

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <View>
              {/* <Text>{movieDetail.title || movieDetail.original_name}</Text> */}
              <Image
                resizeMode="cover"
                style={styles.image}
                source={
                  movieDetail.poster_path
                    ? {
                        uri:
                          'https://image.tmdb.org/t/p/w500' +
                          movieDetail.poster_path,
                      }
                    : placeHolderImage
                }></Image>

              <View style={styles.container}>
                <View style={styles.PlayButton}>
                  <PlayButton handlePress={videoShown} />
                </View>
                <Text style={styles.movieTitle}>
                  {movieDetail.title || movieDetail.original_name}
                </Text>
                {movieDetail.genres && (
                  <View style={styles.genresContainer}>
                    {movieDetail.genres.map(genre => {
                      return (
                        <Text style={styles.genre} key={genre.id}>
                          {genre.name}
                        </Text>
                      );
                    })}
                  </View>
                )}
              </View>
              <View style={styles.rate}>
                <StarRating
                  fullStarColor="gold"
                  disabled={true}
                  maxStars={5}
                  rating={ movieDetail.vote_average / 2 }
                />
              </View>
              <Text style={styles.overview}>{ movieDetail.overview }</Text>
              <Text style={styles.relDate}>
                {'Release Date: ' +
                  dateFormat( movieDetail.release_date, 'd mmmm, yyyy') }
              </Text>
            </View>
          </ScrollView>

          <Modal
            supportedOrientations = { ['portrait', 'landscape'] } 
            animationType="slide" visible = { modalVisible } 
            >
            
            <View style={styles.videoModal}>
              <Video onClose= { videoShown } />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  rate: {
    // flex:1,
    // width: dimen.width / 1,
    alignItems: 'center',
  },
  overview: {
    padding: 15,
    fontSize: 20,
  },
  relDate: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },
  PlayButton: {
    position: 'absolute',
    top: -28,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default Detail;
