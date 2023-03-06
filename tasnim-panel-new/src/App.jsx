import React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import ErrorSnackbar from './components/backdrop/snackbar'
import Home from './pages/home/Home'
import Login from './pages/login/login'
import NotFoundPage from './pages/not_found_page/NotFoundPage'
import AdapterJalali from '@date-io/date-fns-jalali'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import LoadingBackdrop from './components/backdrop/backdrop.jsx'
// import 'moment/locale/fr'
// import 'moment/locale/de'
import {useTranslation} from 'react-i18next'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {store} from './redux/store'
import {AppTheme} from './theme'
import {Provider} from 'react-redux'
import {RTL} from './RTL'

function App() {
    const {t, i18n} = useTranslation()

    return (
        <RTL>
            <LocalizationProvider
                dateAdapter={AdapterJalali}
                // locale={localeMap[i18n.language]}
            >
                <BrowserRouter>
                    <Provider store={store}>
                        <ThemeProvider theme={AppTheme}>
                            <ErrorSnackbar />
                            <LoadingBackdrop />
                            <Routes>
                                <Route path="/*" element={<Home />} />
                                <Route path="login" element={<Login />} />
                                <Route element={NotFoundPage} />
                            </Routes>
                        </ThemeProvider>
                    </Provider>
                </BrowserRouter>
            </LocalizationProvider>
        </RTL>
    )
}

const localeMap = {
    en: 'en',
    fr: 'fr',
    de: 'de',
}

export default App
