import React, {useEffect, useState} from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PropTypes from 'prop-types'
import {Box, Stack, Typography} from '@mui/material'
import {withStyles} from '@mui/styles'
import {OrderTable} from './OrderTable'

export function OrderTabs(props) {
    const {params, setParams} = props
    const [selectedTab, setSelectedTab] = useState(0)
    const tabs = [
        {id: -1, state: 'همه'},
        {id: 0, state: 'ثبت سفارش موفق'},
        {id: 1, state: 'در حال آماده‌سازی'},
        {id: 2, state: 'ارسال سفارش'},
        {id: 3, state: 'پرداخت ناموفق'},
        {id: 4, state: 'پرداخت حضوری'},
    ]
    const handleTab = (event, newValue) => {
        setParams((params) => {
            let filter = params.filter
            return newValue === 0
                ? {...params, filter: {...filter, state: ''}}
                : {...params, filter: {...filter, state: tabs[newValue].state}}
        })
        setSelectedTab(newValue)
    }

    return (
        <Box>
            <CustomTabs value={selectedTab} onChange={handleTab}>
                {tabs.map((item, index) => (
                    <CustomTab
                        label={
                            <Box>
                                {item.state} <TabNumber tab={selectedTab} index={index} />
                            </Box>
                        }
                    />
                ))}
            </CustomTabs>
            {tabs.map((item, index) => {
                return (
                    <TabPanel key={item.id} value={selectedTab} index={index}>
                        {<OrderTable state={item.state} params={params} setParams={setParams} />}
                    </TabPanel>
                )
            })}
        </Box>
    )
}

function TabNumber(props) {
    return <Typography>{props.number}</Typography>
}

function TabPanel(props) {
    const {children, value, index, condition, ...other} = props

    return (
        <div
            style={{position: 'relative'}}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Stack minHeight={'60vh'}>{children}</Stack>}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

const CustomTabs = withStyles({
    root: {
        borderBottom: '1px solid #CAD0DB',
        boxShadow: '0px 12px 20px -12px rgba(182, 191, 207, 0.4)',
    },
    indicator: {
        height: '3px',
        borderRadius: '8px',
    },
})(Tabs)

const CustomTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        marginLeft: '40px',
        fontSize: '20px',
        fontWeight: 700,
        // '&:hover': {
        //     color: '#0487FF',
        //     opacity: 1,
        // },
        // '&$selected': {
        //     color: '#0487FF',
        // },
        // '&:focus': {
        //     color: '#0487FF',
        // },
    },
    selected: {},
}))((props) => <Tab {...props} />)
