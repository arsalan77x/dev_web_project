import React, {useEffect} from 'react'
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import AppDrawer from '../../components/drawer/AppDrawer'
import {DataProvider} from '../../core/DataProvider'
import PrivateRoute from './PrivateRoute.jsx'
import Box from '@mui/material/Box'
import {useSelector} from 'react-redux'
import {OrderList} from '../orders/List/OrderList'
import {Logout} from '../Logout/Logout'
import {OrderEdit} from '../orders/Edit/OrderEdit'
import {CategoryList} from '../Category/List/CategoryList'
import {ProductList} from '../Product/List/ProductList'
import {CustomerList} from '../Customer/List/CustomerList'
import {SliderList} from '../Slider/List/SliderList'
import {CategoryEdit} from '../Category/Edit/CategoryEdit'
import {ProductEdit} from '../Product/Edit/ProductEdit'
import {CustomerEdit} from '../Customer/Edit/CustomerEdit'
import {SliderEdit} from '../Slider/Edit/SliderEdit'
import {QuestionList} from '../question/List/QuestionList'
import {QuestionEdit} from '../question/Edit/QuestionEdit'
import {Config} from '../Configuration/Config'
import {Dashboard} from '../Dashboard/Dashboard'
import {UserList} from '../Users/List/UserList'
import { UserEdit } from '../Users/Edit/UserEdit'
import { OrderReport } from '../Report/OrderReport'
import { ProductReport } from '../Report/ProductReport'

const Home = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector((state) => state.user)
    async function verify() {
        let data = await DataProvider.getOne('user/verify')
        if (!data || data.status != 200) {
            sessionStorage.removeItem('token')
            localStorage.removeItem('token')
            navigate('login')
        } else {
            data = data.data
            if (data.roles)
                sessionStorage.setItem('roles', JSON.stringify(data.roles.map((item) => item.code)))
            if (data.feature_list)
                sessionStorage.setItem(
                    'feature_list',
                    JSON.stringify(data.feature_list.map((item) => item.title)),
                )
            if (location.pathname == '/') navigate('order')
        }
    }
    const roles = JSON.parse(sessionStorage.getItem('roles'))

    useEffect(() => {
        if (!localStorage.getItem('token') || (user && !user.login)) {
            navigate('/login')
        } 
        // else verify()
    }, [user.login])
    return (
        <Box display="flex" height="100%">
            <AppDrawer />
            <Box
                width="100%"
                height={'100%'}
                padding={!location.pathname.includes('dashboard') && '30px'}
            >
                <Box
                    bgcolor={!location.pathname.includes('dashboard') && 'white'}
                    borderRadius={'8px'}
                    style={{
                        boxShadow:
                            !location.pathname.includes('dashboard') &&
                            `0px 0px 5.3px rgba(0, 0, 0, 0.04),
                                0px 0px 17.9px rgba(0, 0, 0, 0.06),
                                0px 0px 80px rgba(0, 0, 0, 0.1)`,
                    }}
                >
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="order" element={<OrderList />} />
                        <Route path="order/:id" element={<OrderEdit noEdit={false}/>} />
                        <Route path="report/order" element={<OrderReport />} />
                        <Route path="report/product" element={<ProductReport />} />
                        <Route path="category" element={<CategoryList />} />
                        <Route path="category/:id" element={<CategoryEdit />} />
                        <Route path="product" element={<ProductList />} />
                        <Route path="product/:id" element={<ProductEdit />} />
                        <Route path="customer" element={<CustomerList />} />
                        <Route path="customer/:id" element={<CustomerEdit />} />
                        <Route path="slider" element={<SliderList />} />
                        <Route path="slider/:id" element={<SliderEdit />} />
                        <Route path="question" element={<QuestionList />} />
                        <Route path="question/:id" element={<QuestionEdit />} />
                        <Route path="user" element={<UserList />} />
                        <Route path="user/:id" element={<UserEdit />} />
                        <Route path="config" element={<Config />} />
                        <Route path="logout" element={<Logout />} />
                        {/* <PrivateRoute
                    path="/employees/:id"
                    element={EmployeeShow}
                    condition={roles && (roles.includes(4) || roles.includes(5))}
                /> */}
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}

export default Home
