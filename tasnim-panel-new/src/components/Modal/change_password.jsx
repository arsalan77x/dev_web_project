import { Box, Button, Divider, IconButton, Typography } from "@mui/material"
import React, { useContext } from "react"
import ModalHeader from "../../components/madal/modal_header"
import { withTranslation } from 'react-i18next';
import { DataProvider } from "../../core/dataProvider";
import { Context } from "../../core/context";
import CustomTextField from "../textfield/custom_textfield";
import CheckIcon from '@mui/icons-material/Check';
import {makeStyles} from '@mui/styles'

function ChangePasswordModal(props) {
    const classes = useStyles()
    const t = props.t
    const context = useContext(Context)
    const handleClose = () => {
        props.setOpen(false);
    };

    async function changePassword() {
        let data = await DataProvider.update(context, "employee/one/" + props.id, {
            data: {
                password: document.getElementById('employeePassword').value
            }
        })
        handleClose()
    }

    return (
        <Box className={classes.root}>
            <ModalHeader title={t('employee.changePasswordModal.title')} setOpen={props.setOpen} />
            <Box padding="0px 37px 24px 50px" marginTop="24px">
                <Box marginBottom="24px">
                    <Typography className={classes.columnTitle}>{t('employee.show.password')}</Typography>
                    <CustomTextField id="employeePassword" placeholder={t('employee.show.passwordplh')} />
                </Box>
                <Box marginBottom="24px">
                    <Typography className={classes.columnTitle}>{t('employee.show.confirmPassword')}</Typography>
                    <CustomTextField placeholder={t('employee.show.confirmPasswordplh')} />
                </Box>
                <Box display='flex' flexDirection='row-reverse'>
                    <Button
                        onClick={changePassword}
                        className={classes.addCustomerButton}
                        startIcon={<CheckIcon style={{ marginLeft: "8px", fontSize: "26px" }} />}>
                        {t('employee.changePasswordModal.text')}
                    </Button>
                    <Button
                        onClick={handleClose}
                        className={classes.cancelButton}>
                        {t('button.cancel')}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '760px',
        background: '#F5F7FA',
        boxShadow: '0px 10px 20px -5px rgba(42, 48, 59, 0.2)',
        position: "absolute",
        top: "50%",
        msTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
        boxSizing: 'border-box'
    },
    bold: {
        fontWeight: 700,
    },
    removeTitle: {
        fontWeight: 700,
        color: '#EB5757',
    },
    removeButton: {
        border: "1px solid #EB5757",
        borderRadius: '0px',
        color: '#EB5757',
        fontSize: '20px',
        padding: '12px 20px',
        fontWeight: 700,
        marginLeft: '16px'
    },
    cancelButton: {
        border: "1px solid #B6BFCF",
        borderRadius: '0px',
        color: '#B6BFCF',
        fontSize: '20px',
        padding: '12px 20px',
        fontWeight: 700
    },
    columnTitle: {
        color: '#778191',
        fontWeight: 700,
        marginBottom: '5px'
    },
    columnData: {
        color: '#2A303B',
        fontWeight: 500
    },
    addCustomerButton: {
        background: '#2A303B',
        borderRadius: '0px',
        color: 'white',
        fontSize: '20px',
        padding: '12px 20px',
        fontWeight: 700,
        marginLeft: '16px',
        '&:hover': {
            background: "#2A303B"
        }
    },
}))

export default withTranslation()(ChangePasswordModal)