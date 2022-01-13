import React, { useRef, useEffect, useLayoutEffect, useMemo, useState, useContext } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, Image, FlatList, TextInput, Animated, Dimensions, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import LottieView from 'lottie-react-native';
import LoadingImg from '../assets/json/loading.json';

// apollo
import { useMutation } from '@apollo/client';

// androidId
import * as Application from 'expo-application';

// graphQl
import { GETMEMBER_MT, PLUS, TRADE, SUB } from '../src/Query';

// Util
import { timeForToday, makeFriendly, addressSplit, addressSplit2, cutByLen } from '../src/Util';

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

// styles
import styles from '../assets/styles/styles';

import AuthContext from '../src/AuthContext';

// base url
const baseUrl = "http://woojinsj.com/";
const imgUrl = baseUrl + "pic/";
const imgUrl2 = baseUrl + "pic/";

const animations = [
  LoadingImg
];

const { height, width } = Dimensions.get('window');


// Page
export default function Page2Screen({ route, navigation }) {

  const { cate1, cate2, cate3 } = route.params;

  const userInfo = useContext(AuthContext);
  //console.log(userInfo);

  const [signIn, { loading2, error2 }] = useMutation(GETMEMBER_MT);

  const [currentAnimation, setCurrentAnimation] = useState();
  const animation = useRef(null);
  const [loadAnim, setLoadAnim] = useState(false);

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

  const [state3, setState3] = React.useState({
    data: [],
    page: 0,
    refreshing: false,
  });
  const [state4, setState4] = React.useState({
    data: [],
    page: 0,
    refreshing: false,
  });

  const [asyncVal, setAsyncVal] = React.useState({
    oper: "",
    country: "",
    veh: "",
    year: "",
    speed: "",
    voltage: "",
    rating: "",
    output: "",
    cooling: "",
    dimension: "",
    weight: "",
    temp: ""
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
  const [getBanner, { loading3, error3 }] = useMutation(PLUS);
  const [getSub, { loading4, error4 }] = useMutation(SUB);

  /* 라이프사이클 컨트롤 */
  useEffect(() => {
    

    // const unsubscribe = navigation.addListener('focus', () => {
    //   setLoadAnim(false);
    //   _getData();
    //   getFilterSet();
    //   setTimeout(function() {
    //     setLoadAnim(true);
    //   }, 1700);
      
    // });

    if (animation.current) {
      animation.current.play();
      setTimeout(function() {
        setLoadAnim(true);
      }, 1000);
    }
    
    //_getKeyword();

    return () => {
    }
  }, [currentAnimation]);

  const changeAnimation = () => {
    setCurrentAnimation(animations[0]);
  }

  useLayoutEffect(() => { 
    _handleRefresh();
    // console.log('a');
    // let dvc = SecureStore.getItemAsync('secure_deviceid');
    // console.log(dvc);
    // trade({ variables: { page: state.page, stx: value, email: "", cate1:cate1, cate2:cate2, cate3:cate3 } }).then(response => {
      

    //     setState({
    //       data: state.data.concat(response.data.trade),
    //       page: state.page + 1,
    //       refreshing: state.refreshing,
    //     });       

    //   })
    //   .catch(error => {
    //     setState({
    //       data: state.data,
    //       page: state.page,
    //       refreshing: false,

    //     })   
    //       console.log('ERROR ==>', error);
    //       //console.log('ERROR1 ==>', error.networkError.result.errors);
    //   });

      let type = "";
      if (cate3 != "") {
        type=cate3;
      } else if (cate2 != "") {
        type=cate2;
      } else if (cate1 != "") {
        type=cate1;
      }

      getBanner({ variables: { type:type } }).then(response => {
        
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

      getSub({ variables: { cate1:cate1, cate2:cate2 } }).then(response => {
        
        //console.log(response.data.getSub);
        setState3({
          data: response.data.getSub,
          page: state3.page,
          refreshing: state3.refreshing,
        });       

      })
      .catch(error => {
        setState3({
          data: state3.data,
          page: state3.page,
          refreshing: false,

        })   
          console.log('ERROR ==>', error);
          //console.log('ERROR1 ==>', error.networkError.result.errors);
      });

      
  }, []);


  /* 데이터 새로고침 */
  const _handleRefresh = async() => {
    // await setState({
    //   data: [],
    //   page: 0,
    //   refreshing: false,
    // });

    //let dvc = await SecureStore.getItemAsync('secure_deviceid');
    //console.log(dvc);

      trade({ variables: { page: 0, stx: value, email: Application.androidId, cate1:cate1, cate2:cate2, cate3:cate3 } }).then(response => {

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
    //console.log(dvc);

      trade({ variables: { page: state.page, stx: value, email: Application.androidId, cate1:cate1, cate2:cate2, cate3:cate3 } }).then(response => {

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
    if (state.data.length > 4) {
      console.log("end");
      _getData();
    }
  }


const searchProc = (text) => {
  onChangeText(text);
  //if (value.length > 2) {
    _handleRefresh();
  //}
}

const getFilterSet = async () => {
  let values;
    try {
      values = await AsyncStorage.multiGet(['oper', 'country', 'veh', 'year', 'speed', 'voltage', 'rating', 'output', 'cooling', 'dimension', 'weight', 'temp']);
    } catch(e) {
      // read error
    }

    let oper, country, veh, year, speed, voltage, rating, output, cooling, dimension, weight, temp = "";

    for(const prop of values) {

      if (prop[0] == "oper") {
        if (prop[1] != null) {
          oper = prop[1];
        } else {
          oper = "";
        }
      } else if (prop[0] == "country") {
        if (prop[1] != null) {
          country = prop[1];
        } else {
          country = "";
        }
      } else if (prop[0] == "veh") {
        if (prop[1] != null) {
          veh = prop[1];
        } else {
          veh = "";
        }
      } else if (prop[0] == "year") {
        if (prop[1] != null) {
          year = prop[1];
        } else {
          year = "";
        }
      } else if (prop[0] == "speed") {
        if (prop[1] != null) {
          speed = prop[1];
        } else {
          speed = "";
        }
      } else if (prop[0] == "voltage") {
        if (prop[1] != null) {
          voltage = prop[1];
        } else {
          voltage = "";
        }
      } else if (prop[0] == "rating") {
        if (prop[1] != null) {
          rating = prop[1];
        } else {
          rating = "";
        }
      } else if (prop[0] == "output") {
        if (prop[1] != null) {
          output = prop[1];
        } else {
          output = "";
        }
      } else if (prop[0] == "cooling") {
        if (prop[1] != null) {
          cooling = prop[1];
        } else {
          cooling = "";
        }
      } else if (prop[0] == "dimension") {
        if (prop[1] != null) {
          dimension = prop[1];
        } else {
          dimension = "";
        }
      } else if (prop[0] == "weight") {
        if (prop[1] != null) {
          weight = prop[1];
        } else {
          weight = "";
        }
      } else if (prop[0] == "temp") {
        if (prop[1] != null) {
          temp = prop[1];
        } else {
          temp = "";
        }
      }
     
    }

    setAsyncVal({
      oper: oper,
      country: country,
      veh: veh,
      year: year,
      speed: speed,
      voltage: voltage,
      rating: rating,
      output: output,
      cooling: cooling,
      dimension: dimension,
      weight: weight,
      temp: temp
    });


    //console.log(asyncVal);
}


  const getHeader = () => {
    
    return(
      <View>
        <View style={{marginTop:10, marginLeft:12, marginRight:0}}>
          
          <FlatList 
            style={{paddingBottom:20}}
            horizontal={true}
            keyExtractor={item => item.idx.toString()}
            data={state2.data}            
            //refreshing={state2.refreshing}
            showsHorizontalScrollIndicator = {false}
            renderItem={({item}) => { 
            
                let pfImg = imgUrl2 + item.img1;
                //let tempTitle = cutByLen(item.title, 12);
                let tempTitle = item.title;
                let tempTitle2 = item.title2;
                // if (item.title.length > 12) {
                //   tempTitle = tempTitle + " ...";
                // }

              return(


              <TouchableOpacity activeOpacity={1} onPress={() => navigation.push("EnPage4", {idx:item.idx2})} style={{marginLeft:0,marginRight:12,marginTop:0, borderRadius:8}}>
                  <View style={{width:225, height:225, borderRadius:20, backgroundColor:'#FFF'}}>
                    <Image style={styles.tinyLogo} resizeMode={"contain"} source={{ uri: pfImg }} style={{width:225, height:225, borderRadius:20}} />
                  </View>
                  <StIcon width={42} height={42} style={{position:'absolute', right:0, top:183}} />
                  <View style={{width:225}}>
                      <Text style={{ marginTop:10, marginLeft:0, color:'#1E2022', fontWeight:'bold', fontSize:14}}  numberOfLines={1}>{tempTitle2}</Text>
                      <Text style={{ marginTop:0, marginLeft:0, color:'#4F94F1', letterSpacing:1}} numberOfLines={1}>{tempTitle}</Text>
                  </View>
                  
              </TouchableOpacity>

              )}}
              
          />

        </View>

        <View style={{marginTop:0, marginLeft:12, marginRight:0}}>
          
          <FlatList 
            style={{paddingBottom:20}}
            horizontal={true}
            keyExtractor={item => item.name.toString()}
            data={state3.data}
            refreshing={state3.refreshing}
            showsHorizontalScrollIndicator = {false}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => { 

              if (cate3) {
                
              } else if (cate2) {
                return(
                  <TouchableOpacity onPress={() => navigation.push("EnPage2", {cate1:cate1, cate2:cate2, cate3:item.name})} style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', paddingLeft:15, paddingRight:15, height:48,marginRight:12,marginBottom:6,alignItems:'center',borderRadius:16, backgroundColor:'#FFF',
                  shadowColor:'#FFF',shadowOpacity:0.1, shadowOffset: { width:0, height:1 },elevation: 0,borderWidth:1, borderColor:'#F6F6F6'}}>
                    <Text style={{color:"#77878F", fontSize:16, marginLeft:0}}>{item.name}</Text>
                  </TouchableOpacity>

                )
              } else if (cate1) {
                return(
                  <TouchableOpacity onPress={() => navigation.push("EnPage2", {cate1:cate1, cate2:item.name, cate3:""})} style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', paddingLeft:15, paddingRight:15, height:48,marginRight:12,marginBottom:6,alignItems:'center',borderRadius:16, backgroundColor:'#FFF',
                  shadowColor:'#FFF',shadowOpacity:0.1, shadowOffset: { width:0, height:1 },elevation: 0,borderWidth:1, borderColor:'#F6F6F6'}}>
                    <Text style={{color:"#77878F", fontSize:16, marginLeft:0}}>{item.name}</Text>
                  </TouchableOpacity>
                )
              }
            }}
              
          />

        </View>

      </View>
    );
  }

  let catename = "";
  if (cate3) {
    catename = cate3;
  } else if (cate2) {
    catename = cate2;
  } else if (cate1) {
    catename = cate1;
  }

  if (loadAnim == false) {
    return (
      <View style={styles.container2}>
        <View style={{flex:1, width:'100%', alignItems:'center', justifyContent:'center', backgroundColor:'#FFFFFF'}}>
          <LottieView
            ref={animation}
            style={{
              width: 200,
              height:200,
              alignSelf: 'center',
            }}
            autoPlay={true}
            resizeMode='contain'
            loop={false}
            source={LoadingImg}
          />
        </View>
    </View>
    );

  }
//const bannerData = useMemo(() => state2.data, [state2]);
  return (
    <View style={styles.container}>
      {/* 헤더 탭 */}
      
      <View style={styles.headerAreaOn}>
        <Text style={{color:'#1E2022', fontWeight:'bold', fontSize:18, marginTop:8}}>{catename}</Text>
        <TouchableOpacity style={{position:'absolute', left:20,top:24}}
        onPress={() => {
          navigation.pop();
        }} >
        <BackIcon width={24} height={19} />
      </TouchableOpacity>
      </View>
  
      <View style={styles.content2}>
  
        <FlatList 
          style={{marginTop:10}}
          keyExtractor={item => item.idx.toString()}
          data={state.data}
          refreshing={state.refreshing}
          onRefresh={_handleRefresh}
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={() => getHeader()}
          renderItem={({item}) => { 
          
              let pfImg = imgUrl2 + item.img1;
              //let tempTitle = cutByLen(item.title, 20);
              let tempTitle = item.title2;

              return(
                <TouchableOpacity onPress={() => navigation.push("EnPage4",{idx: item.idx})} style={{borderWidth:1, borderColor:'#F6F6F6', marginLeft:10, marginRight:10, height:120, backgroundColor:'#FFFFFF', borderRadius:10, elevation:0, marginBottom:20}}>
                  <View style={{position:'absolute', top:15, left:15, width:90, height:90, borderRadius:20, backgroundColor:'#FFF'}}>
                    <Image style={styles.tinyLogo} resizeMode={'contain'} source={{ uri: pfImg }} style={{ width:90, height:90, borderRadius:20}} />
                  </View>
                  { item.ulike != 0 ?
                      (<HonIcon width={33} height={33} style={{position:'absolute',top:72, left:72 }} />):
                      (<HoffIcon width={33} height={33} style={{position:'absolute',top:72, left:72 }} />)
                    }
                  <StIcon width={42} height={42} style={{position:'absolute', bottom:0, right:0}} />
                  <View style={{marginLeft:120, top:25, paddingRight:20}}>
                    <Text style={{color:'#333333', fontWeight:'bold'}}>[{item.cate1}]</Text>
                    <Text style={{color:'#333333', fontWeight:'bold'}} numberOfLines={1}>{tempTitle}</Text>

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
    </View>
  );
}