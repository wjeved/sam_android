import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Animated, Dimensions, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// androidId
import * as Application from 'expo-application';

// apollo
import { useMutation } from '@apollo/client';

// graphQl
import { GETMEMBER_MT, TRADE } from '../src/Query';

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

import SearchIcon from '../assets/images/search.svg'; //search icon

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

  /* 에니메이션 효과 변수 */
  const position = useRef(new Animated.ValueXY({x:0, y:0})).current; 
  const position2 = useRef(new Animated.ValueXY({x:0, y:0})).current;

  /* 사이즈 측정 변수 */
  const [twidth, setTwidth] = React.useState(0); 

  /* 검색값 */
  const [value, onChangeText] = React.useState("");
  const [value2, onChangeText2] = React.useState("");
  const [word, setWord] = React.useState({});
  const [trade, { loading, error }] = useMutation(TRADE);


  /* 라이프사이클 컨트롤 */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {


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

    //let dvc = await SecureStore.getItemAsync('secure_deviceid');

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
  const _getData = async () => {

    //let dvc = await SecureStore.getItemAsync('secure_deviceid');

      trade({ variables: { page: state.page, stx: value, email: Application.androidId, cate1:"", cate2:"", cate3:"" } }).then(response => {

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


  // 가로 너비 구하기
  let DevideWidth = Dimensions.get('window').width;


    return (
      <View style={styles.container}>
        {/* 헤더 탭 */}
        <View style={styles.headerAreaOn}>
          <Text style={styles.searchTitle}>검색</Text>
        </View>
        
        <View style={styles.content2}>
          {/* 검색 */}
          <View style={styles.searchRow2}>
            <View style={styles.searchWrap}>
              <TouchableOpacity>
                <SearchIcon width={18} height={18} />
              </TouchableOpacity>
              <TextInput
                style={[{width:twidth - 60},styles.searchInput]}              
                onChangeText={text => searchProc(text)}
                placeholderTextColor="#D2D2D2"
                value={value}
                placeholder="검색어 입력"
              />
            </View>

          </View>

          <FlatList 
            style={{marginTop:10}}
            keyExtractor={item => item.idx.toString()}
            data={state.data}
            refreshing={state.refreshing}
            onRefresh={_handleRefresh}
            onEndReached={_handleLoadMore}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => { 
            
                 let pfImg = imgUrl2 + item.img1;
                 let tempTitle = item.title;

                return(
                  <TouchableOpacity onPress={() => navigation.push("Page4",{idx: item.idx})} style={styles.searchRowWrap}>
                    <View style={styles.searchImgWrap}>
                      <Image style={styles.tinyLogo} resizeMode={'contain'} source={{ uri: pfImg }} style={styles.searchImg} />
                    </View>
                    <StIcon width={42} height={42} style={styles.searchStatus} />
                    <View style={styles.searchInfoWrap}>
                      <Text style={styles.searchText}>[{item.cate1}]</Text>
                      <Text style={styles.searchText} numberOfLines={1}>{tempTitle}</Text>

                      <View style={styles.searchInfo2Wrap}>
                        <TouchableOpacity onPress={() => navigation.push("Page5", {idx:item.idx})}>
                          <Text style={styles.searchinquireText}>문의하기</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                  
              )


              }
              
              }
          />
          
          
        </View>

        {/* 메뉴 */}
        <View style={styles.bottomMenu}>
          <TouchableOpacity style={styles.bottomTabBtnOff}
            onPress={() => {
              navigation.navigate('Page', {});
            }} >
            <MenuIcon1 width={32} height={22} />
            <Text style={styles.bottomTaboff}>우진산전</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTabBtnOn}
            onPress={() => {
              navigation.replace('PageS', {});
            }}>
            <MenuIconOn2 width={36} height={22} />
            <Text style={styles.bottomTabon}>검색</Text>
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
  