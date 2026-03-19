import { Typography } from 'antd';

import type * as Model from '../model';

import * as Styles from './page-container.styles';

const { Title } = Typography;

export const PageContainer = ({ title, children }: Model.IPageContainerProps) => {
    return (
        <Styles.Container>
            <Styles.Header>
                <Title level={2}>{title}</Title>
            </Styles.Header>
            {children}
        </Styles.Container>
    );
};
