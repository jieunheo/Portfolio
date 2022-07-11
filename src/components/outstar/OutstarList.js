import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../../fbace';

import Outstar from "./OutstarItem";

const DEMO_LIST = [
  {
    id: 1,
    userId: 'outstar',
    profile: 'https://wonderfulmind.co.kr/wp-content/uploads/2017/03/%EC%86%90%EC%97%90-%EA%B3%A0%EC%96%91%EC%9D%B4-600x409-e1535510249284.jpeg',
    text: '귀여운 우리 고양이!',
    photo: 'https://wonderfulmind.co.kr/wp-content/uploads/2017/03/%EC%86%90%EC%97%90-%EA%B3%A0%EC%96%91%EC%9D%B4-600x409-e1535510249284.jpeg' ,
    date: '2022-07-10 18:12'
  },
  {
    id: 2,
    userId: 'inout',
    profile: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/TQL3VWKLRHHBL4GJI4TDIQB3PE.jpg',
    text: '심심하다',
    photo: '',
    date: '2022-07-10 20:21'
  },
  {
    id: 3,
    userId: 'moon',
    profile: 'https://www.sciencetimes.co.kr/wp-content/uploads/2017/01/333524.jpg',
    text: '점심 먹을 시간!',
    photo: '',
    date: '2022-07-11 12:04'
  },
  {
    id: 4,
    userId: 'outstar',
    profile: 'https://wonderfulmind.co.kr/wp-content/uploads/2017/03/%EC%86%90%EC%97%90-%EA%B3%A0%EC%96%91%EC%9D%B4-600x409-e1535510249284.jpeg',
    text: '귀여운 우리 고양이 또 보거라',
    photo: 'https://src.hidoc.co.kr/image/lib/2022/5/4/1651651323632_0.jpg',
    date: '2022-07-11 13:21'
  }
]

const OutstarList = () => {
  const [outstars, setOutstars] = useState([]);

  useEffect(() => {
    readOutstars();
  }, []);

  const readOutstars = async() => {
    const stars = [];
    const q = query(collection(db, "outstars"), orderBy("date", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const star = {
        id: doc.id,
        userId: doc.data().userId,
        profile: doc.data().profile,
        fileName: doc.data().fileName,
        text: doc.data().text,
        photo: doc.data().photo,
        date: doc.data().date
      }
      stars.push(star);
    });
    setOutstars(stars);
  }

  return (
    <div className='star-list'>
      {outstars
        ? outstars.map(star => (
          <Outstar key={star.id} star={star} />
        )) : (
          <p>없어요</p>
        )}
    </div>
  )
}

export default OutstarList;