import React, {useEffect, useRef, useState} from 'react';
import Message from "./Message";
import Cookies from 'js-cookie';
import socketIOClient from "socket.io-client";
import {isEmpty} from "../helpers/isEmpty";
import getCurrentTradesBetweenTwoUsers from "../api/getCurrentTradesBetweenTwoUsers";

export default function (props) {
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const messagesContainerRef = useRef(null);
    const [socket, setSocket] = useState(socketIOClient());

    useEffect(() => {
        setAllMessages(props?.room?.messages);
        console.log("room:", props?.room)
        const user_id = Cookies.get('user_id');
        const jwt = Cookies.get('jwt');
        const _socket = socketIOClient("https://socket.pickeat.fr/", {
            reconnectionAttempts: 2,
            upgrade: false,
            transports: ['websocket'],
            query: {
                id: user_id,
                token: jwt,
            }
        });
        setSocket(_socket);
        return (() => {
            _socket.disconnect()
        })
    }, [props.room]);

    useEffect(() => {
        if (!socket)
            return;
        socket.off("message");
        socket.on("message", (message) => {
            console.log("New message: ", message);
            console.log("My ID :", Cookies.get('user_id'));
            console.log("His ID: ", props?.room?.contactId);
            //La conditon marche pas quand c'est toi qui envoie le message
            if ((message.from._id === Cookies.get('user_id') || message.to._id === Cookies.get('user_id'))
                && (message.from._id === props?.room?.contactId || message.to._id === props?.room?.contactId)) {
                setAllMessages([...allMessages, message]);
            }
        })
    }, [socket])

    const sendMessage = (e) => {
        e.preventDefault();
        if (message !== "") {
            const user_id = Cookies.get('user_id');
            const to = props?.room?.contactId;
            socket.emit("sendMessage", {to, from: user_id, message})
            setAllMessages([...allMessages, {
                from: {_id: user_id},
                message,
                to: {_id: props?.room?.contactId}
            }])
            setMessage("");
        }
    }

    const buildMessageList = () => {
        if (isEmpty(props.room)) {
            return <div className="w-full text-center mt-6 text-gray-500">No room selected</div>
        }
        if (!allMessages || allMessages?.length === 0) {
            return <div className="w-full text-center mt-6 text-gray-500">No message</div>
        }
        return <>
            {allMessages?.map((message, index) => {
                return <Message key={index} sent={message.from._id === Cookies.get("user_id")}
                                name={message?.from?.name || ""}
                                text={message.message}/>
            })}
        </>
    };

    return (
        <div className="flex flex-col w-full">
            {/*<div className="flex flex-row justify-center items-center border-b border-solid border-blueGray-200 p-2">*/}
            {/*    <div className="flex">Room: <div className="ml-2 font-bold">{props.roomId}</div></div>*/}
            {/*</div>*/}
            <div className="flex flex-col pt-8 overflow-y-scroll overflow-x-hidden" style={{height: '85vh'}}>
                {buildMessageList()}
                <div ref={messagesContainerRef}/>
            </div>
            {!isEmpty(props.room) &&
            <form noValidate onSubmit={(e) => {
                sendMessage(e)
            }}>
                <div className="absolute inset-x-0 bottom-0 flex flex-row m-2">
                    <input type="text" name="message" id="message" placeholder="Type your message"
                           className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                           onChange={(event => setMessage(event.target.value))} value={message}/>
                    <button onClick={(e) => {
                        sendMessage(e)
                    }} type="button"
                            className="inline-flex items-center px-3 py-1.5 ml-4 border border-transparent shadow-sm text-sm leading-4 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Send
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform rotate-90"
                             viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                        </svg>
                    </button>
                </div>
            </form>
            }
        </div>
    )
}