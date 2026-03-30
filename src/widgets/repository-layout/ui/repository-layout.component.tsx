import { Outlet } from 'react-router-dom';
import { Tabs } from 'antd';

import * as Hooks from '../hooks';

import * as Styles from './repository-layout.styles';

export const RepositoryLayout = () => {
    const { tabItems, getActiveKey, handleTabChange } = Hooks.useRepositoryNavigation();

    return (
        <Styles.Container>
            <Tabs activeKey={getActiveKey()} onChange={handleTabChange} items={tabItems} />
            <Outlet />
        </Styles.Container>
    );
};
