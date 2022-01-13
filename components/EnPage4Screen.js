import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { FlatList, AppState, View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Dimensions, Animated, ActivityIndicator, Share } from 'react-native';

// Google Map
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";

// apollo
import { ApolloProvider, useMutation } from '@apollo/client';

// graphQl
import { client } from '../src/Client';
import { GETMEMBER_MT, TRADE, TRADE2, FAVOR } from '../src/Query';

// androidId
import * as Application from 'expo-application';

// Util
import { timeForToday, makeFriendly, addressSplit, comma, cutByLen } from '../src/Util';

// image viewer
import ImageViewer from 'react-native-image-zoom-viewer';

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

import BackIcon from '../assets/images/back2.svg'; //뒤로가기
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
import CloseIcon from '../assets/images/close_small.svg';


import ShareIcon from '../assets/images/share_icon.svg'; //공유 아이콘

// styles
import styles from '../assets/styles/styles';

import AuthContext from '../src/AuthContext';

// base url
const baseUrl = "http://woojinsj.com/";
const imgUrl = baseUrl + "pic/";
const imgUrl2 = baseUrl + "pic/";


// Page
export default function Page4Screen({  route, navigation }) {

  const userInfo = useContext(AuthContext);
  //console.log(userInfo);
  const { idx } = route.params;

  const [value, onChangeText] = React.useState();

  const [tlike, setTlike] = React.useState(false);

  const [msgList, setMsgList] = useState([]);
  const [seltrade, { loading, error }] = useMutation(TRADE2);
  const [trade, { loading2, error2 }] = useMutation(TRADE);
  const [setFavor, { loading3, error3 }] = useMutation(FAVOR);

  const [imgView, setImgView] = useState(false);
  const [img, setImg] = useState([]);
  const [size, setSize] = useState(325);

  const [state, setState] = React.useState({
    data: [],
    page: 0,
    refreshing: false,
  });

  useEffect(() => {
    getMsg();
    //_getData();
    return () => {
      setMsgList([]);
    }
  }, []);

  const getData = async () => {
    await getMsg();
  }

  const getMsg = async () => {

    console.log("data");

    //let dvc = await SecureStore.getItemAsync('secure_deviceid');

    await seltrade({ variables: { idx: idx, email:Application.androidId } }).then(response => {

      setMsgList(response.data.seltrade);
      
      _getData(response.data.seltrade);

      if (response.data.seltrade.ulike != null && response.data.seltrade.ulike != 0) {
        setTlike(true);
      }

      let imgData = [];
      

      if (response.data.seltrade.img1) {

        Image.getSize(imgUrl2 + response.data.seltrade.img1, (width, height) => {
          let tempWidth = parseInt(width);
          let tempHeight = parseInt(height);
    
          if (parseFloat(tempWidth/tempHeight) > 3) {
            console.log(tempWidth/tempHeight);
            console.log("aa");
            tempHeight = 200;
            setSize(200);
          } else if (parseFloat(tempWidth/tempHeight) > 2) {
            console.log(tempWidth/tempHeight);
            console.log("bb");
            tempHeight = 250;
            setSize(250);
          } else {
            tempHeight = 400;
            console.log(tempWidth/tempHeight);
            console.log(tempHeight);
          }
    
        });

        imgData[0] = {
          url: imgUrl2 + response.data.seltrade.img1,

          // width: number
          // height: number
          // Optional, if you know the image size, you can set the optimization performance
      
          // You can pass props to <Image />.
          props: {
              // headers: ...
          }
        }
        
        // setImg([{
        //   url: imgUrl2 + response.data.seltrade.img1,

        //   // width: number
        //   // height: number
        //   // Optional, if you know the image size, you can set the optimization performance
      
        //   // You can pass props to <Image />.
        //   props: {
        //       // headers: ...
        //   }
        // }]);
      }

      if (response.data.seltrade.img2) {
        imgData[1] = {
          url: imgUrl2 + response.data.seltrade.img2,

          // width: number
          // height: number
          // Optional, if you know the image size, you can set the optimization performance
      
          // You can pass props to <Image />.
          props: {
              // headers: ...
          }
        }
      }

      if (response.data.seltrade.img3) {
        imgData[2] = {
          url: imgUrl2 + response.data.seltrade.img3,

          // width: number
          // height: number
          // Optional, if you know the image size, you can set the optimization performance
      
          // You can pass props to <Image />.
          props: {
              // headers: ...
          }
        }
      }

      if (response.data.seltrade.img4) {
        imgData[3] = {
          url: imgUrl2 + response.data.seltrade.img4,

          // width: number
          // height: number
          // Optional, if you know the image size, you can set the optimization performance
      
          // You can pass props to <Image />.
          props: {
              // headers: ...
          }
        }
      }

      if (response.data.seltrade.img5) {
        imgData[4] = {
          url: imgUrl2 + response.data.seltrade.img5,

          // width: number
          // height: number
          // Optional, if you know the image size, you can set the optimization performance
      
          // You can pass props to <Image />.
          props: {
              // headers: ...
          }
        }
      }

      setImg(imgData);

    })
    .catch(error => {
        console.log('ERROR ==>', error);
        //console.log('ERROR1 ==>', error.networkError.result.errors);
    });
    


};

  const likeProc = async () => {
    //let dvc = await SecureStore.getItemAsync('secure_deviceid');
    if (tlike == true) {

      
      await setFavor({ variables: { did: Application.androidId, idx: idx, type:"del" } }).then(response => {

        console.log(response.data.setFavor);
        setTlike(false);
      })
      .catch(error => {
        setTlike(false);
          console.log('ERROR ==>', error);
          //console.log('ERROR1 ==>', error.networkError.result.errors);
      });
    } else {
      
      await setFavor({ variables: { did: Application.androidId, idx: idx, type:"" } }).then(response => {

        console.log(response.data.setFavor);
        setTlike(true);
      })
      .catch(error => {
        setTlike(true);
          console.log('ERROR ==>', error);
          //console.log('ERROR1 ==>', error.networkError.result.errors);
      });
      
    }
  }

  /* 데이터 가져오기 */
  const _getData = async (data) => {
    //let dvc = await SecureStore.getItemAsync('secure_deviceid');
    trade({ variables: { page: state.page, stx: "", email: Application.androidId, cate1:data.cate1, cate2:data.cate2, cate3:data.cate3 } }).then(response => {

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

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'http://woojinsj.com/product/'+idx ,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

  if(loading) {
    return (<View style={styles.container}><ActivityIndicator size="large" /></View>);
  }

    

  let tempTime = timeForToday(parseInt(msgList.date));
  let tempLike = makeFriendly(msgList.wlike);
  let tempCmt = makeFriendly(msgList.cmt);
  let tempView = makeFriendly(msgList.view);
  let pfImg = imgUrl + msgList.img;
  let pfImg2 = imgUrl2 + msgList.img1;
  let addr = addressSplit(String(msgList.address));
  let tempPrice = comma(msgList.price);
  let tempTitle = String(msgList.title2);
  let tempTitle2 = String(msgList.title);
  let tempMode = "contain";

  let val1, val2, val3 = "";

  if (msgList.cate3 == "Converter Inverter" || msgList.cate3 == "VVVF Inverter") {
    let tempArr = (msgList.eop20).split("|");
    val1 = "Dimension" + tempArr[0];
    val2 = "Weight: " + tempArr[1];
    val3 = "Ambient temp.: " + tempArr[2];
  }


  // 가로 너비 구하기
  let DevideWidth = Dimensions.get('window').width;

  if (imgView == true) {
    return (
      <View style={{flex:1}}>
        <TouchableOpacity onPress={() => setImgView(false)} style={{backgroundColor:'#000', paddingTop:30, paddingBottom:10, paddingLeft:20, alignItems:'flex-start'}}>
          <CloseIcon width={24} height={24} />
        </TouchableOpacity>
        <ImageViewer imageUrls={img} style={{flex:1}} />
      </View>
    );
  }

    return (
      <View style={styles.container}>
        
        <View style={styles.detailView}>
        {img.length > 0 ?
        (
          <TouchableOpacity onPress={() => setImgView(true)} style={styles.detailImgWrap}>
            <Image style={styles.tinyLogo}  resizeMode={tempMode} source={{
              uri: pfImg2,
            }} style={[styles.detailImg,{height:size}]} />
          </TouchableOpacity>
        ):(
          <Image style={styles.tinyLogo} resizeMode={tempMode} source={{
            uri: pfImg2,
          }} style={[styles.detailImg,{height:size}]} />
        )}
        </View>
        <TouchableOpacity style={styles.backBtnTouch}
        onPress={() => {
          navigation.pop();
        }} >
            <BackIcon width={24} height={19} />
        </TouchableOpacity>
     
        <View style={styles.content2}>
            <ScrollView>
                <View style={styles.detailInfoWrap}>
                    <Text style={styles.detailInfoTitle1}>{tempTitle}</Text>
                    <Text style={styles.detailInfoTitle2}>{tempTitle2}</Text>
                    <TouchableOpacity style={styles.shareBtn} onPress={() => onShare()}>
                      <ShareIcon width={35} height={35} />
                    </TouchableOpacity>
                </View>
                { tlike == true ? (
                <TouchableOpacity onPress={()=>likeProc()}  style={styles.favorBtn}>
                  <HonIcon width={33} height={33} /></TouchableOpacity>
                ):(
                  <TouchableOpacity onPress={()=>likeProc()}  style={styles.favorBtn}>
                    <HoffIcon width={33} height={33} />
                    </TouchableOpacity>
                  )
                }


                <View style={styles.detailExWrap}>
                    {(msgList.opte1 != "" && msgList.eop1 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte1} : {msgList.eop1}</Text>):null}
                    {(msgList.opte2 != "" && msgList.eop2 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte2} : {msgList.eop2}</Text>):null}
                    {(msgList.opte3 != "" && msgList.eop3 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte3} : {msgList.eop3}</Text>):null}
                    {(msgList.opte4 != "" && msgList.eop4 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte4} : {msgList.eop4}</Text>):null}
                    {(msgList.opte5 != "" && msgList.eop5 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte5} : {msgList.eop5}</Text>):null}
                    {(msgList.opte6 != "" && msgList.eop6 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte6} : {msgList.eop6}</Text>):null}
                    {(msgList.opte7 != "" && msgList.eop7 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte7} : {msgList.eop7}</Text>):null}
                    {(msgList.opte8 != "" && msgList.eop8 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte8} : {msgList.eop8}</Text>):null}
                    {(msgList.opte9 != "" && msgList.eop9 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte9} : {msgList.eop9}</Text>):null}
                    {(msgList.opte10 != "" && msgList.eop10 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte10} : {msgList.eop10}</Text>):null}
                    {(msgList.opte11 != "" && msgList.eop11 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte11} : {msgList.eop11}</Text>):null}
                    {(msgList.opte12 != "" && msgList.eop12 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte12} : {msgList.eop12}</Text>):null}
                    {(msgList.opte13 != "" && msgList.eop13 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte13} : {msgList.eop13}</Text>):null}
                    {(msgList.opte14 != "" && msgList.eop14 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte14} : {msgList.eop14}</Text>):null}
                    {(msgList.opte15 != "" && msgList.eop15 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte15} : {msgList.eop15}</Text>):null}
                    {(msgList.opte16 != "" && msgList.eop16 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte16} : {msgList.eop16}</Text>):null}
                    {(msgList.opte17 != "" && msgList.eop17 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte17} : {msgList.eop17}</Text>):null}
                    {(msgList.opte18 != "" && msgList.eop18 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opte18} : {msgList.eop18}</Text>):null}

                    {msgList.eop19 != "" ?
                    (<Text style={styles.detailExText2}>{msgList.eop19}</Text>):null}
                    {msgList.eop20 != "" ?
                    (<Text style={styles.detailExText2}>{msgList.eop20}</Text>):null}
                </View>
                
                
                { state.data.length > 1 ?                
                (<Text style={styles.relTitle}>Related products</Text>):null
                }

                <View style={styles.relWrap}>

                    <FlatList 
                      style={styles.relFlat}
                      horizontal={true}
                      keyExtractor={item => item.idx.toString()}
                      data={state.data}
                      refreshing={state.refreshing}
                      //onRefresh={_handleRefresh}
                      //onEndReached={_handleLoadMore}
                      onEndReachedThreshold={0.5}
                      renderItem={({item}) => { 
                      
                        
                          let pfImg = imgUrl2 + item.img1;
                          //let tempTitle = cutByLen(item.title, 14);
                          let tempTitle = item.title;
                          //console.log("length = " + item.title.length);
                          // if (item.title.length > 14) {
                          //   tempTitle = tempTitle + " ...";
                          // }

                        if(item.idx == idx) {
                          return null;
                        }

                        return(

                        <TouchableOpacity onPress={() => navigation.push("EnPage4", {idx:item.idx })} style={styles.relItem}>
                            <View style={styles.relItemImgWrap}>
                              <Image style={styles.tinyLogo} resizeMode={'contain'} source={{ uri: pfImg }} style={styles.relItemImg} />
                            </View>
                            <StIcon width={42} height={42} style={styles.relSt} />
                            <View style={{width:115}}>
                                <Text style={styles.relTitle2} numberOfLines={1}>{tempTitle}</Text>
                            </View>
                            
                        </TouchableOpacity>
                        )}}
                        
                    />

                </View>
            </ScrollView>

            <TouchableOpacity onPress={() => navigation.navigate("EnPage5", {idx: msgList.idx} )} style={styles.InquireBtn}>
                <Text style={{color:'#FFFFFF', fontWeight:'bold', fontSize:18}}>Inquire</Text>
            </TouchableOpacity>
          
        </View>
      </View>
    );
  }
  