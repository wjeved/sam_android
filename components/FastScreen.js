import React, { useRef, useEffect, useState, useContext } from 'react';
import { Animated, View, Button, Dimensions } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import LottieView from 'lottie-react-native';

import FirstImg from '../assets/json/splash.json';

// styles
import styles from '../assets/styles/styles';

const { height, width } = Dimensions.get('window')

const animations = [
  FirstImg
];


export default function FastScreen({ navigation }) {

  const [currentAnimation, setCurrentAnimation] = useState();
  const animation = useRef(null);

  const [lang, setLang] = React.useState(""); 


  useEffect(() => {
    getLanguage();
    
  }, [currentAnimation]);

  const getLanguage = async () => {
    try {

      if (animation.current) {
        animation.current.play();
        setTimeout(async function() {

          

          let lang = await AsyncStorage.getItem("lang");

          console.log("언어는? " + lang);
          if(lang == null) {
            lang = "KR";
          }
          
          
          if (lang == "EN") {
            //console.log("언어 : " + lang);
            //console.log("영문");
            navigation.replace("EnPage");
          } else {
            //console.log("언어 : " + lang);
            //console.log("한국");
            navigation.replace("Page");
          }
        }, 3000);
      }

      
      
    } catch(e) {
      
    }
  
    setLang(lang);
  }

  const changeAnimation = () => {
    setCurrentAnimation(animations[0]);
  }

    return (
      <View style={styles.container2}>
      <LottieView
        ref={animation}
        style={{
          width: width,
          flexGrow: 1, 
          alignSelf: 'center',
        }}
        autoPlay={true}
        resizeMode='cover'
        loop={false}
        source={FirstImg}
      />
    </View>
    );
  }
  