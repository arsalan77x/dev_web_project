import React, {useEffect, useState} from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import { Typography} from '@mui/material'
import logo from '../../images/mainLogo.png'
import {useNavigate, useLocation} from 'react-router-dom'
import {withTranslation} from 'react-i18next'
import {DataProvider} from '../../core/DataProvider'
import profileImage from '../../images/profile.png'
import {makeStyles} from '@mui/styles'
import ListItemIcon from '@mui/material/ListItemIcon'
import Collapse from '@mui/material/Collapse'
import ListItemButton from '@mui/material/ListItemButton'
import {DrawerItems} from './DrawerItems'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

function AppDrawer(props) {
    const classes = useStyles()
    const [employee, setEmployee] = useState({})
    const [selected, setSelected] = useState(new Array(DrawerItems.length).fill(false))
    const navigate = useNavigate()
    const location = useLocation()
    const t = props.t
    async function getEmployee() {
        let data = await DataProvider.getOne('employee/one/' + localStorage.getItem('id'))
        if (data && data.data) setEmployee(data.data)
    }
    useEffect(() => {
        const value = location.pathname
        let checked = false
        for (let item of DrawerItems) {
            if (value.toString() === "/" + (item.link)) {
                let index = DrawerItems.indexOf(item)
                let newList = new Array(DrawerItems.length).fill(false)
                newList[index] = true
                setSelected(newList)
                checked = true
            }
        }

        if (!checked && value.toString().startsWith('/profile')) setSelected(DrawerItems.length)
    }, [location.pathname])

    function handleClick(link, index) {
        let newList = new Array(DrawerItems.length).fill(false)
        newList[index] = true
        setSelected(newList)
        navigate(link)
    }

    const roles = JSON.parse(sessionStorage.getItem('roles'))

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.drawerHeader}>
                <img className={classes.garageImage} src={logo} />
                <Typography fontWeight={700} sx={{pl: '25px'}}>
                    پنل مدیریت کافه تسنیم
                </Typography>
            </div>
            <List component="div" disablePadding>
                {DrawerItems.map((item, index) => (
                    <>
                        <ListItemButton
                            onClick={(event) => handleClick(item.link, index)}
                            selected={selected[index]}
                            key={item.title}
                            classes={{selected: classes.selected, root: classes.mainSelected}}
                        >
                            <ListItemIcon style={{color: selected[index] ? 'white' : '#606566'}}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{variant: 'h6'}}
                            />
                        </ListItemButton>
                        {item.link === 'report' && (
                            <Collapse in={selected[index]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {[
                                        {title: 'سفارشات', icon: <ShoppingCartIcon />, url: 'order'},
                                        {title: 'محصولات', icon: <AutoAwesomeMosaicIcon />, url: 'product'},
                                    ].map((option) => (
                                        <ListItemButton
                                        onClick={(e) => navigate(item.link + '/' + option.url)}
                                        classes={{selected: classes.selected, root: classes.subMainSelected}}
                                        >
                                            <ListItemIcon>{option.icon}</ListItemIcon>
                                            <ListItemText primary={option.title} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </>
                ))}
            </List>
        </Drawer>
    )
}

export const drawerWidth = 320

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    subMainSelected: {
        padding: '12px 50px',
        margin: '2px 12px',
        borderRadius: '8px',
        fontWeight: 500,
        fontSize: '32px',
        '&$selected': {
            backgroundColor: theme.palette.primary.light,
            fontWeight: 700,
            color: 'white',
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    },
    mainSelected: {
        padding: '12px 16px',
        margin: '2px 12px',
        borderRadius: '8px',
        fontWeight: 500,
        fontSize: '32px',
        '&$selected': {
            backgroundColor: theme.palette.primary.main,
            fontWeight: 700,
            color: 'white',
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    },
    profileSelected: {
        padding: '10px 5px 10px 40px',
        marginBottom: '30px',
        fontWeight: 500,
        fontSize: '20px',
        boxSizing: 'border-box',
        whiteSpace: 'wrap',
        overflowWrap: 'break-word',
        '&$selected': {
            backgroundColor: '#0487FF',
            fontWeight: 700,
            color: 'white',
            '&:hover': {
                backgroundColor: '#0487FF',
            },
        },
    },
    selected: {},
    listItemText: {
        fontWeight: 700,
        fontSize: '32px',
    },
    drawerFooter: {
        display: 'flex',
        marginLeft: '30px',
        alignItems: 'center',
        marginBottom: '40px',
    },
    avatar: {
        marginRight: '10px',
        width: '60px',
        height: '60px',
        background: profileImage,
    },
    drawerHeader: {
        display: 'flex',
        padding: '30px',
        alignItems: 'center',
    },
    garageImage: {
        width: '30px',
        height: '30px',
        marginRight: '10px',
    },
    boldText: {
        fontWeight: 700,
        fontSize: '20px',
    },
}))

export default withTranslation()(AppDrawer)
