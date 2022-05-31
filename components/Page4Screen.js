import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { FlatList, AppState, View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Dimensions, Animated, ActivityIndicator, Share } from 'react-native';

// apollo
import { ApolloProvider, useMutation } from '@apollo/client';

// graphQl
import { client } from '../src/Client';
import { TRADE, TRADE2, FAVOR } from '../src/Query';

// androidId
import * as Application from 'expo-application';

// Util
import { timeForToday, makeFriendly, addressSplit, comma, cutByLen } from '../src/Util';

// image viewer
import ImageViewer from 'react-native-image-zoom-viewer';


import BackIcon from '../assets/images/back2.svg'; //뒤로가기

import HonIcon from '../assets/images/h_on.svg';
import HoffIcon from '../assets/images/h_off.svg';
import StIcon from '../assets/images/m_arrow.svg';
import CloseIcon from '../assets/images/close_small.svg';

import ShareIcon from '../assets/images/share_icon.svg'; //공유 아이콘

// styles
import styles from '../assets/styles/styles';

import AuthContext from '../src/AuthContext';

// base url
const baseUrl = "http://e-wjis.com/";
const imgUrl = baseUrl + "pic/";
const imgUrl2 = baseUrl + "pic/";


// Page
export default function Page4Screen({  route, navigation }) {

  const userInfo = useContext(AuthContext);
  //console.log(userInfo);
  const { idx } = route.params;

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


  // 초기 실행
  useEffect(() => {
    getMsg();
    //_getData();
    return () => {
      setMsgList([]);
    }
  }, []);


  // 데이터 가져오기
  const getMsg = async () => {

    //let dvc = await SecureStore.getItemAsync('secure_deviceid');

      await seltrade({ variables: { idx: idx, email:Application.androidId } }).then(response => {

        // 가져온 데이터 변수에 저장
        setMsgList(response.data.seltrade);
        
        _getData(response.data.seltrade);

        if (response.data.seltrade.ulike != null && response.data.seltrade.ulike != 0) {
          setTlike(true);
        }

        let imgData = [];
        
        // 가져온 이미지 처리
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
  
         
            props: {
            }
          }
          
        }

        if (response.data.seltrade.img2) {
          imgData[1] = {
            url: imgUrl2 + response.data.seltrade.img2,

            props: {
            }
          }
        }

        if (response.data.seltrade.img3) {
          imgData[2] = {
            url: imgUrl2 + response.data.seltrade.img3,
  
            props: {
            }
          }
        }

        if (response.data.seltrade.img4) {
          imgData[3] = {
            url: imgUrl2 + response.data.seltrade.img4,
  
            props: {
            }
          }
        }

        if (response.data.seltrade.img5) {
          imgData[4] = {
            url: imgUrl2 + response.data.seltrade.img5,
  
            props: {
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

  // 관심제품 처리 함수
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

// 공유하기 버튼 처리
const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'http://e-wjis.com/product/'+idx ,
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

  
  // 가로 너비 구하기
  let DevideWidth = Dimensions.get('window').width;
  let pfImg2 = imgUrl2 + msgList.img1;
  let tempTitle = String(msgList.title);
  let tempTitle2 = String(msgList.title2);
  let tempMode = "contain";
  

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

  // let val1, val2, val3 = "";

  // if (msgList.cate3 == "Converter Inverter" || msgList.cate3 == "VVVF Inverter") {
  //   let tempArr = (msgList.op20).split("무게: ");
  //   val1 = tempArr[0];
  //   let tempArr2 = (tempArr[1]).split("작동온도: ");
  //   val2 = "무게: " + tempArr2[0];
  //   val3 = "작동온도: " + tempArr2[1];
  // }

  // 화면 렌더링

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
                    {(msgList.description != "") ? 
                    (<View style={styles.detailDescWrap}><Text style={styles.detailExText}>{msgList.description}</Text></View>) : null}
                    {(msgList.opt1 != "" && msgList.op1 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt1} : {msgList.op1}</Text>):null}
                    {(msgList.opt2 != "" && msgList.op2 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt2} : {msgList.op2}</Text>):null}
                    {(msgList.opt3 != "" && msgList.op3 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt3} : {msgList.op3}</Text>):null}
                    {(msgList.opt4 != "" && msgList.op4 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt4} : {msgList.op4}</Text>):null}
                    {(msgList.opt5 != "" && msgList.op5 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt5} : {msgList.op5}</Text>):null}
                    {(msgList.opt6 != "" && msgList.op6 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt6} : {msgList.op6}</Text>):null}
                    {(msgList.opt7 != "" && msgList.op7 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt7} : {msgList.op7}</Text>):null}
                    {(msgList.opt8 != "" && msgList.op8 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt8} : {msgList.op8}</Text>):null}
                    {(msgList.opt9 != "" && msgList.op9 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt9} : {msgList.op9}</Text>):null}
                    {(msgList.opt10 != "" && msgList.op10 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt10} : {msgList.op10}</Text>):null}
                    {(msgList.opt11 != "" && msgList.op11 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt11} : {msgList.op11}</Text>):null}
                    {(msgList.opt12 != "" && msgList.op12 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt12} : {msgList.op12}</Text>):null}
                    {(msgList.opt13 != "" && msgList.op13 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt13} : {msgList.op13}</Text>):null}
                    {(msgList.opt14 != "" && msgList.op14 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt14} : {msgList.op14}</Text>):null}
                    {(msgList.opt15 != "" && msgList.op15 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt15} : {msgList.op15}</Text>):null}
                    {(msgList.opt16 != "" && msgList.op16 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt16} : {msgList.op16}</Text>):null}
                    {(msgList.opt17 != "" && msgList.op17 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt17} : {msgList.op17}</Text>):null}
                    {(msgList.opt18 != "" && msgList.op18 != "") ?
                    (<Text style={styles.detailExText}>{msgList.opt18} : {msgList.op18}</Text>):null}

                    {msgList.op19 != "" ?
                    (<Text style={styles.detailExText2}>{msgList.op19}</Text>):null}
                    {msgList.op20 != "" ?
                    (<Text style={styles.detailExText2}>{msgList.op20}</Text>):null}
                </View>


                { state.data.length > 1 ?                
                (<Text style={styles.relTitle}>관련 제품</Text>):null
                }

                <View style={styles.relWrap}>

                    <FlatList 
                      style={styles.relFlat}
                      horizontal={true}
                      keyExtractor={item => item.idx.toString()}
                      data={state.data}
                      refreshing={state.refreshing}
                      onEndReachedThreshold={0.5}
                      renderItem={({item}) => { 
                      
                        
                          let pfImg = imgUrl2 + item.img1;
                          let tempTitle = item.title;

                        if(item.idx == idx) {
                          return null;
                        }

                        return(

                        <TouchableOpacity onPress={() => navigation.push("Page4", {idx:item.idx })} style={styles.relItem}>
                            <View style={styles.relItemImgWrap}>
                              <Image style={styles.tinyLogo} resizeMode={'contain'} source={{ uri: pfImg }} style={styles.relItemImg} />
                            </View>
                            {/* <StIcon width={42} height={42} style={styles.relSt} /> */}
                            <View style={{width:115}}>
                                <Text style={styles.relTitle2} numberOfLines={2}>{tempTitle}</Text>
                            </View>
                            
                        </TouchableOpacity>
                        )}}
                        
                    />

                </View>
            </ScrollView>

            <TouchableOpacity onPress={() => navigation.navigate("Page5", {idx: msgList.idx} )} style={styles.InquireBtn}>
                <Text style={{color:'#FFFFFF', fontWeight:'bold', fontSize:18}}>문의하기</Text>
            </TouchableOpacity>
          
        </View>
      </View>
    );
  }
  