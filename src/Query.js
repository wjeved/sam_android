import { gql } from "@apollo/client";

export const GETMEMBER_MT = gql`
  mutation SignIn($email: String!, $password: String!, $key:String!) {
    signIn(email: $email, password: $password, key:$key) {
        id
        email
        name
        cash
        level
        jwt
    }
  }
`;

export const TRADE2 = gql`
  mutation Seltrade($idx: Int!, $email: String!) {
    seltrade(idx: $idx, email: $email) {
        idx
        user
        title
        title2
        content
        addr1
        addr2
        wlike
        cmt
        view
        price
        wstatus
        img1
        img2
        img3
        img4
        img5
        date
        nick
        family
        img
        status
        address
        rdate
        cate1
        cate2
        cate3
        qty
        oper
        country
        veh
        year
        speed
        voltage
        rating
        output
        cooling
        dimension
        weight
        temp
        ulike
        op1
        op2
        op3
        op4
        op5
        op6
        op7
        op8
        op9
        op10
        op11
        op12
        op13
        op14
        op15
        op16
        op17
        op18
        op19
        op20
        eop1
        eop2
        eop3
        eop4
        eop5
        eop6
        eop7
        eop8
        eop9
        eop10
        eop11
        eop12
        eop13
        eop14
        eop15
        eop16
        eop17
        eop18
        eop19
        eop20
        opt1
        opt2
        opt3
        opt4
        opt5
        opt6
        opt7
        opt8
        opt9
        opt10
        opt11
        opt12
        opt13
        opt14
        opt15
        opt16
        opt17
        opt18
        opt19
        opt20
        opte1
        opte2
        opte3
        opte4
        opte5
        opte6
        opte7
        opte8
        opte9
        opte10
        opte11
        opte12
        opte13
        opte14
        opte15
        opte16
        opte17
        opte18
        opte19
        opte20
    }
  }
`;


export const TRADE = gql`
  mutation Trade($page: Int!, $stx: String!, $email: String!, $cate1: String!, $cate2: String!, $cate3: String!) {
    trade(page: $page, stx: $stx, email: $email, cate1: $cate1, cate2: $cate2, cate3: $cate3) {
        idx
        user
        title
        title2
        content
        addr1
        addr2
        wlike
        cmt
        view
        price
        wstatus
        img1
        img2
        img3
        img4
        img5
        date
        nick
        family
        img
        status
        address
        rdate
        ulike
        cate1
        cate2
        cate3
        qty
        oper
        country
        veh
        year
        speed
        voltage
        rating
        output
        cooling
        dimension
        weight
        temp
        op1
        op2
        op3
        op4
        op5
        op6
        op7
        op8
        op9
        op10
        op11
        op12
        op13
        op14
        op15
        op16
        op17
        op18
        op19
        op20
        eop1
        eop2
        eop3
        eop4
        eop5
        eop6
        eop7
        eop8
        eop9
        eop10
        eop11
        eop12
        eop13
        eop14
        eop15
        eop16
        eop17
        eop18
        eop19
        eop20
    }
  }
`;


export const USER = gql`
  mutation GetUserInfo($did: String!) {
    getUserInfo(did: $did) {
        did
        name
        company
        tel     
    }
  }
`;

export const SETUSER = gql`
  mutation SetUserInfo($did: String!, $name: String!, $company: String!, $tel: String!) {
    setUserInfo(did: $did, name: $name, company: $company, tel: $tel) {
        did
        name
        company
        tel     
    }
  }
`;

export const SETINQUIRE = gql`
  mutation SetInquire($did: String!, $idx: Int!, $content: String!) {
    setInquire(did: $did, idx: $idx, content: $content) {
        rst    
    }
  }
`;

export const GETINQUIRE = gql`
  mutation GetInquire($did: String!, $date: String!) {
    getInquire(did: $did, date: $date) {
        idx
        idx2
        name
        company
        tel
        title
        title2
        content
        img1
        status
        cate1
        cate2
        cate3
        qty
        oper
        country
        veh
        year
        speed
        voltage
        rating
        output
        cooling
        dimension
        weight
        temp   
        cont
        reply 
    }
  }
`;

export const GETINQUIRE2 = gql`
  mutation GetInquire2($idx: Int!) {
    getInquire2(idx: $idx) {
        idx
        idx2
        name
        company
        tel
        title
        title2
        content
        img1
        status
        cate1
        cate2
        cate3
        qty
        oper
        country
        veh
        year
        speed
        voltage
        rating
        output
        cooling
        dimension
        weight
        temp   
        cont
        reply 
    }
  }
`;


export const GETINQUIREDATE = gql`
  mutation GetInquireDate($did: String!) {
    getInquireDate(did: $did) {
        date
    }
  }
`;


export const PLUS = gql`
  mutation GetBanner($type: String!) {
    getBanner(type: $type) {
        idx
        idx2
        type
        title
        title2
        content
        img1
        date
        status
        cate1
        cate2
        cate3
        qty
        oper
        country
        veh
        year
        speed
        voltage
        rating
        output
        cooling
        dimension
        weight
        temp
    }
  }
`;

export const SUB = gql`
  mutation GetSub($cate1: String!, $cate2: String!) {
    getSub(cate1: $cate1, cate2: $cate2) {
        name
    }
  }
`;

export const FILTER = gql`
  mutation GetFilter($type: String!) {
    getFilter(type: $type) {
        name
    }
  }
`;

export const FAVOR = gql`
  mutation SetFavor($did: String!, $idx: Int!, $type: String!) {
    setFavor(did: $did, idx: $idx, type: $type) {
      idx
      idx2
      title
      title2
      img1
      cate1
      cate2
      cate3
    }
  }
`;

export const FAVOR2 = gql`
  mutation GetFavor($did: String!) {
    getFavor(did: $did) {
        idx
        idx2
        title
        title2
        img1
        cate1
        cate2
        cate3
    }
  }
`;
