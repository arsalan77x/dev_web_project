import { Button, TextField } from "@material-ui/core"
import React, { useState } from "react"
import dataProvider from "../../../../../Data/dataProvider"
import "../ForgetPassword.scss"
import { useSelector, useDispatch } from "react-redux"
import { setError } from "../../../../../redux/error_slice"
import login from "../../LoginModal/LoginApi"

const ForgetSendDetails = props => {
    const [error, setInputError] = useState({
        phone: false, phoneText: "",
        pass: false, passText: "",
    })
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    async function sendDetails() {
        const password = document.getElementById("forgetSendDetailsPassInput").value
        setInputError({
            pass: password === "" || password.length < 4, passText: password === "" ?
                "لطفا رمز عبور خود را وارد کنید"
                : password.length < 4 ?
                    "رمز عبور نمیتواند کمتر از 4 کاراکتر داشته باشد" : "",
        })
        if (password != "" && password.length >= 4) {
            dispatch(setError({ loading: true }))
            let personInfo = {
                phone: user?.phone,
                password: password,
            }
            let data = await dataProvider.sendInformation("customer/forget", { data: personInfo })
            if (data) {
                await login(user.phone, password, null, props.setOpen)
            }
            dispatch(setError({ loading: false }))
        }

    }

    return (
        <div className="forgetContainer">
            <TextField id="forgetSendDetailsPassInput"
                error={error.pass}
                helperText={error.passText}
                className="forgetTextField"
                variant='outlined' placeholder=" رمز عبور" />

            <Button color='secondary'
                variant="outlined"
                onClick={sendDetails}>بعدی</Button>

        </div>
    )
}

export default ForgetSendDetails