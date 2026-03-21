import { useTranslation } from 'react-i18next';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';

import * as Shared from '@shared';

import * as Styles from './hero-banner.styles';

const { Title } = Typography;

export const HeroBanner = () => {
    const navigate = Shared.useAppNavigate();
    const { t } = useTranslation('widgets');

    return (
        <Styles.BannerContainer>
            <Title level={1}>
                {Shared.APP_LOGO_NAME} {t('hero-banner.title')}
            </Title>
            <Title level={4} style={Styles.description}>
                {t('hero-banner.description')}
            </Title>
            <Space>
                <Button
                    type='primary'
                    icon={<SearchOutlined />}
                    size='large'
                    onClick={() => navigate.to(Shared.EAppRoutes.REPOSITORY, {})}
                >
                    {t('hero-banner.search-now-btn')}
                </Button>
            </Space>
        </Styles.BannerContainer>
    );
};
