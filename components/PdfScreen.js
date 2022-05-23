import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Animated, Dimensions, AsyncStorage, ScrollView } from 'react-native';

// apollo
import { useMutation } from '@apollo/client';

// graphQl
import { GETMEMBER_MT, KEYWORD, WICK } from '../src/Query';

// Util
import { timeForToday, makeFriendly, addressSplit, addressSplit2 } from '../src/Util';

// Pdf
import PDFReader from 'rn-pdf-reader-js';

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

import BackIcon from '../assets/images/back.svg'; //뒤로가기
import BtnSend from '../assets/images/btn_send.svg'; // 채팅버튼
import TradeStatus from '../assets/images/btn_bg1.svg'; // wick 상태1
import WickStatus1 from '../assets/images/btn_bg3.svg'; // wick 상태1
import WickStatus2 from '../assets/images/btn_bg4.svg'; // wick 상태2
import WickIcon1 from '../assets/images/heart_outline.svg'; //wick icon1
import WickIcon2 from '../assets/images/comment.svg'; //wick icon2
import WickIcon3 from '../assets/images/show.svg'; //wick icon3
import SearchIcon from '../assets/images/search.svg'; //search icon

import WickWriteIcon from '../assets/images/btn_write.svg'; //wick  작성

import HeartIcon from '../assets/images/heart_fill.svg'; //좋아요 off
import HeartOnIcon from '../assets/images/heart_fill_on.svg'; //좋아요 on
import StarIcon from '../assets/images/Icon.svg'; //별 아이콘

import SmallLike from '../assets/images/smalllike.svg'; //리스트 좋아요
import SmallCmt from '../assets/images/smallcmt.svg'; //리스트 댓글수

import DownIcon from '../assets/images/down_icon.svg'; //아래방향 아이콘
import RefreshIcon from '../assets/images/refresh.svg'; //새로고침 아이콘
import PlusIcon from '../assets/images/plus.svg'; //플러스 아이콘
import WriteIcon from '../assets/images/write_btn.svg'; //쓰기 아이콘



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


// Wick
export default function Wick4Screen({ navigation }) {

  const userInfo = useContext(AuthContext);
  //console.log(userInfo);

  const [signIn, { loading2, error2 }] = useMutation(GETMEMBER_MT);

  const [state, setState] = React.useState({
    data: [],
    page: 0,
    refreshing: false,
  });

  /* 에니메이션 효과 변수 */
  const position = useRef(new Animated.ValueXY({x:0, y:0})).current; 
  const position2 = useRef(new Animated.ValueXY({x:0, y:0})).current;

  /* 사이즈 측정 변수 */
  const [twidth, setTwidth] = React.useState(0); 

  /* 검색값 */
  const [value, onChangeText] = React.useState("");
  const [value2, onChangeText2] = React.useState("");
  const [word, setWord] = React.useState({});
  const [wick, { loading, error }] = useMutation(WICK);
  const [ getkeyword ] = useMutation(KEYWORD);

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
          console.log('ERROR1 ==>', error.networkError.result.errors);
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
        onChangeText2(userInfo.user.info.area3);
        _handleRefresh();
      }

    });
    _getData();
    _getKeyword();
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

    await _getData();
  }

  /* 데이터 가져오기 */
  const _getData = () => {

      console.log(value2);

      wick({ variables: { area: value2, page: state.page, stx: value, email: userInfo.user.info.email } }).then(response => {

        setState({
          data: state.data.concat(response.data.wick),
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

  }

  /* 데이터 무한 로딩용 */
  const _handleLoadMore = () => {
    console.log("end");
    _getData();
  }


  // 키워드
  const _getKeyword = () => {

    getkeyword({ variables: { type: "place" } }).then(response => {

      setWord(response.data.getkeyword);

      //console.log(response.data.getkeyword);
    })
    .catch(error => {
        console.log('ERROR ==>', error);
        //console.log('ERROR1 ==>', error.networkError.result.errors);
    });

}

/* 키워드 클릭함수 */
const keywordClick = async (item) => {
  //moveX();
  await onChangeText(item);
  await _handleRefresh();
}

/* 에니메이션 컨트롤 */
const moveX = () => {
  Animated.timing(position, {
    toValue : {x:-(twidth/2 - 100), y:0},
    duration: 700,
    useNativeDriver:true
  }).start();

  Animated.timing(position2, {
    toValue : {x:(twidth/2 - 110), y:0},
    duration: 700,
    useNativeDriver:true
  }).start();

}


  // 가로 너비 구하기
  let DevideWidth = Dimensions.get('window').width;

  const OnceView = (<Image style={styles.subTopImg3}
    source={{
      uri: "http://49.50.174.177/pic/subTop2.png",
    }} />);
    
    return (
        <PDFReader
                source={{
                uri: 'https://wjis.co.kr/data/bbsData/15673999411.pdf',
                }}
            />
    );
  }
  