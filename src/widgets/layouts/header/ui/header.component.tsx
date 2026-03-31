import { Button } from 'antd';

import * as Widgets from '@widgets';

import * as Shared from '@shared';

import * as Hooks from '../hooks';
import type * as Model from '../model';

import * as Styles from './header.styles';

export const Header = ({ rightContent }: Model.IHeaderProps) => {
    const { themeButtonConfig, handleThemeToggle } = Hooks.useHeader();
    const { activeTab, handleLogoClick, handleTabChange } = Hooks.useNavigation();

    return (
        <Styles.Header>
            <Styles.LeftSection>
                <Styles.Logo onClick={handleLogoClick}>{Shared.APP_LOGO_NAME}</Styles.Logo>
            </Styles.LeftSection>

            <Widgets.NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />

            <Styles.RightSection>
                <Button
                    type='text'
                    icon={themeButtonConfig.icon}
                    onClick={handleThemeToggle}
                    title={themeButtonConfig.title}
                />
                {rightContent}
            </Styles.RightSection>
        </Styles.Header>
    );
};
