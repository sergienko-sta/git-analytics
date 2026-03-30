import { useTranslation } from 'react-i18next';
import { ExperimentOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Typography } from 'antd';

import * as Shared from '@shared';

import * as Styles from './repository-page.styles';

const { Title, Paragraph, Text } = Typography;

export const RepositoryPage = () => {
    const { t } = useTranslation('pages');
    const { to } = Shared.useAppNavigate();

    const handleGoToPagination = () => {
        to(Shared.EAppRoutes.REPOSITORY_PAGINATION, {});
    };

    const handleGoToInfinite = () => {
        to(Shared.EAppRoutes.REPOSITORY_INFINITE, {});
    };

    return (
        <Styles.Container>
            <Styles.Header>
                <Title level={1}>
                    <ExperimentOutlined /> {t('repository-page.title')}
                </Title>
                <Paragraph>
                    <Title level={4}>{t('repository-page.description')}</Title>
                </Paragraph>
            </Styles.Header>

            <Styles.RecommendationSection>
                <Title level={3}>{t('repository-page.recommendations.title')}</Title>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        <Card
                            title={t('repository-page.pagination.title')}
                            size='small'
                            actions={[
                                <Button
                                    key='pagination-action'
                                    type='link'
                                    icon={<RightOutlined />}
                                    onClick={handleGoToPagination}
                                >
                                    {t('repository-page.pagination.action')}
                                </Button>,
                            ]}
                        >
                            <ul>
                                {t('repository-page.pagination.features', {
                                    returnObjects: true,
                                }).map((feature: string, index: number) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card
                            title={t('repository-page.infiniteScroll.title')}
                            size='small'
                            actions={[
                                <Button
                                    key='infinite-action'
                                    type='link'
                                    icon={<RightOutlined />}
                                    onClick={handleGoToInfinite}
                                >
                                    {t('repository-page.infiniteScroll.action')}
                                </Button>,
                            ]}
                        >
                            <ul>
                                {t('repository-page.infiniteScroll.features', {
                                    returnObjects: true,
                                }).map((feature: string, index: number) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </Card>
                    </Col>
                </Row>
            </Styles.RecommendationSection>

            <Styles.TechDetailsSection>
                <Title level={3}>{t('repository-page.technicalDetails.title')}</Title>
                <Card>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Text strong>
                                {t('repository-page.technicalDetails.pagination.title')}
                            </Text>
                            <ul>
                                {t('repository-page.technicalDetails.pagination.items', {
                                    returnObjects: true,
                                }).map((item: string, index: number) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                            <Button
                                type='primary'
                                onClick={handleGoToPagination}
                                style={{ marginTop: 16 }}
                            >
                                {t('repository-page.pagination.try')}
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Text strong>
                                {t('repository-page.technicalDetails.infiniteScroll.title')}
                            </Text>
                            <ul>
                                {t('repository-page.technicalDetails.infiniteScroll.items', {
                                    returnObjects: true,
                                }).map((item: string, index: number) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                            <Button
                                type='primary'
                                onClick={handleGoToInfinite}
                                style={{ marginTop: 16 }}
                            >
                                {t('repository-page.infiniteScroll.try')}
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Styles.TechDetailsSection>
        </Styles.Container>
    );
};
