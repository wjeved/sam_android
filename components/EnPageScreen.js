import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Animated, Dimensions, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// apollo
import { useMutation } from '@apollo/client';

// graphQl
import { GETMEMBER_MT, TRADE, PLUS } from '../src/Query';

// androidId
import * as Application from 'expo-application';

// Util
import { timeForToday, makeFriendly, addressSplit, comma, cutByLen } from '../src/Util';

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

import BackIcon from '../assets/images/back.svg'; //뒤로가기
import BtnSend from '../assets/images/btn_send.svg';
import TradeStatus from '../assets/images/btn_bg1.svg'; // Page 상태1
import PageStatus1 from '../assets/images/btn_bg3.svg'; // Page 상태1
import PageStatus2 from '../assets/images/btn_bg4.svg'; // Page 상태2
import PageIcon1 from '../assets/images/heart_outline.svg'; //Page icon1
import PageIcon2 from '../assets/images/comment.svg'; //Page icon2
import PageIcon3 from '../assets/images/show.svg'; //Page icon3
import SearchIcon from '../assets/images/search.svg'; //search icon

import PageWriteIcon from '../assets/images/btn_write.svg';

import HeartIcon from '../assets/images/heart_fill.svg'; //좋아요 off
import HeartOnIcon from '../assets/images/heart_fill_on.svg'; //좋아요 on
import StarIcon from '../assets/images/Icon.svg'; //별 아이콘

import SmallLike from '../assets/images/smalllike.svg'; //리스트 좋아요
import SmallCmt from '../assets/images/smallcmt.svg'; //리스트 댓글수

import DownIcon from '../assets/images/down_icon.svg'; //아래방향 아이콘
import RefreshIcon from '../assets/images/refresh.svg'; //새로고침 아이콘
import PlusIcon from '../assets/images/plus.svg'; //플러스 아이콘
import WriteIcon from '../assets/images/write_btn.svg'; //쓰기 아이콘


import LogoIcon2 from '../assets/images/enlogo.svg';
import LogoIcon from '../assets/images/logo_on.svg';
import AllIcon from '../assets/images/all.svg';
import DIcon from '../assets/images/dd.svg';
import HonIcon from '../assets/images/h_on.svg';
import HoffIcon from '../assets/images/h_off.svg';
import StIcon from '../assets/images/m_arrow.svg';
import St1Icon from '../assets/images/st1.svg';

// styles
import styles from '../assets/styles/styles';

import AuthContext from '../src/AuthContext';

// base url
const baseUrl = "http://e-wjis.com/";
const imgUrl = baseUrl + "pic/";
const imgUrl2 = baseUrl + "pic/";


// Page
export default function PageScreen({ navigation }) {

  const userInfo = useContext(AuthContext);
  //console.log(userInfo);

  const [signIn, { loading2, error2 }] = useMutation(GETMEMBER_MT);

  const [state, setState] = React.useState({
    data: [],
    page: 0,
    refreshing: false,
  });

  const [state2, setState2] = React.useState({
    data: [],
    page: 0,
    refreshing: false,
  });

  const [lang, setLang] = React.useState("KR"); 

  /* 사이즈 측정 변수 */
  const [twidth, setTwidth] = React.useState(0); 

  /* 검색값 */
  const [value, onChangeText] = React.useState("");
  const [value2, onChangeText2] = React.useState("");
  const [word, setWord] = React.useState({});
  const [trade, { loading, error }] = useMutation(TRADE);
  const [getBanner, { loading3, error3 }] = useMutation(PLUS);


  /* 로그인 유지용 키설정 테스트 */
  const storeDataSync = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('log', jsonValue);
    } catch (e) {
      // saving error
    }
  }

  /* 로그인 유지용 키가져오기 테스트 */
  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'key',
        'I like to save it.'
      );
    } catch (error) {
      // Error saving data
    }
  };

  /* 로그인 유지용 키가져오기 실제 함수 */
  const _retrieveData = async () => {
    try {
      const jwt = await AsyncStorage.getItem('key').then((keyValue) => {

        //console.log("jwt", keyValue) //Display key value
        return keyValue;
        }, (error) => {
        console.log(error) //Display error
      });

      if (jwt != "") {

        await signIn({ variables: { email: "", password: "", key: String(jwt) } }).then(response => {
            //console.log('RESPONSE ==>', response.data.signIn)
            //response.data.signin

            {/* 로그인 처리 및 유저정보 저장 */}
            userInfo.setUser({
              info : { 
                email: response.data.signIn.email,
                nick: response.data.signIn.name,
                isLogin: true,
                area1: userInfo.user.info.area1,
                area2: userInfo.user.info.area2,
                area3: userInfo.user.info.area3,
                areaNo1: userInfo.user.info.areaNo1,
                areaNo2: userInfo.user.info.areaNo2,
                areaNo3: userInfo.user.info.areaNo3
              }
            });
        })
        .catch(error => {
          //console.log('ERROR1 ==>', error.networkError.result.errors);
        });

      }
      
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  /* 라이프사이클 컨트롤 */
  useEffect(() => {
    _retrieveData();
    const unsubscribe = navigation.addListener('focus', () => {

      if (userInfo.user.info.area3 != value2) {
        //onChangeText2(userInfo.user.info.area3);
        //_handleRefresh();
      }

    });
    _getData();
    //_getKeyword();
    return () => {
    }
  }, []);

  /* 데이터 새로고침 */
  const _handleRefresh = async() => {
    await setState({
      data: [],
      page: 0,
      refreshing: false,
    });
    

      trade({ variables: { page: 0, stx: value, email: Application.androidId, cate1:"", cate2:"", cate3:"" } }).then(response => {

        if ((response.data.trade).length > 1) {
          setState({
            data: response.data.trade,
            page: state.page + 1,
            refreshing: state.refreshing,
          });  
        } else {
          setState({
            data: response.data.trade,
            page: state.page,
            refreshing: state.refreshing,
          });  
        }
             

      })
      .catch(error => {
        setState({
          data: state.data,
          page: state.page,
          refreshing: false,

        })   
          console.log('ERROR ==>', error);
          //console.log('ERROR1 ==>', error.networkError.result.errors);
      });
  }

  /* 데이터 가져오기 */
  const _getData = () => {

      trade({ variables: { page: state.page, stx: value, email: "", cate1:"", cate2:"", cate3:"" } }).then(response => {

        setState({
          data: state.data.concat(response.data.trade),
          page: state.page + 1,
          refreshing: state.refreshing,
        });       

      })
      .catch(error => {
        setState({
          data: state.data,
          page: state.page,
          refreshing: false,

        })   
          console.log('ERROR ==>', error);
          //console.log('ERROR1 ==>', error.networkError.result.errors);
      });

      getBanner({ variables: { type:"main" } }).then(response => {
        
        //console.log(response.data.getBanner);
        setState2({
          data: response.data.getBanner,
          page: state2.page,
          refreshing: state2.refreshing,
        });       

      })
      .catch(error => {
        setState2({
          data: state2.data,
          page: state2.page,
          refreshing: false,

        })   
          console.log('ERROR ==>', error);
          //console.log('ERROR1 ==>', error.networkError.result.errors);
      });

      

  }

  /* 데이터 무한 로딩용 */
  const _handleLoadMore = () => {
    console.log("end");
    _getData();
  }


const searchProc = (text) => {
  onChangeText(text);
  //if (value.length > 2) {
    _handleRefresh();
  //}
}

const setLangProc = async (val) => {
  await setFilter("lang", val);
  setLang(val);
  if (val != "EN") {
    navigation.navigate("Page"); 
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

const getFilterSet = async (key) => {

  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return value;
    } else {
      return "";
    }
  } catch(e) {
    // error reading value
    return "";
  }

}

  // 가로 너비 구하기
  let DevideWidth = Dimensions.get('window').width;

    return (
      <View style={styles.container}>
        {/* 헤더 탭 */}
        <View style={styles.headerAreaOn}>
          {/* <TouchableOpacity style={{position:'absolute', left:20,top:22}}
            onPress={() => {
              navigation.push('EnAlarm', {});
            }} >
            <MenuIcon6 width={24} height={24} />
          </TouchableOpacity> */}
          <LogoIcon2 width={131} height={25} style={{marginTop:8}} />

          <TouchableOpacity onPress={()=>setLangProc("KR")} style={styles.lang}>
            <Text style={{color:"#77878F", fontSize:14}}>ENG</Text>
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
              navigation.navigate('EnPage', {});
            }} >
            <MenuIconOn1 width={32} height={22} />
            <Text style={styles.bottomTabon}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTabBtnOff}
            onPress={() => {
              navigation.replace('EnPageS', {});
            }}>
            <MenuIcon2 width={36} height={22} />
            <Text style={styles.bottomTaboff}>Search</Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.bottomTabBtnOff}
            onPress={() => {
              navigation.replace('EnPage6', {});
            }} >
            <MenuIcon3 width={36} height={22} />
            <Text style={styles.bottomTaboff}>Inquire</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomTabBtnOff} onPress={() => {
              navigation.push('EnScan', {});
            }}>
            <MenuIcon5 width={38} height={22} />
            <Text style={styles.bottomTaboff}>Qrcode</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomTabBtnOff} onPress={() => {
              navigation.push('EnPage7', {});
            }}>
            <MenuIcon7 width={36} height={22} />
            <Text style={styles.bottomTaboff}>Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  