import {Button, Stack, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import {GridProducer} from '../../components/Table/GridProducer'
import {CustomTextField} from '../../components/textfield/CustomTextField'
import {DataProvider} from '../../core/DataProvider'
import {persianDateAndTime} from '../../core/date'
import {setError} from '../../redux/error_slice'

const RESOURCE = 'config'
export function Config(props) {
    const [config, setConfig] = useState({})

    const dispatch = useDispatch()
    async function getConfig() {
        let data = await DataProvider.getOne('config/list')
        if (data && data.status === 200) {
            console.log(data.data.location.unit)
            setConfig(data.data)
        }
    }

    async function saveChanges() {
        dispatch(setError({loading: true}))
        let result = await DataProvider.update(`config/one`, {
            data: config,
        })
        dispatch(setError({loading: false}))
    }

    function changeLocation(event, parent, child) {
        setConfig((prev) => {
            const pr = prev[parent]
            return {
                ...prev,
                [parent]: {...pr, [child]: event.target.value},
            }
        })
    }

    useEffect(() => {
        getConfig()
    }, [])
    return (
        <Stack padding={'20px'}>
            <Typography variant="h5" fontWeight="700" mb={'10px'}>
                پیکربندی
            </Typography>
            {config?.location && (
                <>
                    <GridProducer
                        sx={{marginBottom: '16px'}}
                        data={[
                            <Stack spacing={1}>
                                <CustomTextField
                                    name="config.location.unit"
                                    setData={setConfig}
                                    label={'واحد'}
                                    defaultValue={config?.location?.unit}
                                    change={(e) => changeLocation(e, 'location', 'unit')}
                                />
                                <Typography variant="caption">واحد به کیلومتر</Typography>
                            </Stack>,
                            <Stack spacing={1}>
                                <CustomTextField
                                    name="config.location.price_per_unit"
                                    setData={setConfig}
                                    label={'قیمت'}
                                    defaultValue={config.location.price_per_unit}
                                    change={(e) =>
                                        changeLocation(e, 'location', 'price_per_unit')
                                    }
                                />
                                <Typography variant="caption">قیمت به ازای هر واحد</Typography>
                            </Stack>,
                            <Stack spacing={1}>
                                <CustomTextField
                                    name="config.location.free_distance_unit"
                                    setData={setConfig}
                                    label={'کیلومتر رایگان'}
                                    defaultValue={config.location.free_distance_unit}
                                    change={(e) =>
                                        changeLocation(e, 'location', 'free_distance_unit')
                                    }
                                />
                                <Typography variant="caption">تا چند کیلومتر رایگان</Typography>
                            </Stack>,
                            // <Stack spacing={1}>
                            //     <CustomTextField
                            //         name="config.factor.today_date"
                            //         setData={setConfig}
                            //         label={'تاریخ'}
                            //         defaultValue={persianDateAndTime(config.factor.today_date).date}
                            //     />

                            //     <Typography variant="caption">تاریخ آخرین سفارش</Typography>
                            // </Stack>,
                            // <Stack spacing={1}>
                            //     <CustomTextField
                            //         name="config.factor.factor_number"
                            //         setData={setConfig}
                            //         label={'شماره فاکتور '}
                            //         defaultValue={config.factor.factor_number}
                            //     />
                            //     <Typography variant="caption">آخرین شماره فاکتور امروز</Typography>
                            // </Stack>,
                        ]}
                    />
                    <Typography variant="h5" fontWeight="700">
                        محدودیت:
                    </Typography>
                    <GoogleMap
                        zoom={11}
                        positions={[
                            {lat: config.location.left.lat, lng: config.location.left.lon},
                            {lat: config.location.right.lat, lng: config.location.right.lon},
                            {lat: config.location.bottom.lat, lng: config.location.bottom.lon},
                            {lat: config.location.top.lat, lng: config.location.top.lon},
                        ]}
                    />
                </>
            )}

            <Button
                variant="outlined"
                onClick={saveChanges}
                size="large"
                sx={{fontSize: '20px', alignSelf: 'flex-start'}}
            >
                ثبت تغییرات
            </Button>
        </Stack>
    )
}
