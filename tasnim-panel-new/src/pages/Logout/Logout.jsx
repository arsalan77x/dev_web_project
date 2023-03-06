import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataProvider } from "../../core/DataProvider";
import { logout } from "../../redux/user_slice";

export function Logout(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutUser = async () => {
        let data = await DataProvider.sendInformation("user/signout")
        if(data && data.status === 200) {
            dispatch(logout({}))
        }
    }
    useEffect(() => {
        logoutUser()
    }, [])
    return(
        <Box>
            logout
        </Box>
    )
}