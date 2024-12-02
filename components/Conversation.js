import { useState } from "react";
import { useChats } from "./context/ChatsContext";
import { getHistoryMessages, sendMessage } from "./utils/requests";
import Message from "./Message";

const Conversation = () => {
    const { activeChatId, messages, setMessages } = useChats();
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        sendMessage(activeChatId, message).then(data => {
            setMessages([...messages, {
                "type": "outgoing",
                "idMessage": data.id,
                "timestamp": Math.floor(Date.now() / 1000),
                "typeMessage": "textMessage",
                "chatId": activeChatId,
                "textMessage": message,
                "senderId": "70000000012@c.us",
                "senderName": "Николай",
                "senderContactName": "Коля"
            }]);
            setMessage('');
        })
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    if (activeChatId) {
        return (
            <div className="sm:w-8/12 px-2 conversation">
                <div className="flex -mx-2 heading">
                    <div className="sm:w-2/12 px-2 md:w-1/12 px-2 col-xs-3 cursor-pointer p-0">
                        {/* <div className="heading-avatar-icon">
                            <img
                                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                className=""
                            />
                        </div> */}
                    </div>
                    <div className="sm:w-8/12 px-2 col-xs-7 heading-name">
                        {/* <a className="heading-name-meta">John Doe</a> */}
                    </div>
                    <div className="sm:w-1/12 px-2 col-xs-1 heading-dot float-right">
                        <i
                            className="fa fa-ellipsis-v text-[1.5em] float-right"
                            aria-hidden="true"
                        />
                    </div>
                </div>
                <div
                    className="flex flex-col -mx-2 message"
                    id="conversation"
                >
                    <div className="flex -mx-2 message-previous">
                        <div className="sm:w-full px-2 previous">
                            <a onClick={() => {
                                getHistoryMessages().then(data => {
                                    setMessages(data)
                                })
                            }} className="text-emerald-600">
                                Show Previous Message!
                            </a>
                        </div>
                    </div>
                    {messages && messages.map((el, index) => (
                        <Message key={index} {...el} />
                    ))} 

                    {/* <div className="flex -mx-2 message-body">
                        <div className="sm:w-full px-2 message-main-receiver">
                            <div className="receiver flex;">
                                <div className="message-text">
                                    Hi, what are you doing?!
                                </div>
                                <span className="flex justify-end float-right">
                                    Sun
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-2 message-body">
                        <div className="sm:w-full px-2 message-main-sender">
                            <div className="sender flex">
                                <div className="message-text">
                                    I am doing nothing man!
                                </div>
                                <span className="message-time float-right">
                                    Sun
                                </span>
                            </div>
                        </div>
                    </div> */}
                </div>
                <form className="flex -mx-2 reply">
                    <div className="sm:w-1/12 px-2 col-xs-1 reply-emojis">
                        <i className="fa fa-smile-o text-[1.5em]" />
                    </div>
                    <div className="sm:w-9/12 px-2 col-xs-9 reply-main">
                        <textarea
                            className="form-control text-emerald-600"
                            rows={1}
                            id="comment"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="sm:w-1/12 px-2 col-xs-1 reply-send">
                        <button type="submit" onClick={handleSubmit}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z"></path>
                            </svg>
                        </button>
                    </div>
                </form>
                {/* <div className="flex -mx-2 reply">
                    <div className="sm:w-1/12 px-2 col-xs-1 reply-emojis">
                        <i className="fa fa-smile-o text-[1.5em]" />
                    </div>
                    <div className="sm:w-9/12 px-2 col-xs-9 reply-main">
                        <textarea
                            className="form-control text-emerald-600"
                            rows={1}
                            id="comment"
                            defaultValue={""}
                        />
                    </div>
                    <div className="sm:w-1/12 px-2 col-xs-1 reply-send">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z"></path>
                        </svg>
                    </div>
                </div> */}
            </div>
        )
    }
    return (
        <>
        </>
    )

}
export default Conversation