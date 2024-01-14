'use client'

import React, { useCallback, useEffect, useContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if(!state) throw new Error(`state is undefined`);
    return state;
}

export const SocketProvider = ({children}) => {

    const [socket, setSocket] = useState(undefined);
    const [messages, setMessages] = useState([]);

    const sendMessage = useCallback((msg) => {
        console.log(`Send Message... ${msg}`);
        if(socket){
            socket.emit('event:message', {message: msg, socketId: socket.id});
        }
    },[socket]);

    const onMessageRec = useCallback((msg) => {
        const message = JSON.parse(msg);
        console.log(`Message received from server... ${message}`);
        setMessages(receivedMessages => [...receivedMessages, message]);
    },[]);

    useEffect(() => {
        const _socket = io("http://localhost:8000");
        _socket.on('message', onMessageRec);
        setSocket(_socket);

        return () => {
            _socket.disconnect();
            console.log(`Socket Connection disconnected => ${_socket.id}`);
            _socket.off('message', onMessageRec);
            setSocket(undefined);
        }
    },[])
    
    return (
        <SocketContext.Provider value={{sendMessage, messages, socket}}>
            {children}
        </SocketContext.Provider>
    )
}