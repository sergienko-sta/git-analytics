import { memo } from 'react';
import { Alert } from 'antd';

import type * as Model from '../model';

import * as Styles from './error-display.styles';

export const ErrorDisplay = memo(({ error, title = '', onRetry }: Model.IErrorDisplayProps) => {
    if (!error) return null;

    return (
        <Styles.ErrorContainer>
            <Alert
                type='error'
                title={title}
                description={error.message}
                showIcon
                closable={{ closeIcon: true, onClose: onRetry }}
            />
        </Styles.ErrorContainer>
    );
});
