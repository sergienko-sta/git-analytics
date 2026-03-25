import type * as Shared from '@shared';

import type ruWidgets from '../../../../public/locales/ru/widgets.json';

type WidgetsResource = (typeof ruWidgets)['repository-layout'];
type WidgetsKeys = Shared.Types.NestedKeyOf<WidgetsResource>;

export interface TabConfig {
    key: string;
    route: Shared.EAppRoutes;
    translationKey: WidgetsKeys;
    check: (path: string) => boolean;
}
