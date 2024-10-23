import axios from "axios";
import React, { ReactNode } from 'react';
import { localStorageVariables } from '../enums/commonVariables';
import { Navigate } from 'react-router-dom';


export const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3000';


const apiClient = axios.create({
    baseURL: BASE_URL,
});

function getToken(): string | null{
    let token = window.localStorage ? window.localStorage.getItem(localStorageVariables.AUTH_TOKEN) : null;
    return token;
}

function getUserName(): string | null {
    let userName = window.localStorage ? window.localStorage.getItem(localStorageVariables.USERNAME) : null;
    return userName;
}

function getProfilePic(): string | null {
    let token = window.localStorage ? window.localStorage.getItem(localStorageVariables.PROFILEPIC) : null;
    return token;
}

function getUserId(): string | null {
    let userId = window.localStorage ? window.localStorage.getItem(localStorageVariables.USERID)  : null;
    return userId;
}


function clearLocalStorage() {
    if (window.localStorage) {
        window.localStorage.setItem(localStorageVariables.AUTH_TOKEN, "");
        window.localStorage.setItem(localStorageVariables.USERNAME, "")
        window.localStorage.setItem(localStorageVariables.USERID, "");
        window.localStorage.setItem(localStorageVariables.PROFILEPIC, "");
    }
}

function setLocalStorage(token: string, username: string, userId: string, profilePic: string){
    if (window.localStorage) {
        window.localStorage.setItem(localStorageVariables.AUTH_TOKEN, token);
        window.localStorage.setItem(localStorageVariables.USERNAME, username);
        window.localStorage.setItem(localStorageVariables.USERID, userId);
        window.localStorage.setItem(localStorageVariables.PROFILEPIC, profilePic);
    }
}

function isAuthenticated(): boolean {
    const token = getToken();
    return Boolean(token);
}

interface ProtectedProps {
    children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
    const token = getToken();
    return (
        <>
            {token && token.length ? children : <Navigate to="/" />}
        </>
    );
}

const IsUserLoggedIn: React.FC<ProtectedProps> = ({ children }) => {
    const token = getToken();
    return (
        <>
            {token && token !== "undefined" ? <Navigate to="/dashboard" /> : children}
        </>
    );
}

export { isAuthenticated, getToken, getProfilePic, getUserId, Protected, IsUserLoggedIn, getUserName, clearLocalStorage, setLocalStorage, apiClient };

