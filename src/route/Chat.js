import React, {useEffect, useState} from 'react';
import ChatList from "../components/ChatList";
import MessageSection from "../components/MessageSection";

export default function Chat(props) {
    const [roomId, setRoomId] = useState("general");

    useEffect(() => {
    }, []);

    return (
        <div className="h-screen pt-20 flex bg-gray-50 overflow-hidden">
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
                <main className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex xl:overflow-hidden">
                        <section aria-labelledby="primary-heading" className="min-w-0 max-w-lg h-full flex flex-col overflow-hidden flex-1 lg:order-first">
                            <h1 id="primary-heading" className="sr-only text-black ">Account</h1>
                            <ChatList setRoomId={setRoomId}/>
                        </section>

                        <aside className="hidden lg:block lg:flex-shrink-0 flex-1">
                            <div className="h-full relative flex flex-col border-l-2 border-solid border-black border-r border-gray-200 bg-white">
                                <MessageSection roomId={roomId}/>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </div>
    );
}