import React, {useEffect, useState} from 'react';

export default function ChatList(props) {
    const [roomList, setRoomList] = useState(props.roomList)

    useEffect(() => {
        setRoomList(props.roomList)
        console.log(roomList)
    }, [props])

    const changeRoom = (e, room) => {
        e.preventDefault();
        props.setRoom(room);
    }

    return (
        <div className="mx-2 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
                {roomList.map((room, index) => (
                    <li key={index} className="px-6 py-5 relative">
                        <div className="group flex justify-between items-center">
                            <a href="#" className="-m-1 p-1 block" onClick={(e) => {changeRoom(e, room)}}>
                                <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true"/>
                                <div className="flex-1 flex items-center min-w-0 relative">
                                    <span className="flex-shrink-0 inline-block relative">
                                        <img className="h-10 w-10 rounded-full" src={`https://minio.pickeat.fr/minio/download/users/${room.contactImage}?token=`} alt=""/>
                                    </span>
                                    <div className="ml-4 truncate">
                                        <p className="text-sm font-medium text-gray-900 truncate">{room.contactName || room.contactId}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}