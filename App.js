import React, { useEffect, useState, useRef } from 'react';

import { AsyncStorage } from 'react-native';

// font
import { useFonts } from 'expo-font';

// loading
import AppLoading from 'expo-app-loading';

// push
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// apollo
import { ApolloProvider} from '@apollo/client';

// graphQl
import { client } from './src/Client';

// context
import AuthContext from './src/AuthContext';

import * as SecureStore from 'expo-secure-store';

// fastimage
//import FastImage from 'react-native-fast-image';

// 스크린
import PageScreen from './components/PageScreen'; // 메인
import Page2Screen from './components/Page2Screen'; // 카테고리
import Page4Screen from './components/Page4Screen'; // 제품상세
import Page5Screen from './components/Page5Screen'; // 문의하기
import Page6Screen from './components/Page6Screen'; // 문의내역
import Page7Screen from './components/Page7Screen'; // 관심상품
import PageSScreen from './components/PageSScreen'; // 제품검색
import ScanScreen from './components/ScanScreen'; // 스캔
import InquireDetailScreen from './components/InquireDetailScreen'; // 문의내역 상세

import PdfScreen from './components/PdfScreen'; // pdf 사용안함
import FastScreen from './components/FastScreen'; // 스플래시
 
// 영문 스크린

import EnPageScreen from './components/EnPageScreen'; // 메인
import EnPage2Screen from './components/EnPage2Screen'; // 카테고리
import EnPageSScreen from './components/EnPageSScreen'; // 제품검색
import EnPage4Screen from './components/EnPage4Screen'; // 제품상세
import EnPage5Screen from './components/EnPage5Screen'; // 문의하기
import EnPage6Screen from './components/EnPage6Screen'; // 문의내역
import EnPage7Screen from './components/EnPage7Screen'; // 관심상품
import EnInquireDetailScreen from './components/EnInquireDetailScreen'; // 문의내역 상세
import EnScanScreen from './components/EnScanScreen'; // 스캔

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// App
const Stack = createStackNavigator();
function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [user, setUser] = useState({
    info : { 
      email: '',
      nick: '',
      isLogin: false,
      area1: '',
      areaNo1: 0,
      area2: '',
      areaNo2: 0,
      area3: '',
      areaNo3: 0,
      jwt: "",
      notiId: ""
    }
  });

  const userInfoState = { user, setUser };


  useEffect(() => {
    
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);


  return (
    <AuthContext.Provider value={userInfoState}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Fast" component={FastScreen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} /> 


            <Stack.Screen name="EnPage" component={EnPageScreen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} />
            <Stack.Screen name="EnPage2" component={EnPage2Screen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} /> 
            <Stack.Screen name="EnPageS" component={EnPageSScreen} options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            animationEnabled: false, }} /> 
            
            <Stack.Screen name="EnPage4" component={EnPage4Screen} options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            animationEnabled: false, }} /> 
            <Stack.Screen name="EnPage5" component={EnPage5Screen} options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            animationEnabled: false, }} /> 
            <Stack.Screen name="EnPage6" component={EnPage6Screen} options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            animationEnabled: false, }} /> 
            <Stack.Screen name="EnPage7" component={EnPage7Screen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} />
            <Stack.Screen name="EnInquireDetail" component={EnInquireDetailScreen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} />
            <Stack.Screen name="EnScan" component={EnScanScreen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} />



            <Stack.Screen name="InquireDetail" component={InquireDetailScreen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} /> 
            <Stack.Screen name="Page" component={PageScreen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} /> 
            <Stack.Screen name="Scan" component={ScanScreen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} /> 
            <Stack.Screen name="PageS" component={PageSScreen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} /> 
            <Stack.Screen name="Page2" component={Page2Screen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} /> 
            <Stack.Screen name="Page4" component={Page4Screen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} /> 
            <Stack.Screen name="Page5" component={Page5Screen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} /> 
            <Stack.Screen name="Page6" component={Page6Screen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} /> 
            <Stack.Screen name="Page7" component={Page7Screen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} />
            <Stack.Screen name="Pdf" component={PdfScreen} options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              animationEnabled: false, }} /> 

          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}



async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  //let uuid = uuidv4();
  await SecureStore.setItemAsync('secure_deviceid', token);
  //let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
  //console.log(fetchUUID);

  return token;
}







export default App;