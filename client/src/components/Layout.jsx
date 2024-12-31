import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet, useHref } from 'react-router-dom';
import { useLoginStatus, useGetUser } from '../hooks'
import config from '../config'

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];

const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);
    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

export default function DashboardLayoutBasic(props) {
    const isLoggedIn = useLoginStatus();
    const user = useGetUser();

    const [session, setSession] = React.useState({
        user: user ? user : null
    });

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: user ? user : null
                });
            },
            signOut: () => {
                setSession(null);
                window.location.assign(`${config.API_SERVER}/logout`)
            },
        };
    }, []);

    const router = useDemoRouter('/dashboard');

    return (
        <AppProvider
            session={isLoggedIn ? session : null}
            authentication={isLoggedIn ? authentication : null}
            navigation={NAVIGATION}
            branding={{
                logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
                title: 'react-redux-flask-oauth-starter',
                homeUrl: '/',
            }}
            router={router}
            theme={demoTheme}
        >
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </AppProvider>
    );
}