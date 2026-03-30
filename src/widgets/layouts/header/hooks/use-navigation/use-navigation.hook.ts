import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import * as Shared from '@shared';

import type * as Types from './use-navigation.types';

export const useNavigation: Types.TUseNavigation = () => {
    const { to } = Shared.useAppNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(
        () =>
            Shared.navigationService.getKeyByPath(Shared.getFirstPathSegment(location.pathname)) ??
            Shared.navigationService.getDefaultKey(),
    );

    useEffect(() => {
        const currentPathKey = Shared.navigationService.getKeyByPath(
            Shared.getFirstPathSegment(location.pathname),
        );

        if (currentPathKey) {
            setActiveTab((prevTab) => {
                return prevTab !== currentPathKey ? currentPathKey : prevTab;
            });
        }
    }, [location.pathname]);

    const handleTabChange = useCallback(
        (key: Shared.EAppRoutes) => {
            const tab = Shared.navigationService.getItemByKey(key);

            if (tab) {
                setActiveTab((prev) => {
                    if (prev !== tab.key) {
                        to(tab.key, {});
                        return tab.key;
                    }
                    return prev;
                });
            }
        },
        [to],
    );

    const handleLogoClick = useCallback(() => {
        const currentPath = Shared.navigationService.getKeyByPath(
            Shared.getFirstPathSegment(location.pathname),
        );

        if (currentPath && !Shared.navigationService.isHomeKey(currentPath)) {
            to(Shared.navigationService.getDefaultKey(), {});
        }
    }, [to, location.pathname]);

    return {
        activeTab,
        handleTabChange,
        handleLogoClick,
    };
};
