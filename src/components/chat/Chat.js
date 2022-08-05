import { useRef, useState } from "react";

import { db } from "../../fbace";
import FriendList from "../friend/FriendList";
import { useFirestoreQuery } from "../hooks/use-firestore-query";
import SliceSection from "../UI/SliceSection";
import ChatSection from "./ChatSection";


const Chat = ({ userId }) => {
  const [formId, setFormId] = useState(null);
  const [chat, setChat] = useState(false);

  return (
    <div className='chat-wrap'>
      <SliceSection left={<FriendList setFormId={setFormId} chat={chat} setChat={setChat} />} right={<ChatSection chat={chat} setChat={setChat} formId={formId} />} />
    </div>
  )
}

export default Chat;