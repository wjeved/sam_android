import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Animated, Dimensions, AsyncStorage, ScrollView } from 'react-native';

// apollo
import { useMutation } from '@apollo/client';

// graphQl
import { GETMEMBER_MT, GETINQUIRE, GETINQUIREDATE } from '../src/Query';

// Util
import { timeForToday, makeFriendly, addressSplit, addressSplit2, cutByLen, dayProc } from '../src/Util';

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
import MenuIcon6 from '../assets/images/alarm_icon.svg';
import MenuIconOn6 from '../assets/images/alarm_icon_on.svg';
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

import NodataIcon from '../assets/images/nodata.svg';

// styles
import styles from '../assets/styles/styles';

import AuthContext from '../src/AuthContext';

// base url
const baseUrl = "http://e-wjis.com/";
const imgUrl = baseUrl + "pic/";
const imgUrl2 = baseUrl + "pic/";


// Page
export default function Page6Screen({ navigation }) {

  const userInfo = useContext(AuthContext);
  //console.log(userInfo);

  const [signIn, { loading2, error2 }] = useMutation(GETMEMBER_MT);

  const [state, setState] = React.useState({
    data: [],
    page: 0,
    refreshing: false,
  });

  const [state2, setState2] = React.useState([]);

  /* 에니메이션 효과 변수 */
  const position = useRef(new Animated.ValueXY({x:0, y:0})).current; 
  const position2 = useRef(new Animated.ValueXY({x:0, y:0})).current;

  /* 사이즈 측정 변수 */
  const [twidth, setTwidth] = React.useState(0); 

  /* 검색값 */
  const [value, onChangeText] = React.useState("");
  const [value2, onChangeText2] = React.useState("");
  const [sday, setSday] = React.useState("");
  const [word, setWord] = React.useState({});
  const [getInquire, { loading, error }] = useMutation(GETINQUIRE);
  const [getInquireDate, { loading3, error3 }] = useMutation(GETINQUIREDATE);

  

    /* 라이프사이클 컨트롤 */
  useEffect(() => {
    _getData();
    //alert(Application.androidId);
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

      getInquire({ variables: { did: Application.androidId, date:sday } }).then(response => {

        setState({
          data: response.data.getInquire,
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

      getInquireDate({ variables: { did: Application.androidId } }).then(response => {

        setState2(response.data.getInquireDate);       

      })
      .catch(error => {
        setState2([])   
          console.log('ERROR ==>', error);
          //console.log('ERROR1 ==>', error.networkError.result.errors);
      });

  }

  /* 날짜 클릭 */
  const _getDataByBtn = async (day) => {

    //let dvc = await SecureStore.getItemAsync('secure_deviceid');

    getInquire({ variables: { did: Application.androidId, date:day } }).then(response => {

      setState({
        data: response.data.getInquire,
        page: state.page + 1,
        refreshing: state.refreshing,
      });       

    })
    .catch(error => {
      setState({
        data: [],
        page: state.page,
        refreshing: false,

      })   
        console.log('ERROR ==>', error);
        //console.log('ERROR1 ==>', error.networkError.result.errors);
    });

    setSday(day);


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
          <Text style={styles.searchTitle}>Inquire</Text>
        </View>

        
        
      
        { state.data.length < 1 ?
          (<View style={styles.content2}><View style={styles.dateWrap}>
            <NodataIcon width={120} height={60} style={styles.dateNodataIcon} />
            <Text style={styles.dateNodeta}>No data</Text>

          </View></View>

          ):
          (
        <View style={styles.content2}>
          
          <View style={styles.dataListWrap}>

          
          <FlatList 
            style={styles.dataFlatList}
            horizontal={true}
            keyExtractor={item => item.date.toString()}
            data={state2}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => { 
            
                
                let day = dayProc(item.date);
                
                
                if (sday == item.date) {
                  return(

                    <TouchableOpacity onPress={() => _getDataByBtn(item.date)} style={styles.dateItem}>
                            <Text style={styles.dateItemText1}>{(item.date).substr(8,2)}</Text>
                    </TouchableOpacity>
                    
                    
                  );
                } else {
                  return(

                    <TouchableOpacity onPress={() => _getDataByBtn(item.date)} style={styles.dateItem2}>
                            <Text style={styles.dateItemText3}>{(item.date).substr(8,2)}</Text>
                    </TouchableOpacity>
                    
                    
                  );
                }


              }
              
              }
          />
            

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
            
                
                // // 이미지
                 let pfImg = imgUrl2 + item.img1;
                // // 제목 표기 변환
                 let tempTitle = cutByLen(item.title2, 20);
                
                // 반복
                return(
                  <TouchableOpacity onPress={() => navigation.push("EnInquireDetail", { idx: item.idx2, idx2:item.idx })} style={styles.productItem}>
                    <Image style={styles.tinyLogo} source={{ uri: pfImg }} style={{ position:'absolute', top:15, left:15, width:90, height:90, borderRadius:20}} />
                    {item.status == 'Y' ?
                    (<St1Icon width={42} height={42} style={styles.productIcon1} />):
                    (<St2Icon width={42} height={42} style={styles.productIcon1} />)
                    }
                    <View style={styles.productInfoTextWrap}>
                    <Text style={styles.productInfoText}>[{item.cate1}]</Text>
                       <Text style={styles.productInfoText}>{tempTitle}</Text>
                      
                    </View>
                  </TouchableOpacity>
                  
                  
              )


              }
              
              }
          />
          
          
          
          
        </View>)}

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
          <TouchableOpacity style={styles.bottomTabBtnOn}
            onPress={() => {
              navigation.replace('EnPage6', {});
            }} >
            <MenuIconOn3 width={36} height={22} />
            <Text style={styles.bottomTabon}>Inquire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTabBtnOff} onPress={() => {
              navigation.push('EnScan', {});
            }}>
            <MenuIcon5 width={38} height={22} />
            <Text style={styles.bottomTaboff}>QRcode</Text>
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
  