import React , {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, 
    LogBox ,FlatList, ActivityIndicator } from 'react-native';
import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentaryMovies } from '../services/services'
import { SliderBox } from "react-native-image-slider-box";
import  List  from '../component/List' //pure component
import  Error  from '../component/Error'
const dimensions = Dimensions.get('screen');
import Navbar from '../component/Navbar'

console.LogBox = ['Remote debugger'];

const Home = ({ navigation }) => {
    // let title = "Movie Name"
//   const [movie, setMovie] = useState('');
//   const [popularMovies, setpopularMovies] = useState([]);
//   const [popularTv, setpopularTv] = useState([]);
//   const [familyMovies, setFamilyMovies] = useState([]);
//   const [movieImages, setMovieImages] = useState('');
//   const [error, setError] = useState(false);
const [movie, setMovie] = useState();
  const [popularMovies, setpopularMovies] = useState();
  const [popularTv, setpopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [discoverMovies, setDiscoverMovies] = useState();
  const [movieImages, setMovieImages] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = (()=>{
      return Promise.all([
        getPopularMovies(),
        getUpcomingMovies(),
        getPopularTv(),
        getFamilyMovies(),
        getDocumentaryMovies()
      ])
  })
  // we use state when we render value from component to template
  //it needs auto refresh, so our data could display even value assign late 
  useEffect(()=>{

    getData().then( (
        [
            popularMoviesData,
            upcomingMovieImagesData,
            popularTvData,
            familyMoviesData,
            discoverMoviesData
        ]
    )=>{
        setMovie(popularMoviesData[0]);
        setpopularMovies(popularMoviesData);
        const movieImagesArray = [];
        upcomingMovieImagesData.forEach(movie => {
            movieImagesArray.push("https://image.tmdb.org/t/p/w500"+movie.poster_path)
        });
        setMovieImages(movieImagesArray);
        setpopularTv(popularTvData);
        setFamilyMovies(familyMoviesData);
        setDiscoverMovies(discoverMoviesData);
        
    }).catch( () =>{

        setError(true);

    }).finally( () =>{
        setLoaded(true);
    })

    // getPopularMovies().then( movies =>{
    //   // title = movies[0].originial_title;
    //   setMovie(movies[0]);
    //   setpopularMovies(movies);
      
    // }).catch((err)=>{
    //   setError(err);
    // })

    // getUpcomingMovies().then( movies =>{
    //     const movieImagesArray = [];
    //     movies.forEach(movie => {
    //         movieImagesArray.push("https://image.tmdb.org/t/p/w500"+movie.poster_path)
    //     });
    //     // console.log("movieImagesArray::",movieImagesArray)
    //     setMovieImages(movieImagesArray);
        
    //   }).catch((err)=>{
    //     setError(err);
    //   })

    //   getPopularTv().then( tv =>{
    //     setpopularTv(tv);
        
    //   }).catch((err)=>{
    //     setError(err);
    //   })
    
    //   getFamilyMovies().then( mv =>{
    //     setFamilyMovies(mv);
        
    //   }).catch((err)=>{
    //     setError(err);
    //   })


  }, [])

  

    return (
        <React.Fragment>
                         {loaded && !error && (
                <ScrollView>
                    
                {movieImages && (
                    <View style={styles.sliderContainer}>
                       

                {/* <Text>{movie.original_title}</Text>
                <Text>{movie.release_date}</Text>
                <Text>{movie.vote_average}</Text>
                <Text>{movie.overview}</Text>
                {error && <Text style={{ color: 'red'}}>Error in server</Text>} */}
                <SliderBox 
                images={movieImages instanceof Array ? movieImages : [] } 
                dotStyle = { styles.sliderStyle}
                sliderBoxHeight={ dimensions.height / 1.5 }
                autoplay = {true}
                circleLoop = {true}
                />
             
                
                </View>
                
               
            )}
        {/* <View style = { styles.carousal }>
            <FlatList 
                data={popularMovies}
                horizontal = {true}
                renderItem = {({item}) =>{
                    return <Text>{item.title}</Text>
                }}
                >
            </FlatList>    
        </View> */}
        {popularMovies && (
            <View style = { styles.carousal }>
                <List navigation = {navigation} title="Popular Movies" content = {popularMovies}></List>
            </View>
        )}
        

        {popularTv && (
            <View style = { styles.carousal }>
                <List navigation = {navigation} title="Popular TV Shows" content = {popularTv}></List>
            </View>
        )}
        

        {familyMovies && (
            <View style = { styles.carousal }>
                <List navigation = {navigation} title="Family Movies" content = {familyMovies}></List>
            </View>
        )}

        {discoverMovies && (
            <View style = { styles.carousal }>
                <List navigation = {navigation} title="Discover Movies" content = {discoverMovies}></List>
            </View>
        )}
        
                </ScrollView>
            )}
            {!loaded && <ActivityIndicator size = "large"/>}
            {error && <Error/>}
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    sliderContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    sliderStyle : {
        height: 0,
    },
    carousal : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Home;