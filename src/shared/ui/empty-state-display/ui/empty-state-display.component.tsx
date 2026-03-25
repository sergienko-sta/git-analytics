import { memo } from 'react';
import { Typography } from 'antd';

import type * as Model from '../model';

import * as Styles from './empty-state-display.styles';

const { Text } = Typography;

export const EmptyStateDisplay = memo(
    ({ message = '', icon, description, action }: Model.IEmptyStateDisplayProps) => {
        return (
            <Styles.Container>
                {icon && <Styles.IconWrapper>{icon}</Styles.IconWrapper>}
                <Text type='secondary'>{message}</Text>
                {description && (
                    <Styles.Description type='secondary'>{description}</Styles.Description>
                )}
                {action && <Styles.ActionWrapper>{action}</Styles.ActionWrapper>}
            </Styles.Container>
        );
    },
);
