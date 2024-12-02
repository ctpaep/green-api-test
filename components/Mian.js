"use client";
import { useState } from "react";
import Auth from "./Auth"
import Chats from "./Chats"
import { useAuth } from "./context/AuthContext"
import Loader from "./Loader";

const Main = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Loader/>
    }
    return (
        isAuthenticated ?
            <Chats /> : <Auth />
    )
}
export default Main