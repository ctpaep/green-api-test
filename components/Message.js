import React from 'react'
import { getTimeFromTimestamp } from './utils/helpers'


const Message = ( props ) => {
    const { type, timestamp, textMessage } = props
    return (
        <>
            <div className="flex -mx-2 message-body"></div>
            <div className={`sm:w-full px-2 ${type === "outgoing" ? 'message-main-receiver' : 'message-main-sender'}`}>
                <div className={`flex ${type === "outgoing" ? 'receiver' : 'sender'}`}>
                    <div className="message-text">
                        {textMessage}
                    </div>
                    <span className="flex justify-end float-right">
                        {getTimeFromTimestamp(timestamp)}
                    </span>

                </div>

            </div>

        </>
        // <>
        //     <div className="flex -mx-2 message-body">
        //         <div className="sm:w-full px-2 message-main-receiver">
        //             <div className="receiver flex;">
        //                 <div className="message-text">
        //                     Hi, what are you doing?!
        //                 </div>
        //                 <span className="flex justify-end float-right">
        //                     Sun
        //                 </span>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="flex -mx-2 message-body">
        //         <div className="sm:w-full px-2 message-main-sender">
        //             <div className="sender flex">
        //                 <div className="message-text">
        //                     I am doing nothing man!
        //                 </div>
        //                 <span className="message-time float-right">
        //                     Sun
        //                 </span>
        //             </div>
        //         </div>
        //     </div>
        // </>
    )
}

export default Message
