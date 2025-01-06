import * as React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet } from 'react-router-dom';
import logo from '../assets/logo.png';
import { router } from './App'
import { logout } from '../actionCreators/authActionCreator';

const navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'home',
        title: 'Home',
        icon: <DashboardIcon />,
    },
    {
        segment: 'create',
        title: 'Create Game',
        icon: <CreateIcon />,
    },
    {
        segment: 'leaderboard',
        title: 'Leaderboard',
        icon: <LeaderboardIcon />,
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
        icon: <AnalyticsIcon />,
        children: [
            {
                segment: 'personal',
                title: 'Personal',
                icon: <PersonIcon />,
            },
            {
                segment: 'global',
                title: 'Global',
                icon: <LanguageIcon />,
            },
        ],
    }
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

const LayoutComponent = (props) => {
    const [session, setSession] = React.useState({
        user: props.user
    });
    const navigate = useNavigate();

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: props.user
                });
            },
            signOut: () => {
                setSession(null);
                props.logout();
                navigate(0)
            },
        };
    }, []);

    return (
        <AppProvider
            session={session}
            authentication={authentication}
            navigation={props.user ? navigation : []}
            branding={{
                logo: <img src={logo} />,
                title: 'react-redux-flask-oauth-starter',
                homeUrl: '/home',
            }}
            router={router}
            theme={demoTheme}
        >
            <DashboardLayout hideNavigation={props.user ? false : true}>
                <Outlet />
            </DashboardLayout>
        </AppProvider>
    );
}

LayoutComponent.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout: logout
    }, dispatch);
};

const Layout = connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutComponent);

export default Layout;
