import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Animated, Dimensions, AsyncStorage, ScrollView } from 'react-native';

// apollo
import { useMutation } from '@apollo/client';

// graphQl
import { GETMEMBER_MT, KEYWORD, TRADE, TRADE2, USER, SETUSER, SETINQUIRE } from '../src/Query';

// Util
import { timeForToday, makeFriendly, addressSplit, comma, cutByLen } from '../src/Util';

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
const baseUrl = "http://e-wjis.com/";
const imgUrl = baseUrl + "pic/";
const imgUrl2 = baseUrl + "pic/";


// Page
export default function Page5Screen({ route,navigation }) {

  const userInfo = useContext(AuthContext);
  //console.log(userInfo);

  const { idx } = route.params;

  const [value, onChangeText] = React.useState();
  const [value2, onChangeText2] = React.useState();
  const [value3, onChangeText3] = React.useState();
  const [value4, onChangeText4] = React.useState();

  const [tlike, setTlike] = React.useState(false);

  const [editStatus, setEditStatus] = React.useState(false);

  const [msgList, setMsgList] = useState([]);
  const [seltrade, { loading, error }] = useMutation(TRADE2);
  const [trade, { loading2, error2 }] = useMutation(TRADE);

  const [setUserInfo, { loading3, error3 }] = useMutation(SETUSER);
  const [getUserInfo, { loading4, error4 }] = useMutation(USER);
  const [setInquire, { loading5, error5 }] = useMutation(SETINQUIRE);

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

    //let dvc = await SecureStore.getItemAsync('secure_deviceid');

      await seltrade({ variables: { idx: idx, email:Application.androidId } }).then(response => {

        console.log(response.data.seltrade);
        setMsgList(response.data.seltrade);     
      })
      .catch(error => {
          console.log('ERROR ==>', error);
          console.log('ERROR1 ==>', error.networkError.result.errors);
      });

      await getUserInfo({ variables: { did: Application.androidId } }).then(response => {

        console.log(response.data.getUserInfo); 

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
          //console.log('ERROR1 ==>', error.networkError.result.errors);
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
  const _getData = async () => {

    //let dvc = await SecureStore.getItemAsync('secure_deviceid');

    trade({ variables: { page: state.page, stx: "", email: Application.androidId, cate1:"", cate2:"", cate3:"" } }).then(response => {

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


const iqProc = async () => {

  if (value == "" || value == null) {
    alert("Please enter your inquiry details.");
    return false;
  }

  if (value2 == "" || value2 == null) {
    alert("Please enter user information.");
    return false;
  }
  
  //let dvc = await SecureStore.getItemAsync('secure_deviceid');

  await setInquire({ variables: { did: Application.androidId, idx: idx, content: value } }).then(response => {

    alert("Your inquiry has been registered.");
    navigation.pop();
  })
  .catch(error => {
      console.log('ERROR ==>', error);
      //console.log('ERROR1 ==>', error.networkError.result.errors);
  });

  
}

const setInfo = async () => {

  //let dvc = await SecureStore.getItemAsync('secure_deviceid');

  await setUserInfo({ variables: { did: Application.androidId, name: value2, company: value3, tel: value4 } }).then(response => {

    if (response.data.setUserInfo) {
      if (response.data.setUserInfo.name) {
        onChangeText2(response.data.setUserInfo.name);
      }
      if (response.data.setUserInfo.company) {
        onChangeText3(response.data.setUserInfo.company);
      }
      if (response.data.setUserInfo.tel) {
        onChangeText4(response.data.setUserInfo.tel);
      }     
    }
  })
  .catch(error => {
      console.log('ERROR ==>', error);
      //console.log('ERROR1 ==>', error.networkError.result.errors);
  });
  setEditStatus(false);
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
  let tempTitle = cutByLen(String(msgList.title2), 40);

    
    return (
      <View style={styles.container}>
        
        {/* 헤더 탭 */}
        <View style={styles.headerAreaOn}>
          <Text style={styles.searchTitle}>Inquire</Text>
          <TouchableOpacity style={styles.backIcon}
          onPress={() => {
            navigation.pop();
          }} >
              <BackIcon width={24} height={19} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content2}>
          
            <ScrollView style={{marginTop:10}}>
                <TouchableOpacity onPress={() => navigation.push("EnPage4", { idx: msgList.idx })} style={styles.searchRowWrap}>
                    <Image style={styles.tinyLogo} source={{ uri: pfImg }} style={styles.searchImgWrap} />
                    <StIcon width={42} height={42} style={styles.searchStatus} />
                    <View style={styles.searchInfoWrap}>
                        <Text style={styles.searchText}>[{msgList.cate1}]</Text>
                        <Text style={styles.searchText}>{tempTitle}</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.inquireText}>Contents</Text>
                <View style={styles.inquireContentWrap}>
                    <TextInput
                        style={styles.inquireInput}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                        multiline={true}
                        placeholder="input text..."
                    />
                </View>
                <View style={styles.inquireInfo}>

                  { editStatus == true ? 
                    (<TouchableOpacity onPress={ () => setInfo() } style={styles.inquireAbsBtn}>
                      <Text style={{color:'#FFF'}}>Save</Text>
                    </TouchableOpacity>):
                    (<TouchableOpacity onPress={ () => setEditStatus(true) } style={styles.inquireAbsBtn2}>
                    <Text style={{color:'#FFF'}}>Modify</Text>
                    </TouchableOpacity>) }

                    <Text style={styles.inquireUserInfoText}>User Info</Text>

                    

                    { editStatus == true ? 
                    (<View>
                      <View style={styles.userEditWrap}>
                        <TextInput
                        style={styles.userEdit}
                        onChangeText={text => onChangeText2(text)}
                        value={value2}
                        multiline={true}
                        placeholder="Name"
                        />
                      </View>
                      <View style={styles.userEditWrap}>
                        <TextInput
                        style={styles.userEdit}
                        onChangeText={text => onChangeText3(text)}
                        value={value3}
                        multiline={true}
                        placeholder="Company"
                        />
                      </View>
                      <View style={styles.userEditWrap}>
                        <TextInput
                        style={styles.userEdit}
                        onChangeText={text => onChangeText4(text)}
                        value={value4}
                        multiline={true}
                        placeholder="Tel"
                        />
                      </View>
                    </View>):
                    (<View>
                      <Text style={styles.inquireUserInfo1}>{value2}</Text>
                      <Text style={styles.inquireUserInfo2}>Company : {value3}</Text>
                      <Text style={styles.inquireUserInfo2}>Tel : {value4}</Text>
                    </View>) }

                </View>


            </ScrollView>
            
            { editStatus == true ? 
            (<TouchableOpacity style={styles.inquireBottomBtn1}>
            <Text style={styles.inquireBottomBtnText}>Submit</Text>
            </TouchableOpacity>):
            (<TouchableOpacity onPress={() => iqProc()} style={styles.inquireBottomBtn2}>
                <Text style={styles.inquireBottomBtnText}>Submit</Text>
            </TouchableOpacity>) }
          
          
        </View>
      </View>
    );

  }
  