import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { db, getUser } from '../../fbace';

import OutstarItem from "./OutstarItem";

const OutstarList = () => {
  const my = getUser();
  const [outstars, setOutstars] = useState([]);
  const [likes, setLikes] = useState([]);

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
        userNum: doc.data().userNum,
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
          <OutstarItem key={star.id} star={star} />
        )) : (
          <p>없어요</p>
        )}
    </div>
  )
}

export default OutstarList;