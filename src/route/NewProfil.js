import React, {useEffect, useRef, useState} from 'react';
import getUserMeApi from "../api/getUserMeApi";
import {UploadIcon, CameraIcon, PencilIcon} from '@heroicons/react/solid'
import updateUserPictureApi from "../api/updateUserPicture";
import Rating from "@material-ui/lab/Rating";
import setUserPublicInfoApi from "../api/setUserPublicInfoApi";
import updateUserPhoneApi from "../api/updateUserPhone";
import {toast} from "react-toastify";
import DispoModal from "../components/DispoModal";
import getUserProductListApi from "../api/getUserOwnProductListApi";
import getMyReservedAnnounces from "../api/getMyReservedAnnounces";
import ProductCard from "../components/ProductCard";

const defaultPicture = "https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Images.png";

const tabs = [
    {name: 'Mes produits', key: 'my_products'},
    {name: 'Mes réservations', key: 'my_reservations'},
]

const statusBtn = [
    {name: 'Disponible', key: 'available'},
    {name: 'En attente de réservation', key: 'waiting-for-reservation'},
    {name: 'Reservé', key: 'reserved'},
    {name: 'Donné', key: 'given'},
    {name: 'Noté', key: 'noted'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Profil(props) {
    const [location, setLocation] = useState({});
    const [originalInfo, setOriginalInfo] = useState("");
    const [userName, setUserName] = useState("");
    const [userProfilePicture, setUserProfilePicture] = useState("");
    const [userNote, setUserNote] = useState(0);
    const [userAge, setUserAge] = useState(0);
    const [userPhone, setUserPhone] = useState("");
    const [userGender, setUserGender] = useState("");
    const [userOwnProductList, setUserOwnProductList] = useState([]);
    const [userReservedProductList, setReservedUserProductList] = useState([]);
    const [showDispoModal, setShowDispoModal] = useState(false);
    const [userAvailability, setUserAvailability] = useState([]);
    const photoUpEl = useRef(null);
    const [selectedTab, setSelectedTab] = useState("my_products")
    const [selectedStatus, setSelectedStatus] = useState(["available", "waiting-for-reservation", "reserved"]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                console.log(location);
                setLocation({lng: location?.coords?.longitude, lat: location?.coords?.latitude});
            });
        } else {
            toast.error('Geolocation is not supported by this browser.');
            setLocation(-1);
        }
        getUserPublicInfoCall();
        getUserOwnProductListCall(selectedStatus);
        getUserReservedProductListCall(selectedStatus);
    }, []);

    useEffect(() => {
        getUserOwnProductListCall(selectedStatus);
        getUserReservedProductListCall(selectedStatus);
    }, [selectedStatus]);

    const getUserOwnProductListCall = (status) => {
        getUserProductListApi(status).then((response) => {
            setUserOwnProductList(response);
        });
    };
    const getUserReservedProductListCall = (status) => {
        getMyReservedAnnounces(status).then((response) => {
            setReservedUserProductList(response);
        });
    };

    const updateAllInfos = () => {
        if (originalInfo?.phone_number !== userPhone) {
            updateUserPhoneApi(userPhone).then((response) => {
                if (!response) {
                    toast.error("Votre numéro de téléphone n'a pas pu être modifié");
                    setOriginalInfo(Object.assign(originalInfo, {phone_number: userPhone}));
                }
            })
        }
        if (userName !== originalInfo.name || userAge !== originalInfo.age || userGender !== originalInfo.gender)
            setUserPublicInfoApi(userName, "", userAvailability, userAge, userGender).then((response) => {
                console.log(response);
                if (response) {
                    toast.success("Votre "
                        + (userName !== originalInfo.name ? "nom " : "")
                        + (userAge !== originalInfo.age ? "age " : "")
                        + (userGender !== originalInfo.gender ? "genre " : "")
                        + "a/ont bien été modifié/s");
                    setOriginalInfo(Object.assign({}, originalInfo, {
                        name: userName,
                        age: userAge,
                        gender: userGender
                    }));
                }
            });
    }

    const getUserPublicInfoCall = () => {
        getUserMeApi().then((response) => {
            setOriginalInfo(response);
            setUserName(response?.name);
            setUserNote(response?.note);
            setUserProfilePicture(response?.image);
            setUserAvailability(response?.availability);
            setUserAge(response?.age);
            setUserPhone(response?.phone_number);
            setUserGender(response?.gender);
        });
    };

    const onChangePicture = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files;
            updateUserPictureApi(img).then((response) => {
                getUserPublicInfoCall();
            });
        }
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center lg:justify-evenly lg:items-start pt-20">
                <div className="flex-initial bg-white overflow-hidden shadow rounded-lg relative"
                     style={{width: '30rem'}}>
                    <div className="flex-shrink-0 p-5 right-0 absolute">
                        <button
                            type="button"
                            className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
                                        text-white bg-green-600 shadow-md transition-all duration-200 ease-in-out bg-green-600 hover:bg-green-800"
                            onClick={() => setShowDispoModal(true)}
                        >
                            <PencilIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                            <span>Disponibilités</span>
                        </button>
                    </div>
                    <div className="px-4 pt-24 flex flex-col items-center w-full">
                        <img src={(userProfilePicture ?
                            `https://minio.pickeat.fr/minio/download/users/${userProfilePicture}?token=` : defaultPicture)}
                             alt={"user-profil-picture"}
                             className="inline-block shadow-md object-cover h-32 w-32 w-min-none h-min-none rounded-full"
                        />
                        <div className="flex-shrink-0 py-5">
                            <button
                                type="button"
                                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
                                        text-white bg-green-600 shadow-md transition-all duration-200 ease-in-out bg-green-600 hover:bg-green-800"
                                onClick={() => {
                                    photoUpEl?.current?.click()
                                }}
                            >
                                <CameraIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                <span>Changer de photo</span>
                            </button>
                        </div>
                        <input className="hidden" ref={photoUpEl} type="file" name="photoUploader"
                               onChange={onChangePicture}/>
                        <Rating name="user-rate" precision={0.1} value={userNote} readOnly/>
                        <div className="isolate w-3/4 py-10 -space-y-px rounded-md">
                            <div
                                className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-green-600 focus-within:border-green-600">
                                <label htmlFor="name" className="block text-xs font-medium text-gray-700">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={userName}
                                    onChange={(event => setUserName(event.target.value))}
                                    className="block border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div
                                className="relative border border-gray-300 rounded-md rounded-t-none rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-green-600 focus-within:border-green-600">
                                <label htmlFor="age" className="block w-full text-xs font-medium text-gray-700">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    id="age"
                                    value={userAge}
                                    onChange={(event => setUserAge(event.target.value))}
                                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                    placeholder="18"
                                />
                            </div>
                            <div
                                className="relative border border-gray-300 rounded-md rounded-t-none rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-green-600 focus-within:border-green-600">
                                <label htmlFor="age" className="block w-full text-xs font-medium text-gray-700">
                                    Telephone
                                </label>
                                <input
                                    type="text"
                                    name="age"
                                    id="age"
                                    value={userPhone}
                                    onChange={(event => setUserPhone(event.target.value))}
                                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                    placeholder="xxxxxxxxxx"
                                />
                            </div>
                            <div
                                className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2">
                                <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">
                                    Genre
                                </label>
                                <select
                                    id="Gender"
                                    name="Gender"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                                    defaultValue={(userGender ? userGender : 'other')}
                                    onChange={(event => setUserGender(event.target.value))}
                                >
                                    <option value={'male'}>Homme</option>
                                    <option value={'female'}>Femme</option>
                                    <option value={'other'}>Autre</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <button
                            type="button"
                            className="relative w-full inline-flex justify-center items-center px-4 py-2 border rounded-t-none border-transparent text-sm font-medium rounded-md
                                        text-white bg-green-600 shadow-md transition-all duration-200 ease-in-out bg-green-600 hover:bg-green-800"
                            onClick={() => {
                                updateAllInfos()
                            }}
                        >
                            <UploadIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                            <span>Sauvegarder</span>
                        </button>
                    </div>
                </div>
                <div
                    style={{width: '60rem'}}>
                    <div>
                        <div className="sm:hidden">
                            <label htmlFor="tabs" className="sr-only">
                                Select a tab
                            </label>
                            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                            <select
                                id="tabs"
                                name="tabs"
                                className="block w-full focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                                defaultValue={tabs.find((tab) => tab.key === selectedTab).name}
                            >
                                {tabs.map((tab) => (
                                    <option key={tab.name}>{tab.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="hidden sm:block">
                            <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                                 aria-label="Tabs">
                                {tabs.map((tab, tabIdx) => (
                                    <div
                                        key={tab.name}
                                        className={classNames(
                                            tab.key === selectedTab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                                            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                                        )}
                                        aria-current={tab.key === selectedTab ? 'page' : undefined}
                                        onClick={() => {
                                            setSelectedTab(tab.key);
                                        }}
                                    >
                                        <span>{tab.name}</span>
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                tab.key === selectedTab ? 'bg-green-500' : 'bg-transparent',
                                                'absolute inset-x-0 bottom-0 h-0.5'
                                            )}
                                        />
                                    </div>
                                ))}
                            </nav>
                        </div>
                        <span className="relative z-0 inline-flex shadow-sm rounded-md w-full">
                            {statusBtn.map((elem) => {
                                return (
                                    <button
                                        type="button"
                                        key={`${elem.key}-filter-btn`}
                                        className={classNames(
                                            selectedStatus.find(status => status === elem.key) ? 'z-10 outline-none ring-1 ring-green-500 border-green-500' : '',
                                            "w-full relative inline-flex items-center justify-center py-2 border border-gray-300 text-sm font-medium text-gray-700 " +
                                            "hover:bg-gray-50"
                                        )}
                                        onClick={() => {
                                            if (selectedStatus.find(status => status === elem.key))
                                                setSelectedStatus(selectedStatus.filter(status => status !== elem.key))
                                            else
                                                setSelectedStatus([...selectedStatus, elem.key]);
                                        }}
                                    >
                                        {elem.name}
                                    </button>
                                );
                            })}
                        </span>
                        <ul role="list"
                            className="pt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {selectedTab === "my_products" &&
                            userOwnProductList.map((product) => {
                                    return (
                                        <li
                                            key={product._id}
                                            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                            <ProductCard location={location} data={product}/>
                                        </li>
                                    )
                                }
                            )
                            } {selectedTab === "my_reservations" &&
                        userReservedProductList.map((product) => {
                                return (
                                    <li
                                        key={product._id}
                                        className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                        <ProductCard location={location} data={product}/>
                                    </li>
                                )
                            }
                        )}
                        </ul>
                    </div>
                </div>
            </div>
            <DispoModal show={showDispoModal} width="50%" title={"Indiquez vos disponibilitées"} onClose={() => {
                setShowDispoModal(false)
            }}/>
        </div>
    );
}
