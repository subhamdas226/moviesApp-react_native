import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-video-controls';

const Video = ( {onClose} ) =>{
    return (
        <VideoPlayer
                onBack = { ()=> onClose() }

                onEnd = { ()=> onClose() }

                fullscreenOrientation = "all"
                source={{
                  uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
                }}
        />
    )
}

export default Video;