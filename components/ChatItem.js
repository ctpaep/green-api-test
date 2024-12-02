import { formatTimestamp } from "./utils/helpers";

const ChatItem = ({ name, time=1, phone, setActiveId }) => {
    function getRandomAvatar(min = 1, max = 6) {
        min = Math.ceil(min);
        max = Math.floor(max);
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        return `https://bootdey.com/img/Content/avatar/avatar${random}.png`;
    }
    return (
        <>
            <div className="flex flex-wrap -mx-2 w-full sideBar-body" onClick={() => setActiveId(phone)}>
                <div className="sm:w-3/12 px-2 col-xs-3 sideBar-avatar">
                    <div className="avatar-icon">
                        <img
                            src={getRandomAvatar(1, 6)}
                        />
                    </div>
                </div>
                <div className="sm:w-9/12 px-2 col-xs-9 sideBar-main">
                    <div className="flex flex-wrap -mx-2">
                        <div className="sm:w-8/12 px-2 col-xs-8 sideBar-name">
                            <span className="name-meta">{name}</span>
                        </div>
                        <div className="sm:w-4/12 px-2 col-xs-4 pull-right sideBar-time">
                            <span className="time-meta pull-right">
                                {formatTimestamp(time)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChatItem