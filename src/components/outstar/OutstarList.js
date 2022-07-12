import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../../fbace';

import Outstar from "./OutstarItem";

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
          <Outstar key={star.id} star={star} />
        )) : (
          <p>없어요</p>
        )}
    </div>
  )
}

export default OutstarList;