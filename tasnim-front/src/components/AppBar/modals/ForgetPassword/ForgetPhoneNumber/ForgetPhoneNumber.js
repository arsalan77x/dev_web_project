import { Button, TextField } from "@material-ui/core"
import React, { useState } from "react"
import dataProvider from "../../../../../Data/dataProvider"
import { useDispatch } from "react-redux"
import "../ForgetPassword.scss"
import { setUser } from "../../../../../redux/user_slice"
import { setError } from "../../../../../redux/error_slice"

const ForgetPhoneNumber = props => {
    const [error, setInputError] = useState({ phone: false, text: "" })
    const dispatch = useDispatch()

    async function sendNumber() {
        const phoneNumber = document.getElementById("forgetPhoneNumberInput").value
        if (phoneNumber === "") {
            setInputError({ phone: true, text: "لطفا شماره موبایل خود را وارد کنید" })
        } else {
            dispatch(setError({ loading: true }))
            let data = await dataProvider.getOne("customer/forget/verification/" + phoneNumber)
            if (data) {
                props.setPage(props.page - 1)
                dispatch(setUser({ phone: phoneNumber }))
            }
            dispatch(setError({ loading: false }))
        }

    }
    return (
        <div className="forgetContainer">
            <TextField id="forgetPhoneNumberInput"
                error={error.phone}
                helperText={error.text}
                className="forgetTextField"
                variant='outlined' placeholder=" شماره موبایل " />

            <Button color='secondary'
                variant="outlined"
                onClick={sendNumber}>بعدی</Button>

        </div>
    )
}

export default ForgetPhoneNumber