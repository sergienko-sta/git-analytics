import { memo } from 'react';
import { Typography } from 'antd';

import type * as Model from '../model';

import * as Styles from './end-of-list-display.styles';

const { Text } = Typography;

export const EndOfListDisplay = memo(({ message = '', icon }: Model.IEndOfListMessageProps) => {
    return (
        <Styles.Container>
            {icon && <Styles.IconWrapper>{icon}</Styles.IconWrapper>}
            <Text type='secondary'>{message}</Text>
        </Styles.Container>
    );
});
