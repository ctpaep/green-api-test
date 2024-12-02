import { createContext, useContext, useEffect, useState } from 'react';
import Modal from '../Modal';
import { deleteNotification, getNotification } from '../utils/requests';
import Notification from '../Notification';
import { findChatByPhone } from '../utils/helpers';

const ChatsContext = createContext();



export const ChatsProvider = ({ children }) => {
    const [chatsData, setChatsData] = useState([]);
    // активный чат
    const [activeChatId, setActiveChatId] = useState()
    const [messages, setMessages] = useState([])

    const [modal, setModal] = useState(false)
    const [isShowNotification, setIsShowNotification] = useState(false)
    const [notification, setNotification] = useState({
        text:'', 
        createChat: false, 
        chengeChat: false
    })

    const [chatsUser, setChatsUser] = useState([]);

    useEffect(() => {
        const storedChats = JSON.parse(localStorage.getItem('chats'));
        let parsedChatsUsers
        if (Array.isArray(storedChats) && storedChats.every(item => typeof item === 'object' && item !== null)) {
            parsedChatsUsers = storedChats
        } else {
            parsedChatsUsers = [{ name: "John Dia", phone: "+91 9876543210", time: "1732552537297" }];
        }
        setChatsUser(parsedChatsUsers)
    }, [modal])

    useEffect(() => {
        if (!activeChatId) {
            return
        }
        let intervalId = setInterval(() => {
            getNotification()
                .then(notification => {
                    const {
                        receiptId
                    } = notification || {}
                    const timestamp = notification?.body?.timestamp
                    const idMessage = notification?.body?.idMessage

                    if (!receiptId) return;
                    
                    const chatId = notification?.body?.senderData?.chatId;
                    const senderName = notification?.body?.senderData?.senderName;
                    const senderContactName = notification?.body?.senderData?.senderContactName;
                    const messageData = notification?.body?.messageData
                    let text = '';
                    if (messageData?.typeMessage === 'textMessage') {
                        text = messageData.textMessageData.textMessage
                    } else if (messageData?.typeMessage === 'extendedTextMessage') {
                        text = messageData.extendedTextMessageData.text;
                    }

                    if (chatId === activeChatId && text) {
                        setMessages(prevMessages => {
                            const existedMessage = prevMessages.find(msg => msg.idMessage === idMessage)
                            if (existedMessage) return prevMessages
                            const resMessages = [...prevMessages, {
                                "type": activeChatId === chatId ? "incoming" : "outgoing",
                                "idMessage": idMessage,
                                "timestamp": timestamp,
                                "typeMessage": messageData?.typeMessage,
                                "chatId": activeChatId,
                                "textMessage": text,
                                "senderId": chatId,
                                "senderName": senderName,
                                "senderContactName": senderContactName, // не точно
                            }]
                            const result = resMessages.sort((a, b) => a.timestamp - b.timestamp)
                            return result;
                        })
                        deleteNotification(receiptId)
                    // } 
                    // else if (chatId !== activeChatId && text) {
                    //     if (findChatByPhone(chatId)) {
                    //         setIsShowNotification(true)
                    //         setNotification({...notification, text: `New message from ${senderName}, go to chat with it?`})
                    //         if (notification.chengeChat) {
                    //             setActiveChatId(chatId)
                    //         }
                    //         //Todo реализовать кнопку чтоб перейти в чат
                    //     } else {
                    //         setIsShowNotification(true)
                    //         const data = { time: Date.now(), name: senderName, phone:chatId };
                    //         setNotification({...notification, text: `User with number ${chatId.replace('@c.us', '')} sent a message, create chat?`})
                    //         if (notification.createChat) {
                    //             let storedData = localStorage.getItem('chats');
                    //             let parsedData = [];
                        
                    //             if (storedData) {
                    //                 parsedData = JSON.parse(storedData);
                    //             }
                        
                    //             parsedData.push(data);
                    //             localStorage.setItem('chats', JSON.stringify(parsedData));
                    //             console.log('Данные успешно сохранены:', parsedData);
                    //         }
                    //         //Todo реализовать кнопку чтоб создать чат
                    //     }
                      
                    }
                     else {
                        deleteNotification(receiptId)
                    }

                })
        }, 15000)
        return () => clearInterval(intervalId)
    }, [
        activeChatId
    ])


    return (
        <ChatsContext.Provider value={{ chatsData, setModal, chatsUser, activeChatId, setActiveChatId, messages, setMessages, isShowNotification, setIsShowNotification }}>
            {children}
            {modal && <Modal onClose={() => { setModal(false) }} />}
            {isShowNotification ? <Notification text={notification.text} setNotification={setNotification} /> : null}
        </ChatsContext.Provider>
    );
};

export const useChats = () => useContext(ChatsContext);