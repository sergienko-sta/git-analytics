import { useTranslation } from 'react-i18next';
import { Col, Row, Space, Tag, Typography } from 'antd';

import * as Hooks from '../hooks';

import * as Styles from './architecture-points.styles';

const { Title, Paragraph } = Typography;

export const ArchitecturePoints = () => {
    const { t } = useTranslation('widgets');
    const architecturePoints = Hooks.UseArchitecturePoints();

    return (
        <Styles.Container>
            <Styles.SectionTitle>
                <Title level={2}>{t('architecture-points.section.title')}</Title>
                <Paragraph type='secondary'>
                    {t('architecture-points.section.description')}
                </Paragraph>
            </Styles.SectionTitle>

            <Row gutter={[24, 24]}>
                {architecturePoints.map((point) => (
                    <Col xs={24} md={12} key={point.id}>
                        <Styles.ArchCard>
                            <Styles.CardIcon>{point.icon}</Styles.CardIcon>
                            <Title level={4}>{point.title}</Title>
                            <Paragraph type='secondary'>{point.description}</Paragraph>
                            <Space wrap>
                                {point.highlights.map((highlight, idx) => (
                                    <Tag key={`${point.key}-${idx}`} color='processing'>
                                        {highlight}
                                    </Tag>
                                ))}
                            </Space>
                        </Styles.ArchCard>
                    </Col>
                ))}
            </Row>
        </Styles.Container>
    );
};
