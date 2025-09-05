import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../features/auth/hook";

import { logout } from "../features/auth/authSlice";
import React from 'react'

const useIdleLogout = () => {
    
    const IDLE_TIMEOUT = 5 * 10 * 500;
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (loggedIn) {
            timerRef.current = setTimeout(() => {
                dispatch(logout());
                alert("You were logged out due to inactivity.");
            }, IDLE_TIMEOUT);
        }
    };
    
    useEffect(() => {
        if(!loggedIn)return;

        const events = ["mousemove","keydown","click","scroll"]
        events.forEach((event) => window.addEventListener(event, resetTimer));

        resetTimer(); // start timer on mount

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };

    },[loggedIn]);
}

export default useIdleLogout