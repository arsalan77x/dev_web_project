import { Button, TextField } from "@material-ui/core"
import React, { useState } from "react"
import dataProvider from "../../../../../Data/dataProvider"
import "../ForgetPassword.scss"
import { useSelector, useDispatch } from "react-redux"
import { setError } from "../../../../../redux/error_slice"

const ForgetSendCode = props => {

    const [error, setInputError] = useState({ code: false, text: "" })
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    async function sendCode() {
        const verificationCode = document.getElementById("forgetSendCodeInput").value
        if (verificationCode === "") {
            setInputError({ code: true, text: "لطفا کد ارسال شده را وارد کنید" })
        } else {
            dispatch(setError({ loading: true }))
            let data = await dataProvider.getOne("customer/forget/verification/" + user.phone + "/" + verificationCode)
            if (data) {
                props.setPage(props.page - 1)
            }
            dispatch(setError({ loading: false }))
        }

    }

    return (
        <div className="forgetContainer">
            <TextField id="forgetSendCodeInput"
                error={error.code}
                helperText={error.text}
                className="forgetTextField"
                variant='outlined' placeholder="لطفا کد ارسال شده را وارد کنید" />

            <Button color='secondary'
                variant="outlined"
                onClick={sendCode}>بعدی</Button>

        </div>
    )
}

export default ForgetSendCode