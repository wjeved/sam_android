export function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    //console.log(timeValue);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금 전';
    if (betweenTime < 60) {
        return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
}

export function dayProc(date)
{
  var week = ['일', '월', '화', '수', '목', '금', '토'];
  var dayOfWeek = week[new Date(date).getDay()];
  return dayOfWeek;
}

function intlFormat(num)
{
     return Math.round(num*10)/10;
}

export function makeFriendly(num)
{
     if(num >= 1000000)
       return intlFormat(num/1000000)+'M';
     if(num >= 1000)
       return intlFormat(num/1000)+'k';
     return intlFormat(num);
}

export function addressSplit(addr)
{
  let addrArr = addr.split(" ");
  let tempAddr = "";
  for (let i=0; i<addrArr.length;i++){
    if (i == 3) {
      break;
    }
    if (tempAddr != "") {
      tempAddr += " " + addrArr[i];
    } else {
      tempAddr = addrArr[i];
    }    
  }
  return tempAddr;
}

export function addressSplit2(addr)
{
  let addrArr = addr.split(" ");
  let tempAddr = "";
  for (let i=0; i<addrArr.length;i++){
    if (i == 3) {
      break;
    }
    if (i == 0) {
      //pass
    } else if (tempAddr != "") {
      tempAddr += " " + addrArr[i];
    } else {
      tempAddr = addrArr[i];
    }    
  }
  return tempAddr;
}

export function addressSplit3(addr)
{
  let addrArr = addr.split(" ");
  let tempAddr = "";
  if (addrArr.length > 1) {
    tempAddr = addrArr[2];
  }
  return tempAddr;
}

export function comma(num){
  var len, point, str; 
     
  num = num + ""; 
  point = num.length % 3 ;
  len = num.length; 
 
  str = num.substring(0, point); 
  while (point < len) { 
      if (str != "") str += ","; 
      str += num.substring(point, point + 3); 
      point += 3; 
  } 
   
  return str;

}

export  function cutByLen(str, maxByte) {

  for(b=i=0;c=str.charCodeAt(i);) {
  
  b+=c>>7?2:1;
  
  if (b > maxByte)
  
  break;
  
  i++;
  
  }
  
  return str.substring(0,i);
  
  }

  export function youtubeId(url) {
    var tag = "";
    if(url)  {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var matchs = url.match(regExp);
        if (matchs) {
            tag = matchs[7];
        }
        return tag;
    }
}


export function checkString(str, type) {
  // 한글, 영어, 숫자, 특수문자 구분 정규식
  let checkNum = /[0-9]/;
  let checkEng = /[a-zA-Z]/;
  let checkSpc = /[~!@#$%^&*()_+|<>?:{}]/;
  let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  // 영어 대문자와 소문자
  let checkEnga = /[a-z]/;
  let checkEngA = /[A-Z]/;

  if (type == 1) {
    if (checkSpc.test(str)) {
      return "fail1";
    }
  } else if(type == 2) {
    if (checkSpc.test(str)) {
      return "fail1";
    }
    if (checkNum.test(str)) {
      return "fail2";
    }
  } else if(type == 3) {
    if (checkKor.test(str)) {
      return "fail3";
    }
    if (checkSpc.test(str)) {
      return "fail1";
    }
  }

  return "ok";
}
