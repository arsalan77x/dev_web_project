import {Button, Stack, Typography} from '@mui/material'
import {Box} from '@mui/system'
import React, {useEffect, useState} from 'react'
import AddButton from '../buttons/add'
import {Searchbar} from '../textfield/Searchbar'
import PropTypes from 'prop-types'
import {BaseModal} from '../Modal/BaseModal'
import {DataProvider} from '../../core/DataProvider'
import {useDispatch} from 'react-redux'
import {setError} from '../../redux/error_slice'
import {CSVLink} from 'react-csv'
import FileUploadIcon from '@mui/icons-material/FileUpload'
export function ListPage(props) {
    const {
        header,
        searchText,
        searchField,
        setParams,
        filtersData,
        createModal,
        resource,
        defaultState,
        getList,
        reportExcel,
        csvData,
    } = props
    const CreaterModal = createModal
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(defaultState)
    const dispatch = useDispatch()
    async function create() {
        dispatch(setError({loading: true}))
        let result = await DataProvider.create(`${resource}/one`, {data: data})
        if (result && result.status === 200) {
            setData(result.data)
            setOpen(true)
        }
        dispatch(setError({loading: false}))
    }
    async function update() {
        if (data._id) {
            let result = await DataProvider.update(`${resource}/one/${data._id}`, {data: data})
            if (result && result.status === 200) {
                setOpen(false)
                getList()
            }
        }
    }
    async function cancel() {
        if (data._id) {
            let result = await DataProvider.delete(`${resource}/one/${data._id}`)
        }
        setOpen(false)
    }

    useEffect(() => {
        if (open) {
            create()
        }
    }, [open])
    return (
        <Box>
            {open && (
                <BaseModal
                    open={open}
                    setOpen={setOpen}
                    title={'اضافه کردن به ' + header}
                    onClose={cancel}
                >
                    <CreaterModal open={open} setOpen={setOpen} data={data} setData={setData} />
                    <Stack direction="row" margin={'10px 0px'} spacing={2}>
                        <Button
                            variant="contained"
                            onClick={update}
                            size="large"
                            sx={{fontSize: '20px'}}
                        >
                            اضافه کردن
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={cancel}
                            size="large"
                            color="secondary"
                            sx={{fontSize: '20px'}}
                        >
                            انصراف
                        </Button>
                    </Stack>
                </BaseModal>
            )}
            <Stack alignItems={'center'} padding="10px">
                <Stack
                    direction="row"
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="h5">{header}</Typography>

                    {reportExcel ? (
                        <Button color="primary" variant="outlined" startIcon={<FileUploadIcon />}>
                            <CSVLink
                                filename={`${
                                    resource === 'product' ? 'گزارش محصولات' : 'گزارش سفارشات'
                                }.csv`}
                                style={{color: '#00bcd4', textDecoration: 'none'}}
                                data={csvData?.data}
                                headers={csvData?.headers}
                            >
                                خروجی اکسل
                            </CSVLink>
                        </Button>
                    ) : (
                        <AddButton
                            onClick={create}
                            text={'جدید'}
                            style={{fontSize: '20px', marginRight: 'auto'}}
                        />
                    )}
                </Stack>

                <Searchbar
                    searchField={searchField}
                    placeholder={`جستجو در ${searchText} ...`}
                    setParams={setParams}
                    filtersData={filtersData ?? []}
                    noFilters={filtersData ? false : true}
                />
            </Stack>
            <Stack minHeight={'60vh'}>{props.children}</Stack>
        </Box>
    )
}

ListPage.propTypes = {
    header: PropTypes.string,
    searchText: PropTypes.string,
    searchField: PropTypes.string,
    setParams: PropTypes.func,
    filtersData: PropTypes.array,
    createModal: PropTypes.element,
    resource: PropTypes.string,
    defaultState: PropTypes.object,
    getList: PropTypes.func,
}
