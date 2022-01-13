import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Animated, Dimensions, AsyncStorage, ScrollView } from 'react-native';

// apollo
import { useMutation } from '@apollo/client';

// graphQl
import { GETMEMBER_MT, KEYWORD, TRADE, TRADE2, USER, SETUSER, GETINQUIRE2 } from '../src/Query';

// Util
import { timeForToday, makeFriendly, addressSplit, comma, cutByLen } from '../src/Util';

// androidId
import * as Application from 'expo-application';

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
const baseUrl = "http://woojinsj.com/";
const imgUrl = baseUrl + "pic/";
const imgUrl2 = baseUrl + "pic/";


// Wick
export default function InquireDetailScreen({ route,navigation }) {

  const userInfo = useContext(AuthContext);
  //console.log(userInfo);

  const { idx, idx2 } = route.params;

  const [value, onChangeText] = React.useState();
  const [value2, onChangeText2] = React.useState();
  const [value3, onChangeText3] = React.useState();
  const [value4, onChangeText4] = React.useState();
  const [value5, onChangeText5] = React.useState();

  const [tlike, setTlike] = React.useState(false);

  const [editStatus, setEditStatus] = React.useState(false);

  const [msgList, setMsgList] = useState([]);
  const [msgList2, setMsgList2] = useState([]);
  const [seltrade, { loading, error }] = useMutation(TRADE2);
  const [trade, { loading2, error2 }] = useMutation(TRADE);

  const [setUserInfo, { loading3, error3 }] = useMutation(SETUSER);
  const [getUserInfo, { loading4, error4 }] = useMutation(USER);
  const [getInquire2, { loading5, error5 }] = useMutation(GETINQUIRE2);

  const [state, setState] = React.useState({
    data: [],
    page: 0,
    refreshing: false,
  });

  useEffect(() => {
    getMsg();
    _getData();
    //alert(Application.androidId);
    return () => {
      setMsgList([]);
    }
  }, []);

  const getData = async () => {
    await getMsg();
  }

  const getMsg = async () => {

      await seltrade({ variables: { idx: idx, email:"" } }).then(response => {

        //console.log(response.data.seltrade);
        setMsgList(response.data.seltrade);     
      })
      .catch(error => {
          console.log('ERROR ==>', error);
          //console.log('ERROR1 ==>', error.networkError.result.errors);
      });

      await getInquire2({ variables: { idx: idx2 } }).then(response => {

        console.log(response.data.getInquire2);
        setMsgList2(response.data.getInquire2);
        onChangeText(response.data.getInquire2.cont);
        onChangeText2(response.data.getInquire2.name);
        onChangeText3(response.data.getInquire2.company);
        onChangeText4(response.data.getInquire2.tel);
        onChangeText5(response.data.getInquire2.reply);
      })
      .catch(error => {
          //console.log('ERROR ==>', error);
          //console.log('ERROR1 ==>', error.networkError.result.errors);
      });

      await getUserInfo({ variables: { did: Application.androidId } }).then(response => {

        //console.log(response.data.getUserInfo); 

        if (response.data.getUserInfo) {
          if (response.data.getUserInfo.name) {
            onChangeText2(response.data.getUserInfo.name);
          }
          if (response.data.getUserInfo.company) {
            onChangeText3(response.data.getUserInfo.company);
          }
          if (response.data.getUserInfo.tel) {
            onChangeText4(response.data.getUserInfo.tel);
          }          
          
        }
      })
      .catch(error => {
          //console.log('ERROR ==>', error);
          console.log('ERROR1 ==>', error.networkError.result.errors);
      });


  };

  const likeProc = () => {
    if (tlike == true) {
      setTlike(false);
    } else {
      setTlike(true);
    }
  }

  /* 데이터 가져오기 */
  const _getData = () => {

    trade({ variables: { page: state.page, stx: "", email: userInfo.user.info.email, cate1:"", cate2:"", cate3:"" } }).then(response => {

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



  // 가로 너비 구하기
  let DevideWidth = Dimensions.get('window').width;

  let tempTime = timeForToday(parseInt(msgList.date));
  let tempLike = makeFriendly(msgList.wlike);
  let tempCmt = makeFriendly(msgList.cmt);
  let tempView = makeFriendly(msgList.view);
  let pfImg = imgUrl + msgList.img1;
  let pfImg2 = imgUrl2 + msgList.img1;
  let addr = addressSplit(String(msgList.address));
  let tempPrice = comma(msgList.price);
  let tempTitle = cutByLen(String(msgList.title), 40);

    
    return (
      <View style={styles.container}>
        {/* 헤더 탭 */}
        <View style={styles.headerAreaOn}>
          <Text style={styles.searchTitle}>문의내역</Text>
        </View>
        
        <View style={styles.content2}>
          
            <ScrollView style={styles.mt10}>
                <TouchableOpacity onPress={() => navigation.push("Page4", { idx: msgList.idx })} style={styles.detailProduct}>
                    <Image style={styles.tinyLogo} source={{ uri: pfImg }} style={styles.detailProductImg} />
                    <StIcon width={42} height={42} style={styles.detailProductStatus} />
                    <View style={styles.detailProductInfo}>
                        <Text style={styles.detailProductInfoText}>[{msgList.cate1}]</Text>
                        <Text style={styles.detailProductInfoText}>{tempTitle}</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.detailInquireTitle}>문의내용</Text>
                <View style={styles.detailInquireInputWrap}>
                    <TextInput
                        style={styles.detailInquireInput}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                        multiline={true}
                        editable={false}
                        placeholder=""
                    />
                </View>

                <Text style={styles.detailInquireTitle2}>답변</Text>
                <View style={styles.detailInquireInputWrap}>
                    <TextInput
                        style={styles.detailInquireInput}
                        onChangeText={text => onChangeText5(text)}
                        value={value5}
                        multiline={true}
                        editable={false}
                        placeholder=""
                    />
                </View>
                <View style={styles.inquireInfo}>


                    <Text style={styles.inquireUserInfoText}>문의자 정보</Text>

                    

                    { editStatus == true ? 
                    (<View>
                      <View style={styles.userEditWrap}>
                        <TextInput
                        style={styles.userEdit}
                        onChangeText={text => onChangeText2(text)}
                        value={value2}
                        multiline={true}
                        placeholder="name"
                        />
                      </View>
                      <View style={styles.userEditWrap}>
                        <TextInput
                        style={styles.userEdit}
                        onChangeText={text => onChangeText3(text)}
                        value={value3}
                        multiline={true}
                        placeholder="company"
                        />
                      </View>
                      <View style={styles.userEditWrap}>
                        <TextInput
                        style={styles.userEdit}
                        onChangeText={text => onChangeText4(text)}
                        value={value4}
                        multiline={true}
                        placeholder="tel"
                        />
                      </View>
                    </View>):
                    (<View>
                      <Text style={styles.inquireUserInfo1}>{value2}</Text>
                      <Text style={styles.inquireUserInfo2}>회사명 : {value3}</Text>
                      <Text style={styles.inquireUserInfo2}>연락처 : {value4}</Text>
                    </View>) }

                </View>

            </ScrollView>
            
            { editStatus == true ? 
            (<TouchableOpacity onPress={() => navigation.pop()} style={styles.inquireBottomBtn2}>
            <Text style={styles.inquireBottomBtnText}>닫기</Text>
            </TouchableOpacity>):
            (<TouchableOpacity onPress={() => navigation.pop()} style={styles.inquireBottomBtn2}>
                <Text style={styles.inquireBottomBtnText}>닫기</Text>
            </TouchableOpacity>) }
          
          
        </View>
      </View>
    );

  }
  