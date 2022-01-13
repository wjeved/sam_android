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
const baseUrl = "http://woojinsj.com/";
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
          <Text style={{color:'#1E2022', fontWeight:'bold', fontSize:18, marginTop:8}}>Search</Text>
        </View>
        
      
        
        <View style={styles.content2}>
          {/* 검색 */}
          <View style={styles.searchRow2}>
            <View style={{ position:'absolute', left:18, top:8, width:250,flexDirection:"row", alignItems:'center', justifyContent:'flex-start'}}>
              <TouchableOpacity>
                <SearchIcon width={18} height={18} />
              </TouchableOpacity>
              <TextInput
                style={{ width:twidth - 60,marginTop:2,marginLeft:10, marginRight:0, lineHeight: 20, borderWidth: 0, fontSize:18, color:"#D2D2D2" }}              
                //onChangeText={text => onChangeText(text)}
                onChangeText={text => searchProc(text)}
                placeholderTextColor="#D2D2D2"
                //onSubmitEditing={searchSubmit}
                //onFocus={() => moveX()}
                value={value}
                placeholder="search"
              />
            </View>

            {/* <TouchableOpacity style={styles.areaRightBtnAbs} onPress={() => navigation.push("Area")}>
                {userInfo.user.info.area3 != "" ? (
                <Text style={styles.areaTextAbs}>{userInfo.user.info.area3}</Text>
                ):(
                  <Text style={styles.areaTextAbs}>전체</Text>
                  )}
              </TouchableOpacity> */}
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
                 //let tempTitle = cutByLen(item.title, 20);
                 let tempTitle = item.title2;

                return(
                  <TouchableOpacity onPress={() => navigation.push("EnPage4",{idx: item.idx})} style={{borderWidth:1, borderColor:'#F6F6F6', marginLeft:10, marginRight:10, height:120, backgroundColor:'#FFFFFF', borderRadius:10, elevation:0, marginBottom:20}}>
                    {/* <Image style={styles.tinyLogo} source={{ uri: pfImg }} style={{ position:'absolute', top:15, left:15, width:90, height:90, borderRadius:20}} /> */}
                    <View style={{position:'absolute', top:15, left:15, width:90, height:90, borderRadius:20, backgroundColor:'#FFF'}}>
                      <Image style={styles.tinyLogo} resizeMode={'contain'} source={{ uri: pfImg }} style={{ width:90, height:90, borderRadius:20}} />
                    </View>
                    {/* <HoffIcon width={33} height={33} style={{position:'absolute',top:72, left:72 }} /> */}
                    <StIcon width={42} height={42} style={{position:'absolute', bottom:0, right:0}} />
                    <View style={{marginLeft:120, top:25}}>
                      <Text style={{color:'#333333', fontWeight:'bold'}}>[{item.cate1}]</Text>
                      <Text style={{color:'#333333', fontWeight:'bold'}} numberOfLines={1}>{tempTitle}</Text>
                      {/* { item.voltage != "" ? 
                      (<Text style={{color:'#77838F'}}>Catenary voltage : {item.voltage}</Text>):null} */}

                      <View style={{ marginTop:10,flexDirection:'row' }}>
                        {/* <TouchableOpacity onPress={() => navigation.push("Pdf")}>
                          <Text style={{color:'#4F94F1'}}>Catalog</Text>
                        </TouchableOpacity>
                        <DIcon width={1} height={8} style={{marginTop:7, marginLeft:8, marginRight:8}} /> */}
                        <TouchableOpacity onPress={() => navigation.push("EnPage5", {idx:item.idx})}>
                          <Text style={{color:'#4F94F1'}}>Inquire</Text>
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
              navigation.navigate('EnPage', {});
            }} >
            <MenuIcon1 width={32} height={22} />
            <Text style={styles.bottomTaboff}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomTabBtnOn}
            onPress={() => {
              navigation.replace('EnPageS', {});
            }}>
            <MenuIconOn2 width={36} height={22} />
            <Text style={styles.bottomTabon}>Search</Text>
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
  