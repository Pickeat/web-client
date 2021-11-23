import React, { useEffect, useState } from 'react';
import ChatList from '../components/ChatList';
import MessageSection from '../components/MessageSection';
import getAllMessagesInBdd from '../api/getAllMessagesInBdd';
import getCurrentTradesBetweenTwoUsers from '../api/getCurrentTradesBetweenTwoUsers';
import Cookies from 'js-cookie';
import ReservationSection from '../components/ReservationSection';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

export default function Chat(props) {
  const [currentRoom, setCurrentRoom] = useState({});
  const [roomList, setRoomList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProductList, setCurrentProductList] = useState([]);
  const [location, setLocation] = useState({});

  async function fetchMessages() {
    getAllMessagesInBdd().then((res) => {
      setRoomList(res);
      if(currentRoom.contactId) {
        const updatedRoom = res.find(({contactId}) => (contactId === currentRoom.contactId))
        setCurrentRoom(updatedRoom)
      }
      setIsLoading(false);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        setLocation({ lng: location?.coords?.longitude, lat: location?.coords?.latitude });
      });
    } else {
      toast.error("La géolocalisation n'est pas prise en charge par votre navigateur.");
      setLocation(-1);
    }
    fetchMessages();
  }, []);

  useEffect(() => {
    const user_id = Cookies.get('user_id');
    if (user_id && currentRoom?.contactId)
      getCurrentTradesBetweenTwoUsers(user_id, currentRoom?.contactId).then((productList) => {
        setCurrentProductList(productList);
      });
  }, [currentRoom]);


    return (
        <div className="h-full flex bg-gray-50 overflow-hidden">
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
                <main className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex xl:overflow-hidden">
                        <section aria-labelledby="primary-heading"
                                 className="min-w-0 max-w-lg h-full flex flex-col overflow-hidden flex-1 lg:order-first">
                            <h1 id="primary-heading" className="sr-only text-black ">Account</h1>
                            {isLoading &&
                            <div className="textMedium">Loading...</div>
                            }
                            <ChatList setRoom={setCurrentRoom} roomList={roomList}/>
                        </section>

            <aside className="hidden lg:block lg:flex-shrink-0 flex-1">
              <div className="h-full relative flex flex-col border-l-2 border-solid border-black border-r border-gray-200 bg-white">
                <MessageSection room={currentRoom} fetchMessages={fetchMessages} />
              </div>
            </aside>
            <aside className="hidden lg:block lg:flex-shrink-0" style={{ width: '400px' }}>
              <ul
                role="list"
                className=" space-y-3 h-screen overflow-y-scroll relative p-6 box-border border-2 border-solid border-black border-r border-gray-200 bg-white"
              >
                {currentProductList.map((product, index) => {
                  console.log('reserve section: ', product.title);
                  return (
                    <li className="h-128 flex flex-col bg-white shadow overflow-hidden rounded-md">
                      <ProductCard data={product} location={location} />
                      <div className="pt-4">
                        <ReservationSection
                          id={product?.title + 'reservation-section'}
                          product={product}
                          ownId={Cookies.get('user_id')}
                        />
                      </div>
                    </li>
                  );
                })}
                {/*<ReservationSection/>*/}
              </ul>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
