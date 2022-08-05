import { useEffect, useRef, useState } from "react";
import { db } from "../../fbace";
import { useFirestoreQuery } from "../hooks/use-firestore-query";


const ChatSection = ({ chat, setChat, userId, formId }) => {
  // firestore 에서 해당 채널 id의 컬렉션 가져옴. 없으면 새로 생성됨. (여기서 채널은 채팅방을 의미)
  const messagesRef = db.collection(`messages-${userId}`);

  // 0. 에서 작성한 useFirestoreQuery 로 도큐먼트 가져옴
  const messages = useFirestoreQuery(
    messagesRef.orderBy("createdAt", "desc").limit(1000)
  );

  // 채팅 메세지 생성시 useState로 새로운 메세지 저장
  const [newMessage, setNewMessage] = useState("");

  // input 필드 포커싱과 하단 스크롤을 위한 useRef
  const inputRef = useRef();
  const bottomListRef = useRef();

  // 채팅 작성했을 때 onChanghandler, onSubmitHandler
  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // 입력한 채팅 공백 제거
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        text: trimmedMessage,
        createdAt: db.FieldValue.serverTimestamp(),
        formId: formId,
        displayName: '안녕',
        photoURL: '',
        isRead: false,
      });

      // Clear input field
      setNewMessage("");
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  // 그 외, useRef 활용한 모션들
  useEffect(() => {
    if (inputRef.current) {
      // 인풋 포커싱
       inputRef.current.focus();
    }
  }, [inputRef]);  

  // 첫 화면 하단 스크롤
  useEffect(() => {
    if (bottomListRef.current) {
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // messagesRef 업데이트가 될 때 마다 읽음/안읽음 표시 업데이트를 할 수도 있습니다.
    
  }, [messagesRef]);


  return (
    <div className='chat-section'>
      {chat
        ? (
          <>
            <div className='chat-head'>
              <button onClick={() => setChat(false)}>뒤로</button>
              {formId}
            </div>
            <div>
              <ul className='chat-message-list'>
                <li>
                  <p>채팅 내용1채팅 내용1채팅 내용1</p>
                  <small>2022.7.11</small>
                </li>
                <li>
                  <p>채팅 내용2</p>
                  <small>2022.7.11</small>
                </li>
                <li className='my'>
                  <p>채팅 내용3</p>
                  <small>2022.7.11</small>
                </li>
                <li>
                  <p>채팅 내용4</p>
                  <small>2022.7.11</small>
                </li>
                <li className='my'>
                  <p>채팅 내용5</p>
                  <small>2022.7.11</small>
                </li>
                <li>
                  <p>채팅 내용6</p>
                  <small>2022.7.11</small>
                </li><li>
                  <p>채팅 내용1</p>
                  <small>2022.7.11</small>
                </li>
                <li>
                  <p>채팅 내용2</p>
                  <small>2022.7.11</small>
                </li>
                <li className='my'>
                  <p>채팅 내용3</p>
                  <small>2022.7.11</small>
                </li>
                <li>
                  <p>채팅 내용4</p>
                  <small>2022.7.11</small>
                </li>
                <li className='my'>
                  <p>채팅 내용5</p>
                  <small>2022.7.11</small>
                </li>
                <li>
                  <p>채팅 내용6</p>
                  <small>2022.7.11</small>
                </li>
                {messages
                  ?.sort((first, second) =>
                    first?.createdAt?.seconds <= second?.createdAt?.seconds
                      ? -1
                      : 1
                  )
                  ?.map((message) => (
                    <li key={message.id} className={`${
                      message.userId === userId && "my"
                    }`}>
                      {/* 추후 Message 컴포넌트 생성해서 채팅 내용 표시 */}
                      <p>{message.text}</p>
                      <small>2022.7.11</small>
                    </li>
                  ))
                }
              </ul>
              <div ref={bottomListRef} />
            </div>
            <div>
              <form onSubmit={handleOnSubmit}>
                <input
                  ref={inputRef}
                  type='text'
                  value={newMessage}
                  onChange={handleOnChange}
                  placeholder="메세지를 입력하세요"
                />
                <button type="submit" disabled={!(newMessage)}>전송</button>
              </form>
            </div>
          </>
        ) : (
          <div>
            채팅을 시작하세요
            <button className='btn'>채팅 시작</button>
          </div>
        )}
      
    </div>
  )
}

export default ChatSection;