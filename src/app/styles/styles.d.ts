import type { theme } from 'antd';

import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        designTokens: ReturnType<typeof theme.useToken>['token'];
    }
}
