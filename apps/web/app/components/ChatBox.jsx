'use client'

import React, { useEffect, useState } from 'react';
import styles from './ChatBox.module.css';
import { useSocket } from '../../context/SocketProvider';

export default function ChatBox() {

    let inputBox = null;
    let messageEnd = null;

    const [message, setMessage] = useState("");

    const { sendMessage, messages, socket } = useSocket();

    const msgs = messages.map((msg) => {
        const author = msg.socketId === socket.id ? "me" : "other";
        return <span className={styles.message} data-author={author}>{msg.message}</span>;
    });
    
    useEffect(() => {
        messageEnd.scrollIntoView({ behaviour: "smooth" });
    });

    return (
        <div className={styles.chatHolder}>
            <div className={styles.chatText}>
                {msgs}
                <div ref={(element) => { messageEnd = element; }}></div>
            </div>
            <div className={styles.form}>
                <input
                    ref={(element) => { inputBox = element; }}
                    placeholder="Type a message..."
                    onChange={e => setMessage(e.target.value)}
                    className={styles.textarea}
                ></input>
                <button onClick={e => sendMessage(message)} type="button" className={styles.button} >Send</button>
            </div>
        </div>
    )
}