import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Animated, Dimensions, AsyncStorage, ScrollView } from 'react-native';

// apollo
import { useMutation } from '@apollo/client';

// graphQl
import { GETMEMBER_MT, KEYWORD, WICK } from '../src/Query';

// Util
import { timeForToday, makeFriendly, addressSplit, addressSplit2 } from '../src/Util';

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
import St2Icon from '../assets/images/st2.svg';
import St3Icon from '../assets/images/st3.svg';

import NodataIcon from '../assets/images/nodata.svg';

// styles
import styles from '../assets/styles/styles';

import AuthContext from '../src/AuthContext';

// base url
const baseUrl = "http://e-wjis.com/";
const imgUrl = baseUrl + "pic/";


// Wick
export default function Wick6Screen({ navigation }) {

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


  /* 라이프사이클 컨트롤 */
  useEffect(() => {

    _getData();
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

     

  }

  /* 데이터 무한 로딩용 */
  const _handleLoadMore = () => {
    console.log("end");
    _getData();
  }


  // 가로 너비 구하기
  let DevideWidth = Dimensions.get('window').width;

    
    return (
      <View style={styles.container}>
        {/* 헤더 탭 */}
        <View style={styles.headerAreaOn}>
          <Text style={{color:'#1E2022', fontWeight:'bold', fontSize:18, marginTop:8}}>알림</Text>
        </View>

        
        
      
        { state.data.length < 1 ?
          (<View style={styles.content2}><View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <NodataIcon width={120} height={60} style={{marginTop:0}} />
            <Text style={{marginTop:30, color:'#DEDFDE'}}>No data</Text>

          </View></View>

          ):
          (
        <View style={styles.content2}>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Text style={{color:'#CCC'}}>No data</Text>
          </View>

          {/* <View style={{marginLeft:10, marginRight:10, marginTop:10, marginBottom:10, flexDirection:'row'}}>
              <TouchableOpacity style={{ marginRight:10, width:90, height:36,borderRadius:18, backgroundColor:"#4F94F1", alignItems:'center', justifyContent:'center'}}>
                  <Text style={{color:'#FFFFFF'}}>570V DC</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight:10, width:90, height:36,borderRadius:18, backgroundColor:"#4F94F1", alignItems:'center', justifyContent:'center'}}>
                  <Text style={{color:'#FFFFFF'}}>970kVH</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.push("Wick3")} style={{position:'absolute', right:0, top:10}}>
                  <Text style={{color:'#1E2022'}}>검색필터</Text>
              </TouchableOpacity>
          </View> */}
          
          
          
          
        </View>
          )}

        {/* 메뉴 */}
        <View style={styles.bottomMenu}>
          <TouchableOpacity style={styles.bottomTabBtnOff}
            onPress={() => {
              navigation.navigate('Wick', {});
            }} >
            <MenuIcon1 width={32} height={22} />
            <Text style={styles.bottomTaboff}>우진산전</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTabBtnOff}
            onPress={() => {
              navigation.replace('WickS', {});
            }}>
            <MenuIcon2 width={36} height={22} />
            <Text style={styles.bottomTaboff}>검색</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.bottomTabBtnOff}
            onPress={() => {
              navigation.replace('Place', {});
            }} >
            <MenuIcon2 width={38} height={22} />
            <Text style={styles.bottomTaboff}>장소</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity style={styles.bottomTabBtnOff}
            onPress={() => {
              navigation.replace('Wick6', {});
            }} >
            <MenuIcon3 width={36} height={22} />
            <Text style={styles.bottomTaboff}>문의내역</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.bottomTabBtnOff}
            onPress={() => {
              navigation.replace('Message', {});
            }} >
            <MenuIcon4 width={20} height={20} />
            <Text style={styles.bottomTaboff}>메시지</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.bottomTabBtnOff} onPress={() => {
              navigation.push('Scan', {});
            }}>
            <MenuIcon5 width={38} height={22} />
            <Text style={styles.bottomTaboff}>QR스캔</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  