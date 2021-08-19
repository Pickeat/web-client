import React from 'react';

export default function Message(props) {

    return (
        <div>
            <p className="text-xs font-thin ml-2 mb-0 ">{props.sent ? "": props.name}</p>
            <div
                className={`${props.sent ? 'float-right mr-2 bg-green-300':'float-left ml-2 bg-gray-300'} max-w-sm flex-initial p-2 mb-2 text-sm text-left rounded-md justify-center items-center`}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}
