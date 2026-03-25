import { memo } from 'react';
import { Spin } from 'antd';

import type * as Model from '../model';

import * as Styles from './loading-display.styles';

export const LoadingDisplay = memo(
    ({ description = '', size = 'large', fullScreen = false }: Model.ILoadingDisplayProps) => {
        const Container = fullScreen ? Styles.FullScreenContainer : Styles.Container;

        return (
            <Container>
                <Spin size={size} description={description} />
            </Container>
        );
    },
);
