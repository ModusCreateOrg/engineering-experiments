import { Routes, Route, NavLink } from 'react-router-dom';

import GeneralChannelPage from './GeneralChannelPage';
import RandomChannelPage from './RandomChannelPage';



const ChannelsPage = ({ username }) => {
    return (
        <div className="layout">
            <nav className="navigation">
                <div className="menu">
                    <NavLink to="general"
                             className={({ isActive }) => `menu__item ${isActive ? 'menu__item--active' : null}`}>
                        #general
                    </NavLink>
                    <NavLink to="random"
                             className={({ isActive }) => `menu__item ${isActive ? 'menu__item--active' : null}`}>
                        #random
                    </NavLink>
                </div>
            </nav>

            <div className="content">
                <Routes>
                    <Route path="general" element={<GeneralChannelPage username={username} />} />
                    <Route path="random" element={<RandomChannelPage username={username} />} />
                </Routes>
            </div>
        </div>
    );
};

export default ChannelsPage;
