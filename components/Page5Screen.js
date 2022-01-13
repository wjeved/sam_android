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


import BackIcon from '../assets/images/back.svg'; //뒤로가기
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

  // 데이터 초기 실행
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

  // 데이터 가져오기
  const getMsg = async () => {

    //let dvc = await SecureStore.getItemAsync('secure_deviceid');

      await seltrade({ variables: { idx: idx, email:"" } }).then(response => {

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
  const _getData = async () => {

    let dvc = await SecureStore.getItemAsync('secure_deviceid');

    trade({ variables: { page: state.page, stx: "", email: dvc, cate1:"", cate2:"", cate3:"" } }).then(response => {

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

  //let dvc = await SecureStore.getItemAsync('secure_deviceid');

  if (value == "" || value == null) {
    alert("문의 내용을 입력해주세요.");
    return false;
  }

  if (value2 == "" || value2 == null) {
    alert("문의자 정보를 입력해주세요.");
    return false;
  }
  

  await setInquire({ variables: { did: Application.androidId, idx: idx, content: value } }).then(response => {

    alert("문의가 등록되었습니다.");
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
  let tempTitle = cutByLen(String(msgList.title), 40);

    
    return (
      <View style={styles.container}>
        {/* 헤더 탭 */}
        <View style={styles.headerAreaOn}>
          <Text style={styles.searchTitle}>문의하기</Text>
          <TouchableOpacity style={styles.backIcon}
        onPress={() => {
          navigation.pop();
        }} >
        <BackIcon width={24} height={19} />
      </TouchableOpacity>
        </View>
        
        <View style={styles.content2}>
          
            <ScrollView style={{marginTop:10}}>
                <TouchableOpacity onPress={() => navigation.push("Page4", { idx: msgList.idx })} style={styles.searchRowWrap}>
                    <Image style={styles.tinyLogo} source={{ uri: pfImg }} style={styles.searchImgWrap} />
                    <StIcon width={42} height={42} style={styles.searchStatus} />
                    <View style={styles.searchInfoWrap}>
                        <Text style={styles.searchText}>[{msgList.cate1}]</Text>
                        <Text style={styles.searchText}>{tempTitle}</Text>

                    </View>
                </TouchableOpacity>

                <Text style={styles.inquireText}>문의 내용</Text>
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
                      <Text style={{color:'#FFF'}}>저장</Text>
                    </TouchableOpacity>):
                    (<TouchableOpacity onPress={ () => setEditStatus(true) } style={styles.inquireAbsBtn2}>
                    <Text style={{color:'#FFF'}}>수정</Text>
                    </TouchableOpacity>) }

                    <Text style={styles.inquireUserInfoText}>문의자 정보</Text>

                    

                    { editStatus == true ? 
                    (<View>
                      <View style={styles.userEditWrap}>
                        <TextInput
                        style={styles.userEdit}
                        onChangeText={text => onChangeText2(text)}
                        value={value2}
                        multiline={true}
                        placeholder="담당자"
                        />
                      </View>
                      <View style={styles.userEditWrap}>
                        <TextInput
                        style={styles.userEdit}
                        onChangeText={text => onChangeText3(text)}
                        value={value3}
                        multiline={true}
                        placeholder="회사명"
                        />
                      </View>
                      <View style={styles.userEditWrap}>
                        <TextInput
                        style={styles.userEdit}
                        onChangeText={text => onChangeText4(text)}
                        value={value4}
                        multiline={true}
                        placeholder="연락처"
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
            (<TouchableOpacity style={styles.inquireBottomBtn1}>
            <Text style={styles.inquireBottomBtnText}>문의하기</Text>
            </TouchableOpacity>):
            (<TouchableOpacity onPress={() => iqProc()} style={styles.inquireBottomBtn2}>
                <Text style={styles.inquireBottomBtnText}>문의하기</Text>
            </TouchableOpacity>) }
          
          
        </View>
      </View>
    );

  }
  