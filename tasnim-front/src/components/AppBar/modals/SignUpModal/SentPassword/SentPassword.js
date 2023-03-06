import { TextField, Typography } from "@material-ui/core"
import React, { useState } from "react"
import APP_URL from "../../../../../Data/APP_URL"
import dataProvider from "../../../../../Data/dataProvider"
import handleFetchError from "../../../../../Data/ErrorHandler"
import Timer from './Timer/Timer'
import { useSelector, useDispatch } from "react-redux"
import { setError } from "../../../../../redux/error_slice"

const SentPassword = props => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [seconds, setSeconds] = useState(59)
    const [error, setInputError] = useState({ code: false, text: "" })
    async function sendVerificationCode() {
        const verificationCode = document.getElementById("verificationCodeInput").value
        if (verificationCode === "") {
            setInputError({ code: true, text: "لطفا کد ارسال شده را وارد کنید" })
        } else {

            dispatch(setError({ loading: true }))
            let data = await dataProvider.getOne("customer/signup/ver/" + user.phone + "/" + verificationCode)
            if (data) {
                props.setPage(props.page + 1)
            }
            dispatch(setError({ loading: false }))
        }

    }
    return (
        <div className="sentPasswordContainer">
            <div className="sentPasswordForm">
                <div>
                    <p>کد ارسال شده را وارد کنید</p>
                    <p className="smallText">شماره شما: {user.phone}</p>
                </div>
                <TextField
                    variant="outlined"
                    error={error.code}
                    helperText={error.text}
                    type="text"
                    className="signUpSentPassInput"
                    placeholder="کد دسترسی"
                    id="verificationCodeInput" />
                <div>
                    {seconds == 0 ?
                        <Typography className="smallText" style={{ cursor: 'pointer' }} onClick={e => {
                            setSeconds(59)
                        }}>ارسال مجدد</Typography>
                        :
                        <Timer seconds={seconds} setSeconds={setSeconds} />
                    }
                </div>
                <Typography className="signUpConfirmButton" onClick={sendVerificationCode}>تایید</Typography>

            </div>


        </div>
    )
}

export default SentPassword