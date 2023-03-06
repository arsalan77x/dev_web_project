import React, { useState } from "react"
import { Box, makeStyles } from "@material-ui/core";
import ModalHeader from "../../../modal/modal_header";
import ForgetPhoneNumber from "./ForgetPhoneNumber/ForgetPhoneNumber";
import ForgetSendCode from "./ForgetSendCode/ForgetSendCode";
import ForgetSendDetails from "./ForgetSendDetails/ForgetSendDetails";


const ForgotModal = props => {

    return (
        <Box textAlign="center">
            <ModalHeader text="عضویت در بستنی طرشت" setOpen={props.setOpen} />

            {
                (props.page === -1) ? <ForgetPhoneNumber page={props.page} setPage={props.setPage} /> :
                    (props.page === -2) ? <ForgetSendCode page={props.page} setPage={props.setPage} /> :
                        (props.page === -3) ? <ForgetSendDetails page={props.page} setPage={props.setPage} setOpen={props.setOpen}/> : null
            }
        </Box>
    )

}

export default ForgotModal