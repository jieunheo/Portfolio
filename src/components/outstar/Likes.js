import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, getUser } from "../../fbace";
import OutstarItem from "./OutstarItem";


const DEMO_DATA = [
  {
    userId: 'd8g1Lhj4atUgG2j01wFMHa63PJ63',
    outstarId: '0B30OV15kxo0lXcps5EB',
    date: 1659663252824
  },
  {
    userId: 'd8g1Lhj4atUgG2j01wFMHa63PJ63',
    outstarId: 'EkAGtvwz5HBcjQNymzjn',
    date: 1659663252824
  },
  {
    userId: 'd8g1Lhj4atUgG2j01wFMHa63PJ63',
    outstarId: 'kLolrDdbOVV2C9tcVKWh',
    date: 1659663252824
  },
];

const Likes = ({ userId }) => {
  const my = getUser();
  const [outstars, setOutstars] = useState([]);

  useEffect(() => {
    getLikes();
  }, []);

  const getLikes = async () => {
    const likesStars = [];

    const likesQuery = query(collection(db, "likes"), orderBy("date", "desc"), where('userId', '==', my.uid));
    const querySnapshotLike = await getDocs(likesQuery);
    querySnapshotLike.forEach((doc) => {
      const star = {
        userId: doc.data().userId,
        outstarId: doc.data().outstarId,
        date: doc.data().date
      }
      likesStars.push(star);
    });

    console.log(likesStars);
    const stars = [];
    const q = query(collection(db, "outstars"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    likesStars.forEach((like) => {
      querySnapshot.forEach((doc) => {
        if(like.outstarId === doc.id) {
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
        }
      });
    });

    setOutstars(stars);
  }

  return (
    <div className="likes">
      <h1>{my.displayName}'s Likes</h1>
      <div className='star-list'>
        {outstars
          ? outstars.map(star => (
            <OutstarItem key={star.id} star={star} isLike={true} />
          )) : (
            <p>없어요</p>
          )}
      </div>
    </div>
  )
}

export default Likes;