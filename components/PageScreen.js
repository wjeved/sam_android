import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Animated, Dimensions, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// apollo
import { useMutation } from '@apollo/client';

// androidId
import * as Application from 'expo-application';

// Util
import { timeForToday, makeFriendly, addressSplit, comma, cutByLen } from '../src/Util';

import * as SecureStore from 'expo-secure-store';

// svg 아이콘
import MenuIcon1 from '../assets/images/icon_menu1.svg'; // 메뉴아이콘
import MenuIconOn1 from '../assets/images/icon_menu1_on.svg';
import MenuIcon2 from '../assets/images/icon_menu2.svg';
import MenuIconOn2 from '../assets/images/icon_menu2_on.svg';
import MenuIcon3 from '../assets/images/icon_menu3.svg';
import MenuIconOn3 from '../assets/images/icon_menu3_on.svg';
import MenuIcon4 from '../assets/images/icon_menu4.svg';
import MenuIconOn4 from '../assets/images/icon_menu4_on.svg';
import MenuIcon5 from '../assets/images/icon_menu5.svg';
import MenuIconOn5 from '../assets/images/icon_menu5_on.svg';
import MenuIcon6 from '../assets/images/alarm_icon.svg';
import MenuIconOn6 from '../assets/images/alarm_icon_on.svg';
import MenuIcon7 from '../assets/images/icon_menu7.svg';
import MenuIconOn7 from '../assets/images/icon_menu7_on.svg';

import LogoIcon2 from '../assets/images/krlogo.svg';

// styles
import styles from '../assets/styles/styles';

import AuthContext from '../src/AuthContext';


// Page
export default function PageScreen({ navigation }) {

  const userInfo = useContext(AuthContext);
  //console.log(userInfo);


  const [lang, setLang] = React.useState("KR"); 


  /* 라이프사이클 컨트롤 */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    });
    return () => {
    }
  }, []);


const setLangProc = async (val) => {
  await setFilter("lang", val);
  setLang(val);
  if (val == "EN") {
    navigation.navigate("EnPage"); 
  }
}

/* asyncstorage */
const setFilter = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
}

  // 가로 너비 구하기
  let DevideWidth = Dimensions.get('window').width;

    return (
      <View style={styles.container}>
        {/* 헤더 탭 */}
        <View style={styles.headerAreaOn}>

          <LogoIcon2 width={131} height={25} style={styles.logo} />

          <TouchableOpacity onPress={()=>setLangProc("EN")} style={styles.lang}>
            <Text style={styles.langText}>한국어</Text>
          </TouchableOpacity>
        </View>
        
      
        
        <View style={styles.content2}>
            

          <ScrollView style={styles.mainScrollView}>
            
          <Text style={styles.mainTitle}>Railway System</Text>
            <View style={styles.mainBox}>
              
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Rolling Stock", cate3:"MRT"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>MRT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Rolling Stock", cate3:"APM"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>APM</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Rolling Stock", cate3:"AGT"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>AGT</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainBox}>
              
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Rolling Stock", cate3:"LRT"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>LRT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Rolling Stock", cate3:"DEMU"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>DEMU</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Electric Equipment", cate3:"Converter Inverter"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText2}>Converter{'\n'}Inverter</Text>
              </TouchableOpacity>

            </View>
            <View style={styles.mainBox}>
              
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Electric Equipment", cate3:"VVVF Inverter"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText2}>VVVF{'\n'}Inverter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Electric Equipment", cate3:"Auxilary Power Supply"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>APS</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Electric Equipment", cate3:"Train Control Monitoring System"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>TCMS</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainBox}>
              
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Electric Equipment", cate3:"Public Address"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText2}>Public{'\n'}Address</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Electric Equipment", cate3:"Passenger Information Display"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>PID</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"Electric Equipment", cate3:"Other parts"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>Other parts</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"E&M System", cate3:"Platform Screen Door"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>PSD</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"E&M System", cate3:"Switches"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>Switches</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Railway System", cate2:"E&M System", cate3:"Test Equipment"})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText2}>Test{'\n'}Equipment</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.mainTitle2}>Electric Bus</Text>
            <View style={styles.mainBox}>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Electric Bus", cate2:"Apollo 1100", cate3:""})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>Apollo 1100</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Electric Bus", cate2:"Apollo 900", cate3:""})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>Apollo 900</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Electric Bus", cate2:"Apollo 750", cate3:""})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>Apollo 750</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Electric Bus", cate2:"Battery Charger", cate3:""})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>Battery{'\n'}Charger</Text>
              </TouchableOpacity>
              <View
              style={styles.mainItemText3}>
              </View>
              <View
              style={styles.mainItemText3}>
              </View>
            </View>

            <Text style={styles.mainTitle2}>Smart Energy</Text>
            <View style={styles.mainBox}>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Smart Energy", cate2:"Energy storage system", cate3:""})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>ESS</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Page2", {cate1:"Smart Energy", cate2:"Micro Grid", cate3:""})} 
              style={styles.mainItem}>
                <Text style={styles.mainItemText}>Micro Grid</Text>
              </TouchableOpacity>
              <View
              style={styles.mainItemText3}>
              </View>
            </View>

          </ScrollView>
        </View>

        {/* 메뉴 */}
        <View style={styles.bottomMenu}>
          <TouchableOpacity style={styles.bottomTabBtnOn}
            onPress={() => {
              navigation.navigate('Page', {});
            }} >
            <MenuIconOn1 width={32} height={22} />
            <Text style={styles.bottomTabon}>우진산전</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTabBtnOff}
            onPress={() => {
              navigation.replace('PageS', {});
            }}>
            <MenuIcon2 width={36} height={22} />
            <Text style={styles.bottomTaboff}>검색</Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.bottomTabBtnOff}
            onPress={() => {
              navigation.replace('Page6', {});
            }} >
            <MenuIcon3 width={36} height={22} />
            <Text style={styles.bottomTaboff}>문의내역</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomTabBtnOff} onPress={() => {
              navigation.push('Scan', {});
            }}>
            <MenuIcon5 width={38} height={22} />
            <Text style={styles.bottomTaboff}>QR스캔</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomTabBtnOff} onPress={() => {
              navigation.push('Page7', {});
            }}>
            <MenuIcon7 width={36} height={22} />
            <Text style={styles.bottomTaboff}>관심제품</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  