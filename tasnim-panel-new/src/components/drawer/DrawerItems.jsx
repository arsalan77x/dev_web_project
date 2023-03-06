import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CategoryIcon from '@mui/icons-material/Category'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import SlideshowIcon from '@mui/icons-material/Slideshow'
import QuizIcon from '@mui/icons-material/Quiz'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import GroupIcon from '@mui/icons-material/Group'
import ArticleIcon from '@mui/icons-material/Article';
export const DrawerItems = [
    {title: 'داشبورد', link: 'dashboard', icon: <EqualizerIcon fontSize="large" />},
    {title: 'سفارش ها', link: 'order', icon: <ShoppingCartIcon fontSize="large" />},
    {title: 'گزارش گیری', link: 'report', icon: <ArticleIcon fontSize="large" />},
    {title: 'دسته بندی', link: 'category', icon: <CategoryIcon fontSize="large" />},
    {title: 'محصولات', link: 'product', icon: <AutoAwesomeMosaicIcon fontSize="large" />},
    {title: 'مشتری ها', link: 'customer', icon: <SupportAgentIcon fontSize="large" />},
    {title: 'اسلایدر ها', link: 'slider', icon: <SlideshowIcon fontSize="large" />},
    // {title: 'راهنمای خرید', link: 'buyHelp',icon: <FeedIcon fontSize='large'/>},
    // {title: 'درباره ما', link: 'aboutUs',icon: <InfoIcon fontSize='large'/>},
    {title: 'سوالات متداول', link: 'question', icon: <QuizIcon fontSize="large" />},
    {title: 'کارمندان', link: 'user', icon: <GroupIcon fontSize="large" />},
    {title: 'پیکربندی', link: 'config', icon: <SettingsIcon fontSize="large" />},
    {title: 'خروج', link: 'logout', icon: <LogoutIcon fontSize="large" />},
]
