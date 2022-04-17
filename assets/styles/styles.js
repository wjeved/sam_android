import { StyleSheet, Dimensions } from 'react-native';

// Status-bar-height
import { getStatusBarHeight } from "react-native-status-bar-height"; 

// 스타일
const styles = StyleSheet.create({
    container: {
      marginTop: getStatusBarHeight(),
      flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
      backgroundColor:'#FAFAFB'
    },
    container2: {
      marginTop: 0,
      flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
      backgroundColor:'#FAFAFB'
    },
    headerAreaOn: {
      width:'100%',
      height:60,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'

    },
    content2: {
      flex:1,
      width:'100%',
      marginTop:0,
      marginBottom:0,
      backgroundColor:'#FAFAFB'
    },
    bottomMenu: {
      width:'100%',
      height:62,
      backgroundColor:'#FFFFFF',
      flexDirection:'row',
      borderTopWidth:1,
      borderTopColor:'#EEE'
    },
    bottomTabBtnOn: {
      flex:1/3,
      flexDirection:'column',
      height:62,
      alignItems:'center',
      justifyContent:'center'
    },
    bottomTabBtnOff: {
      flex:1/3,
      flexDirection:'column',
      height:62,
      alignItems:'center',
      justifyContent:'center'
    },
    bottomTabon: {
      color:'#4F94F1',
      marginTop:6,
      fontSize:11,
      
    },
    bottomTaboff: {
      color:'#D2D2D2',
      marginTop:6,
      fontSize:11,
      
    },
    searchRow2: {

      height:48,
      marginTop:12,
      marginLeft:12,
      marginRight:12,
      marginBottom:6,
      alignItems:'center',
      borderRadius:10, 
      backgroundColor:'#FFF',
      shadowColor:'#FFF',
      shadowOpacity:0.1, 
      shadowOffset: { width:0, height:1 },
      elevation: 3,
    },
    lang: {
      position:'absolute', top:22, right:20, paddingTop:4,paddingBottom:4, paddingLeft:8, paddingRight:8, backgroundColor:'#FFF', elevation:2, borderRadius:8
    },
    logo: {
      marginTop:8
    },
    langText: {
      color:"#77878F", fontSize:14
    },
    mainScrollView: {
      marginTop:0, marginLeft:12, marginRight:0
    },
    mainTitle: {
      color:'#7B8992', fontWeight:'600', fontSize:16, marginLeft:10, marginBottom:15
    },
    mainTitle2: {
      color:'#7B8992', fontWeight:'600', fontSize:16, marginLeft:10, marginBottom:15, marginTop:10
    },
    mainBox: {
      flexDirection:'row', marginBottom:6
    },
    mainItem: {
      flexDirection:'row', 
      alignItems:'center', 
      justifyContent:'center', 
      flex:1/3, 
      height:48,
      marginRight:12,
      marginBottom:6,
      alignItems:'center',
      borderRadius:12, 
      backgroundColor:'#FFF',
      shadowColor:'#FFF',
      shadowOpacity:0.1, 
      shadowOffset: { width:0, height:1 },
      elevation: 0,
      borderWidth:1, 
      borderColor:'#F6F6F6'
    },
    mainItemText: {
      textAlign:'center',color:"#7B8992", fontSize:14, marginLeft:0
    },
    mainItemText2: {
      textAlign:'center',color:"#7B8992", fontSize:13, marginLeft:0
    },
    mainItemText3: {
      flexDirection:'row', alignItems:'center', justifyContent:'center', flex:1/3, height:48,marginRight:12,marginBottom:6
    },
    


    //Page2

    headerView: {
      marginTop:10, marginLeft:12, marginRight:0
    },
    headerFlat: {
      paddingBottom:20
    },
    headerFlatItem: {
      width:225, height:225, borderRadius:20, backgroundColor:'#FFF'
    },
    stIcon: {
      position:'absolute', right:0, top:183
    },
    headerTouch: {
      marginLeft:0,marginRight:12,marginTop:0, borderRadius:8
    },
    headerWidth:{
      width:225
    },
    headerImg: {
      width:225, height:225, borderRadius:20
    },
    headerTitle1: {
      marginTop:10, marginLeft:0, color:'#1E2022', fontWeight:'bold', fontSize:14
    },
    headerTitle2: {
      marginTop:0, marginLeft:0, color:'#4F94F1', letterSpacing:1
    },
    imgView: {
      backgroundColor:'#000', paddingTop:30, paddingBottom:10, paddingLeft:20, alignItems:'flex-start'
    },
    detailView: {
      backgroundColor:'#FFF', borderTopWidth:1, borderTopColor:'#EEE', borderBottomWidth:1, borderBottomColor:'#EEE', width:'100%', height:325, justifyContent:'center', alignItems:'center'
    },
    detailImgWrap: {
      width:'100%', height:325, alignItems:'center', justifyContent:'center'
    },
    detailImg: {
      width:'100%', borderRadius:0
    },
    backBtnTouch: {
      position:'absolute', left:20,top:20, width:36, height:36,alignItems:'center', justifyContent:'center', borderRadius:20, backgroundColor:'rgba(79,148,241,0.5)'
    },
    detailInfoWrap: {
      paddingRight:40, marginTop:15
    },
    detailInfoTitle1: {
      marginTop:0, marginLeft:20, color:'#273B35', fontWeight:'bold', fontSize:20, lineHeight:28
    },
    detailInfoTitle2: {
      marginTop:0, marginLeft:20, color:'rgba(39,59,53, 0.8)', letterSpacing:1
    },
    shareBtn: {
      position:'absolute', right:65,top:5
    },
    favorBtn: {
      position:'absolute',top:20, right:20
    },
    detailExWrap: {
      marginLeft:20, marginRight:20, marginTop:20
    },
    detailDescWrap: {
      marginBottom:10, color:'rgba(39,59,53, 0.6)'
    },
    detailExText: {
      marginTop:0, marginLeft:0, color:'rgba(39,59,53, 0.6)'
    },
    detailExText2: {
      marginTop:10, marginLeft:0, color:'rgba(39,59,53, 0.6)', lineHeight:20
    },
    relTitle: {
      marginTop:30, color:'rgba(39,59,53, 1)', fontWeight:'bold', fontSize:20, marginLeft:20, marginBottom:20
    },
    relWrap: {
      marginTop:0, marginLeft:12, marginRight:0
    },
    relFlat: {
      paddingBottom:40
    },
    relItem: {
      marginLeft:0,marginRight:12,marginTop:0, borderRadius:8
    },
    relItemImgWrap: {
      width:115, height:115, backgroundColor:'#FFF', borderRadius:20
    },
    relItemImg: {
      width:115, height:115, borderRadius:20
    },
    relSt: {
      position:'absolute', right:0, top:183
    },
    relTitle2: {
      marginTop:10, marginLeft:0, color:'rgba(39,59,53, 0.6)', fontSize:13
    },
    InquireBtn: {
      marginTop:10, marginRight:10, marginLeft:10,marginBottom:10, height:46,borderRadius:18, backgroundColor:"#4F94F1", alignItems:'center', justifyContent:'center'
    },

    // PageS
    searchTitle: {
      color:'#1E2022', fontWeight:'bold', fontSize:18, marginTop:8
    },
    searchWrap: {
      position:'absolute', left:18, top:8, width:250,flexDirection:"row", alignItems:'center', justifyContent:'flex-start'
    },
    searchInput: {
      marginTop:2,marginLeft:10, marginRight:0, lineHeight: 20, borderWidth: 0, fontSize:18, color:"#D2D2D2"
    },
    searchRowWrap: {
      borderWidth:1, borderColor:'#F6F6F6', marginLeft:10, marginRight:10, height:120, backgroundColor:'#FFFFFF', borderRadius:10, elevation:0, marginBottom:20
    },
    searchImgWrap: {
      position:'absolute', top:15, left:15, width:90, height:90, borderRadius:20, backgroundColor:'#FFF'
    },
    searchImg: {
      width:90, height:90, borderRadius:20
    },
    searchStatus: {
      position:'absolute', bottom:0, right:0
    },
    searchText: {
      color:'#333333', fontWeight:'bold'
    },
    searchInfoWrap: {
      marginLeft:120, top:25
    },
    searchInfo2Wrap: {
      marginTop:10,flexDirection:'row'
    },
    searchinquireText: {
      color:'#4F94F1'
    },
    backIcon: {
      position:'absolute', left:20,top:24
    },

    //Page5
    inquireText: {
      marginTop:0, color:'rgba(39,59,53, 1)', fontWeight:'normal', fontSize:16, marginLeft:20, marginBottom:10
    },
    inquireContentWrap: {
      marginLeft:10, marginRight:10, padding:10, height:280, borderRadius:5, borderWidth:1, borderColor:'#CCC', backgroundColor:'#F2F2F2'
    },
    inquireInput: {
      height: 260, borderWidth: 0, fontSize:14, paddingTop:0, paddingBottom:0, textAlignVertical:'top'
    },
    inquireInfo: {
      backgroundColor:'#FFFFFF', borderTopLeftRadius:30, paddingBottom:30, marginTop:20
    },
    inquireAbsBtn: {
      position:'absolute', top:30,right:20,backgroundColor:'#4F94F1', justifyContent:'center', alignItems:'center', paddingTop:5, paddingLeft:20, paddingBottom:5, paddingRight:20, borderRadius:20
    },
    inquireAbsBtn2: {
      position:'absolute', top:30,right:20,backgroundColor:'#4F94F1', justifyContent:'center', alignItems:'center', paddingTop:5, paddingLeft:20, paddingBottom:5, paddingRight:20, borderRadius:20
    },
    inquireUserInfoText: {
      marginTop:20, color:'rgba(39,59,53, 1)', fontWeight:'normal', fontSize:16, marginLeft:20, marginBottom:20
    },
    userEditWrap: {
      marginTop:10, marginLeft:10, marginRight:10, padding:12, height:50, borderRadius:5, borderWidth:1, borderColor:'#CCC', backgroundColor:'#F2F2F2'
    },
    userEdit: {
      height: 30, borderWidth: 0, fontSize:14, paddingTop:0, paddingBottom:0, textAlignVertical:'top'
    },
    inquireUserInfo1: {
      color:'#57636F', marginLeft:20, marginBottom:10
    },
    inquireUserInfo2: {
      color:'#57636F', marginLeft:20, marginBottom:0
    },
    inquireBottomBtn1: {
      marginRight:10, marginLeft:10,marginBottom:10, height:46,borderRadius:18, backgroundColor:"#CCC", alignItems:'center', justifyContent:'center'
    },
    inquireBottomBtn2: {
      marginRight:10, marginLeft:10,marginBottom:10, height:46,borderRadius:18, backgroundColor:"#4F94F1", alignItems:'center', justifyContent:'center'
    },

    // Page6
    dateWrap: {
      flex:1, alignItems:'center', justifyContent:'center'
    },
    dateNodataIcon: {
      marginTop:0
    },
    dateNodata: {
      marginTop:30, color:'#DEDFDE'
    },
    dataListWrap: {
      marginTop:10, marginLeft:12, marginRight:0
    },
    dataFlatList: {
      marginBottom:5
    },
    dateItem: {
      flexDirection:'column', alignItems:'center', justifyContent:'center', width:70, height:70,marginRight:12,marginBottom:6,alignItems:'center',borderRadius:16, backgroundColor:'#4F93F0',
                      shadowColor:'#FFF',shadowOpacity:0.1, shadowOffset: { width:0, height:1 },elevation: 0,borderWidth:1, borderColor:'#4F93F0'
    },
    dateItem2: {
      flexDirection:'column', alignItems:'center', justifyContent:'center', width:70, height:70,marginRight:12,marginBottom:6,alignItems:'center',borderRadius:16, backgroundColor:'#F1F1F1',
                      shadowColor:'#FFF',shadowOpacity:0.1, shadowOffset: { width:0, height:1 },elevation: 0,borderWidth:1, borderColor:'#F1F1F1'
    },
    dateItemText1: {
      color:"#FFFFFF", fontWeight:'bold', fontSize:22, marginLeft:0
    },
    dateItemText2: {
      color:"#FFFFFF", fontSize:16, marginLeft:0
    },
    dateItemText3: {
      color:"#333333", fontWeight:'bold', fontSize:22, marginLeft:0
    },
    dateItemText4: {
      color:"#77878F", fontSize:16, marginLeft:0
    },
    productItem: {
      borderWidth:1, borderColor:'#F6F6F6', marginLeft:10, marginRight:10, height:120, backgroundColor:'#FFFFFF', borderRadius:10, elevation:0, marginBottom:20
    },
    productItemImg: {
      position:'absolute', top:15, left:15, width:90, height:90, borderRadius:20
    },
    productIcon1: {
      position:'absolute', bottom:0, right:0
    },
    productInfoTextWrap: {
      marginLeft:120, top:25
    },
    productInfoText: {
      color:'#333333', fontWeight:'bold'
    },

    // InquireDetail
    mt10: {
      marginTop:10
    },
    detailProduct: {
      borderWidth:1, borderColor:'#F6F6F6', marginLeft:10, marginRight:10, height:120, backgroundColor:'#FFFFFF', borderRadius:10, elevation:0, marginBottom:20
    },
    detailProductImg: {
      position:'absolute', top:15, left:15, width:90, height:90, borderRadius:20
    },
    detailProductStatus: {
      position:'absolute', bottom:0, right:0
    },
    detailProductInfo: {
      marginLeft:120, top:25
    },
    detailProductInfoText: {
      color:'#333333', fontWeight:'bold'
    },
    detailInquireTitle: {
      marginTop:0, color:'rgba(39,59,53, 1)', fontWeight:'normal', fontSize:16, marginLeft:20, marginBottom:10
    },
    detailInquireTitle2: {
      marginTop:10, color:'rgba(39,59,53, 1)', fontWeight:'normal', fontSize:16, marginLeft:20, marginBottom:10
    },
    detailInquireInputWrap: {
      marginLeft:10, marginRight:10, padding:10, height:280, borderRadius:5, borderWidth:1, borderColor:'#CCC', backgroundColor:'#F2F2F2'
    },
    detailInquireInput: {
      height: 260, borderWidth: 0, fontSize:14, paddingTop:0, paddingBottom:0, textAlignVertical:'top'
    },
    inquireBottomBtnText: {
      color:'#FFFFFF', fontWeight:'bold', fontSize:18
    },

    // Page7

    favorItem: {
      borderWidth:1, borderColor:'#F6F6F6', marginLeft:10, marginRight:10, height:120, backgroundColor:'#FFFFFF', borderRadius:10, elevation:0, marginBottom:20
    },
    favorImgWrap: {
      position:'absolute', top:15, left:15, width:90, height:90, borderRadius:20, backgroundColor:'#FFF'
    },
    favorImg: {
      width:90, height:90, borderRadius:20
    },
    favorStatus: {
      position:'absolute', bottom:0, right:0
    },
    favorInfoWrap: {
      marginLeft:120, top:25, paddingRight:20
    },
    favorInfoTitle: {
      color:'#333333', fontWeight:'bold'
    },
    favorBtn1: {
      marginTop:10,flexDirection:'row'
    },
    favorBtnText: {
      color:'#4F94F1'
    }



























  });

  export default styles;