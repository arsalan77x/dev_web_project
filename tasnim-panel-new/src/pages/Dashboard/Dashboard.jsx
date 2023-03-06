import {Stack, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {GridProducer} from '../../components/Table/GridProducer'
import {DataProvider} from '../../core/DataProvider'
import CountUp from 'react-countup'
import {makeStyles} from '@mui/styles'
import {CustomLineChart} from '../../components/chart/LineChart'
import {CustomAreaChart} from '../../components/chart/AreaChart'
import {CustomBarChart} from '../../components/chart/BarChart'
import {CustomPieChart} from '../../components/chart/PieChart'

const duration = 2
export function Dashboard(props) {
    const [orderData, setOrderData] = useState({})
    const classes = useStyles()
    async function getOrderData() {
        let data = await DataProvider.getOne('report/todayorder')
        if (data && data.status === 200) {
            setOrderData(data.data)
        }
    }

    useEffect(getOrderData, [])
    return (
        <Stack padding={'20px'}>
            <GridProducer
                count={5}
                data={[
                    <Stack spacing={2} className={classes.orderData}>
                        <Typography>پرداخت حضوری</Typography>
                        <Typography variant="h5">
                            <CountUp end={orderData.hozoori} duration={duration} />
                        </Typography>
                    </Stack>,
                    <Stack spacing={2} className={classes.orderData}>
                        <Typography>پرداخت ناموفق</Typography>
                        <Typography variant="h5">
                            <CountUp end={orderData.namovaffagh} duration={duration} />
                        </Typography>
                    </Stack>,
                    <Stack spacing={2} className={classes.orderData}>
                        <Typography>پرداخت موفق</Typography>
                        <Typography variant="h5">
                            <CountUp end={orderData.movaffagh} duration={duration} />
                        </Typography>
                    </Stack>,
                    <Stack spacing={2} className={classes.orderData}>
                        <Typography>ارسال سفارش</Typography>
                        <Typography variant="h5">
                            <CountUp end={orderData.eralsefaresh} duration={duration} />
                        </Typography>
                    </Stack>,
                    <Stack spacing={2} className={classes.orderData}>
                        <Typography>درحال آماده سازی</Typography>
                        <Typography variant="h5">
                            <CountUp end={orderData.amadesazi} duration={duration} />
                        </Typography>
                    </Stack>,
                ]}
            />
            <GridProducer
                count={3}
                data={[
                    <Stack height={'200px'} marginTop={'10px'} className={classes.chart}>
                        <CustomPieChart />
                    </Stack>,
                    <Stack height={'200px'} marginTop={'10px'} className={classes.chart}>
                        <CustomPieChart />
                    </Stack>,
                    <Stack height={'200px'} marginTop={'10px'} className={classes.chart}>
                        <CustomPieChart />
                    </Stack>,
                ]}
            />
            <Stack height={'300px'} marginTop={'10px'} className={classes.chart}>
                <CustomAreaChart />
            </Stack>
            <GridProducer
                count={2}
                data={[
                    <Stack height={'200px'} marginTop={'10px'} className={classes.chart}>
                        <CustomLineChart />
                    </Stack>,
                    <Stack height={'200px'} marginTop={'10px'} className={classes.chart}>
                        <CustomBarChart />
                    </Stack>,
                ]}
            />
        </Stack>
    )
}

const useStyles = makeStyles({
    orderData: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: '8px',
        // border: '1px solid #00bcd4',
        boxShadow: `0px 0px 5.3px rgba(0, 0, 0, 0.01),
                                0px 0px 20px rgba(0, 0, 0, 0.1)`,
        padding: '40px',
    },
    chart: {
        // alignItems: 'center',
        // justifyContent: 'center',
        textAlign: 'right',
        backgroundColor: 'white',
        borderRadius: '8px',
        // border: '1px solid #00bcd4',
        boxShadow: `0px 0px 5.3px rgba(0, 0, 0, 0.01),
                                0px 0px 20px rgba(0, 0, 0, 0.1)`,
    },
})
