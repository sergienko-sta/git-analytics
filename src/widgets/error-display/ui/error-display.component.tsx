import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'antd';

import type * as Model from '../model';

import * as Styles from './error-display.styles';

export const ErrorDisplay = memo(
    ({ error, title: customTitle, onRetry }: Model.IErrorDisplayProps) => {
        const { t } = useTranslation('widgets');

        if (!error) return null;

        const title = customTitle ?? t('error-display.default-title');

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
    },
);
