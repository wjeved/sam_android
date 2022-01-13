import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Animated, Dimensions, AsyncStorage, ScrollView } from 'react-native';

// apollo
import { useMutation } from '@apollo/client';

// graphQl
import { GETMEMBER_MT, KEYWORD, FAVOR, FAVOR2 } from '../src/Query';

// Util
import { timeForToday, makeFriendly, addressSplit, addressSplit2 } from '../src/Util';

// androidId
import * as Application from 'expo-application';

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
import MenuIcon7 from '../assets/images/icon_menu7.svg';
import MenuIconOn7 from '../assets/images/icon_menu7_on.svg';

import BackIcon from '../assets/images/back.svg'; //뒤로가기
import BtnSend from '../assets/images/btn_send.svg'; // 채팅버튼
import TradeStatus from '../assets/images/btn_bg1.svg'; // Page 상태1
import PageStatus1 from '../assets/images/btn_bg3.svg'; // Page 상태1
import PageStatus2 from '../assets/images/btn_bg4.svg'; // Page 상태2
import PageIcon1 from '../assets/images/heart_outline.svg'; //Page icon1
import PageIcon2 from '../assets/images/comment.svg'; //Page icon2
import PageIcon3 from '../assets/images/show.svg'; //Page icon3
import SearchIcon from '../assets/images/search.svg'; //search icon

import PageWriteIcon from '../assets/images/btn_write.svg'; //Page  작성

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

// styles
import styles from '../assets/styles/styles';

import AuthContext from '../src/AuthContext';

// base url
const baseUrl = "http://woojinsj.com/";
const imgUrl = baseUrl + "pic/";
const imgUrl2 = baseUrl + "pic/";


// Page
export default function Page7Screen({ navigation }) {

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
 
  const [getFavor, { loading, error }] = useMutation(FAVOR2);
  const [setFavor, { loading3, error3 }] = useMutation(FAVOR);

  /* 라이프사이클 컨트롤 */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _getData();

    });
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
  const _getData = async () => {

    //let dvc = await SecureStore.getItemAsync('secure_deviceid');

      getFavor({ variables: { did: Application.androidId } }).then(response => {

        setState({
          data: response.data.getFavor,
          page: state.page,
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

  const likeProc = async (idx2) => {

    //let dvc = await SecureStore.getItemAsync('secure_deviceid');
      
      await setFavor({ variables: { did: Application.androidId, idx: idx2, type:"del" } }).then(response => {
        console.log(response.data.setFavor); 
        setState({
          data: response.data.setFavor,
          page: state.page,
          refreshing: state.refreshing,
        });
        
      })
      .catch(error => {
          setState({
            data: [],
            page: 0,
            refreshing: false,
          });
          console.log('ERROR ==>', error);
          //console.log('ERROR1 ==>', error.networkError.result.errors);
      });

      console.log(state.data);

      //await _getData();
    
  }


  // 가로 너비 구하기
  let DevideWidth = Dimensions.get('window').width;

  const OnceView = (<Image style={styles.subTopImg3}
    source={{
      uri: "http://woojinsj.com/pic/subTop2.png",
    }} />);
    
    return (
      <View style={styles.container}>
        {/* 헤더 탭 */}
        <View style={styles.headerAreaOn}>
          <Text style={styles.searchTitle}>Favorites</Text>
        </View>
        
        <View style={styles.content2}>
          

          <FlatList 
            style={{marginTop:10}}
            keyExtractor={item => item.idx.toString()}
            data={state.data}
            refreshing={state.refreshing}
            onRefresh={_handleRefresh}
            //onEndReached={_handleLoadMore}
            //onEndReachedThreshold={0.5}
            renderItem={({item}) => { 

                  let pfImg = imgUrl2 + item.img1;
                  //let tempTitle = cutByLen(item.title, 20);
                  let tempTitle = item.title2;
                
                
                  return(

                    <TouchableOpacity onPress={() => navigation.push("EnPage4",{idx: item.idx2})} style={styles.favorItem}>
                      <View style={styles.favorImgWrap}>
                        <Image style={styles.tinyLogo} resizeMode={'contain'} source={{ uri: pfImg }} style={styles.favorImg} />
                      </View>

                      <TouchableOpacity onPress={() => likeProc(item.idx2)} style={styles.favorStatus}>
                        <St3Icon width={42} height={42} style={{}} />
                      </TouchableOpacity>
                      <View style={styles.favorInfoWrap}>
                        <Text style={styles.favorInfoTitle}>[{item.cate1}]</Text>
                        <Text style={styles.favorInfoTitle} numberOfLines={1}>{tempTitle}</Text>

                        <View style={styles.favorBtn1}>
                          {/* <TouchableOpacity onPress={() => navigation.push("Pdf")}>
                            <Text style={{color:'#4F94F1'}}>Catalog</Text>
                          </TouchableOpacity>
                          <DIcon width={1} height={8} style={{marginTop:7, marginLeft:8, marginRight:8}} /> */}
                          <TouchableOpacity onPress={() => navigation.push("EnPage5", {idx:item.idx2})}>
                            <Text style={styles.favorBtnText}>Inquire</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>

                    
                    
                  );
              
              }}
          />
        </View>

        {/* 메뉴 */}
        <View style={styles.bottomMenu}>
          <TouchableOpacity style={styles.bottomTabBtnOff}
            onPress={() => {
              navigation.navigate('EnPage', {});
            }} >
            <MenuIcon1 width={32} height={22} />
            <Text style={styles.bottomTaboff}>Home</Text>
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

          <TouchableOpacity style={styles.bottomTabBtnOn} onPress={() => {
              navigation.push('EnPage7', {});
            }}>
            <MenuIconOn7 width={36} height={22} />
            <Text style={styles.bottomTabon}>Favorites</Text>
          </TouchableOpacity>
        </View>
  
      </View>
    );
  }
  