import React, {useEffect, useRef, useState} from 'react';
import getUserMeApi from "../api/getUserMeApi";
import {UploadIcon, CameraIcon, PencilIcon} from '@heroicons/react/solid'
import updateUserPictureApi from "../api/updateUserPicture";
import Rating from "@material-ui/lab/Rating";
import setUserPublicInfoApi from "../api/setUserPublicInfoApi";
import updateUserPhoneApi from "../api/updateUserPhone";
import {toast} from "react-toastify";
import DispoModal from "../components/DispoModal";

const defaultPicture = "https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Images.png";

export default function Profil(props) {
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

    useEffect(() => {
        getUserPublicInfoCall();
    }, []);

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
                    setOriginalInfo(Object.assign({}, originalInfo, {name: userName, age: userAge, gender: userGender}));
                }
            });
    }

    const getUserPublicInfoCall = () => {
        getUserMeApi().then((response) => {
            setOriginalInfo(response);
            setUserName(response.name);
            setUserNote(response.note);
            setUserProfilePicture(response.image);
            setUserAvailability(response.availability);
            setUserAge(response.age);
            setUserPhone(response.phone_number);
            setUserGender(response.gender);
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
                <div className="flex-initial bg-white overflow-hidden shadow rounded-lg mt-20 lg:mt-0"
                     style={{width: '60rem'}}>
                    <div className="px-4 py-5 sm:p-6">

                    </div>
                </div>
            </div>
            <DispoModal show={showDispoModal} width="50%" title={"Indiquez vos disponibilitées"} onClose={() => {
                setShowDispoModal(false)
            }}/>
        </div>
    );
}
