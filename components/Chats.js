import { useEffect, useState } from 'react';
import './chats.css';
import ChatItem from './ChatItem';
import Conversation from './Conversation';
import { useChats } from './context/ChatsContext';
const Chats = () => {
    const { setModal, chatsUser, setActiveChatId } = useChats();

    const openModal = () => {
        setModal(true);
    };

    const hendleActive = (phone)=>{
        setActiveChatId(phone)
    }

    return (
        <>
            <div className="container mx-auto app">
                <div className="flex flex-wrap -mx-2 app-one">
                    <div className="sm:w-4/12 px-2 h-full m-0 p-0">
                        <div className="side-one">
                            <div className="flex flex-wrap justify-between items-center heading">
                                <div className="w-1/4 px-2 cursor-pointer p-0">
                                    <div className="heading-avatar-icon">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                            className=""
                                        />
                                    </div>
                                </div>
                                <div onClick={openModal} className="flex text-emerald-500">
                                    <svg
                                        viewBox="0 0 24 24"
                                        height={24}
                                        width={24}
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                        <title>{"new-chat-outline"}</title>
                                        <path
                                            d="M9.53277 12.9911H11.5086V14.9671C11.5086 15.3999 11.7634 15.8175 12.1762 15.9488C12.8608 16.1661 13.4909 15.6613 13.4909 15.009V12.9911H15.4672C15.9005 12.9911 16.3181 12.7358 16.449 12.3226C16.6659 11.6381 16.1606 11.0089 15.5086 11.0089H13.4909V9.03332C13.4909 8.60007 13.2361 8.18252 12.8233 8.05119C12.1391 7.83391 11.5086 8.33872 11.5086 8.991V11.0089H9.49088C8.83941 11.0089 8.33411 11.6381 8.55097 12.3226C8.68144 12.7358 9.09947 12.9911 9.53277 12.9911Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0.944298 5.52617L2.99998 8.84848V17.3333C2.99998 18.8061 4.19389 20 5.66665 20H19.3333C20.8061 20 22 18.8061 22 17.3333V6.66667C22 5.19391 20.8061 4 19.3333 4H1.79468C1.01126 4 0.532088 4.85997 0.944298 5.52617ZM4.99998 8.27977V17.3333C4.99998 17.7015 5.29845 18 5.66665 18H19.3333C19.7015 18 20 17.7015 20 17.3333V6.66667C20 6.29848 19.7015 6 19.3333 6H3.58937L4.99998 8.27977Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2 searchBox">
                                <div className="sm:w-full px-2 searchBox-inner">
                                    <div className="form-group has-feedback">
                                        <input
                                            id="searchText"
                                            type="text"
                                            className="form-control"
                                            name="searchText"
                                            placeholder="Search"
                                        />
                                        <span className="glyphicon glyphicon-search form-control-feedback" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col -mx-2 sideBar">
                                {
                                    chatsUser.map((chat, index) => (
                                        <ChatItem name={chat.name} phone={chat.phone} time={chat.time} id={chat.id} setActiveId={hendleActive} key={index} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <Conversation />
                </div>
            </div>

        </>
    )
}

export default Chats