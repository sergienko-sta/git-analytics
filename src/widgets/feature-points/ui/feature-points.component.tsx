import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Typography } from 'antd';

import * as Shared from '@shared';

import * as Hooks from '../hooks';

import * as Styles from './feature-points.styles';

const { Title, Paragraph } = Typography;

export const FeaturePoints = memo(() => {
    const { t } = useTranslation('widgets');
    const features = Hooks.UseFeaturePoints();
    const appName = Shared.APP_LOGO_NAME;

    return (
        <Styles.Container>
            <Styles.SectionTitle>
                <Title level={2}>{t('feature-points.section.title', { appName })}</Title>
                <Paragraph type='secondary'>
                    <Title level={4}>{t('feature-points.section.description')}</Title>
                </Paragraph>
            </Styles.SectionTitle>

            <Row gutter={[24, 24]}>
                {features.map((feature, index) => (
                    <Col xs={24} sm={12} lg={6} key={feature.id}>
                        <Styles.FeatureCard
                            $color={feature.color}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <Styles.IconWrapper $color={feature.color}>
                                {feature.icon}
                            </Styles.IconWrapper>
                            <Title level={4} style={{ margin: '20px 0 12px' }}>
                                {feature.title}
                            </Title>
                            <Paragraph type='secondary' style={{ margin: 0 }}>
                                {feature.description}
                            </Paragraph>
                        </Styles.FeatureCard>
                    </Col>
                ))}
            </Row>
        </Styles.Container>
    );
});
