import {Button, Grid, Stack, Tooltip, Typography} from '@mui/material'
import {Box} from '@mui/system'
import React, {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import PrintIcon from '@mui/icons-material/Print'
import {CustomTextField} from '../../../components/textfield/CustomTextField'
import {DateFilter} from '../../../components/textfield/DateFilter'
import {CustomAutocomplete} from '../../../components/textfield/CustomAutoComplete'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import {GridProducer} from '../../../components/Table/GridProducer'
import {EditPage} from '../../../components/Table/EditPage'
import GoogleMap from '../../../components/GoogleMap/GoogleMap'
import {TASNIM_POSITION} from '../../../core/APP_URL'
import {DataProvider} from '../../../core/DataProvider'
import {LoadingButton} from '@mui/lab'

const RESOURCE = 'order'

export function OrderEdit(props) {
    const {id, noEdit} = props
    const params = useParams()
    const [order, setOrder] = useState({})
    const [print, setPrint] = useState(false)
    async function getOneOrder() {
        let data = await DataProvider.getOne('order/one/' + (id ?? params.id))
        if (data?.status === 200) {
            setOrder(data.data)
        }
    }
    async function changeField(event, field, value) {
        setPrint(true)
        let data = await DataProvider.update('order/one/' + (id ?? params.id), {
            data: {
                is_print: true,
            },
        })
        setTimeout(() => setPrint(false), 1500)
    }

    useEffect(getOneOrder, [])
    console.log(print)
    return (
        <EditPage
            resource={RESOURCE}
            title="سفارش"
            data={order}
            noEdit={noEdit}
            headerBody={
                <LoadingButton
                    loading={print}
                    onClick={(e) => changeField(e, 'is_print', true)}
                    startIcon={<PrintIcon />}
                    size="large"
                    sx={{fontWeight: '700'}}
                    variant="outlined"
                >
                    پرینت
                </LoadingButton>
            }
        >
            {order.detail && (
                <>
                    <Typography variant="h6" fontWeight="700">
                        آدرس: {order.address.detail}
                    </Typography>
                    <GoogleMap
                        positions={order.address.latitude ? [{lat: order.address.latitude, lng: order.address.longitude}] : TASNIM_POSITION}
                    />

                    <Stack>
                        <GridProducer
                            data={[
                                <CustomTextField
                                    name="caption"
                                    resource={RESOURCE}
                                    setData={setOrder}
                                    id={order._id}
                                    label={'توضیحات'}
                                    defaultValue={order.caption}
                                    sx={{flexGrow: 1}}
                                />,
                                <DateFilter
                                    noFilter
                                    label={'تاریخ'}
                                    defaultValue={order.time}
                                    onChange={(e) => changeField(e, 'time', e)}
                                />,
                                <CustomTextField
                                    name="customer_name"
                                    resource={RESOURCE}
                                    setData={setOrder}
                                    id={order._id}
                                    label={'نام مشتری'}
                                    defaultValue={order.customer_name}
                                    sx={{flexGrow: 1}}
                                />,
                                <CustomTextField
                                    name="customer_phone"
                                    resource={RESOURCE}
                                    setData={setOrder}
                                    id={order._id}
                                    label={'شماره مشتری'}
                                    defaultValue={order.customer_phone}
                                />,
                                <CustomAutocomplete
                                    label={'وضعیت'}
                                    name="state"
                                    setData={setOrder}
                                    resource={RESOURCE}
                                    id={order._id}
                                    options={states}
                                    defaultValue={order.state}
                                />,
                                <CustomAutocomplete
                                    label={'نوع تحویل'}
                                    name="deliver_type"
                                    setData={setOrder}
                                    resource={RESOURCE}
                                    id={order._id}
                                    options={deliverTypes}
                                    defaultValue={order.deliver_type}
                                />,

                                <CustomAutocomplete
                                    label={'نوع پرداخت'}
                                    resource={RESOURCE}
                                    name="pay_type"
                                    setData={setOrder}
                                    id={order._id}
                                    options={[{label: 'آنلاین'}, {label: 'حضوری'}]}
                                    defaultValue={order.pay_type}
                                />,
                            ]}
                        />

                        <GridProducer
                            sx={{marginTop: '10px'}}
                            data={[
                                <Stack
                                    flexGrow={1}
                                    borderRadius="8px"
                                    bgcolor={'#ffdcb2'}
                                    border={'4px dashed white'}
                                    padding="10px"
                                >
                                    <Row title="قیمت" data={order.price} />
                                    <Row title="قیمت بعد از تخفیف" data={order.price_after_off} />
                                </Stack>,
                                <Stack
                                    flexGrow={1}
                                    borderRadius="8px"
                                    bgcolor={'#ffdcb2'}
                                    border={'4px dashed white'}
                                    padding="10px"
                                >
                                    <Row title="هزینه ارسال" data={order.send_price} />
                                    <Row title="هزینه بسته بندی" data={order.packprice} />
                                </Stack>,
                                <Stack
                                    flexGrow={1}
                                    borderRadius="8px"
                                    bgcolor={'#ffdcb2'}
                                    border={'4px dashed white'}
                                    padding="10px"
                                >
                                    <Row title="شماره فاکتور" data={order.factor_number} />
                                    <Row title="آیدی فاکتور" data={order.factor_id} />
                                </Stack>,
                            ]}
                        />

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography color="InactiveCaptionText" variant="h5">
                                                محصول
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="InactiveCaptionText" variant="h5">
                                                اندازه
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="InactiveCaptionText" variant="h5">
                                                قیمت
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="InactiveCaptionText" variant="h5">
                                                تعداد
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.detail.map((item, index) =>
                                        item.types.map((type) => (
                                            <TableRow key={type._id}>
                                                <TableCell>
                                                    <Chip
                                                        label={type.name}
                                                        color="primary"
                                                        clickable
                                                    />
                                                    {item.tastes && item.tastes.length !== 0 ? (
                                                        <Tooltip
                                                            arrow
                                                            title={item.tastes.map((elm) => (
                                                                <Typography>{elm.name}</Typography>
                                                            ))}
                                                        >
                                                            <Button>طعم ها</Button>
                                                        </Tooltip>
                                                    ) : null}
                                                </TableCell>
                                                <TableCell>{type.size}</TableCell>
                                                <TableCell>{type.price}</TableCell>
                                                <TableCell>{type.count}</TableCell>
                                            </TableRow>
                                        )),
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </>
            )}
        </EditPage>
    )
}

function Row(props) {
    const {title, data} = props
    return (
        <Stack
            direction={'row'}
            alignItems="center"
            justifyContent={'space-between'}
            marginBottom="8px"
        >
            <Typography color="secondary.dark">{title}</Typography>
            <Typography fontWeight={'700'} color="#7e7a75">
                {data}
            </Typography>
        </Stack>
    )
}

const states = [
    {label: 'ثبت سفارش موفق'},
    {label: 'در حال آماده‌سازی'},
    {label: 'ارسال سفارش'},
    {label: 'پرداخت ناموفق'},
    {label: 'پرداخت حضوری'},
]
const deliverTypes = [{label: 'ارسال'}, {label: 'حضوری'}]
