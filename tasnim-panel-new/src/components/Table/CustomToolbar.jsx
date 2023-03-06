import React, { useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import {alpha} from '@mui/material/styles'
import {Button, Collapse, Stack} from '@mui/material'
import { BaseModal } from '../Modal/BaseModal'
import { DataProvider } from '../../core/DataProvider'
import { useDispatch } from 'react-redux'
import { setError } from '../../redux/error_slice'

export function CustomToolbar(props) {
    const {numSelected, resource, selected,setSelected, setParams} = props
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    async function deleteOne() {
        dispatch(setError({loading: true}))
        let data = await DataProvider.delete(`${resource}/one/${selected[0]}`)
        setSelected([])
        setOpen(false)
        dispatch(setError({loading: false}))
        setParams(params => {
            return{...params, temp: new Date()}
        })
    }
    return (
        <Collapse in={numSelected > 0}>
            <BaseModal open={open} setOpen={setOpen} title='آیا مطمئن هستید؟'>
                <Stack direction={'row'} spacing={2}>
                    <Button variant='outlined' onClick={deleteOne} size='large'>
                        بله
                    </Button>
                    <Button variant='contained' color="secondary" onClick={e => setOpen(false)} size='large'>
                        خیر
                    </Button>
                </Stack>
            </BaseModal>
            <Toolbar
                sx={{
                    bgcolor: (theme) =>
                        alpha(theme.palette.secondary.main, theme.palette.action.activatedOpacity),
                }}
            >
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} تا انتخاب شده 
                </Typography>

                <Tooltip title="Delete">
                    <IconButton color="secondary" onClick={e => setOpen(true)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </Collapse>
    )
}
