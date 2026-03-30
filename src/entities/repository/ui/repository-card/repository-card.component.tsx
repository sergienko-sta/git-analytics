import { Card, Space, Typography } from 'antd';

import type * as Model from '../../model';

import { useStyles } from './repository-card.styles';

const { Text } = Typography;

export const RepositoryCard = ({ repository, footer }: Model.IRepositoryCardProps) => {
    const { styles } = useStyles();
    return (
        <Card
            key={repository.id}
            className={styles.card}
            hoverable
            onClick={() => window.open(repository.html_url, '_blank', 'noopener noreferrer')}
        >
            <Card.Meta
                title={
                    <Space orientation='vertical' size={0}>
                        <Text strong className={styles.metaTitle}>
                            {repository.full_name}
                        </Text>
                    </Space>
                }
                description={
                    <>
                        {repository.description && (
                            <Text type='secondary' className={styles.metaDescription}>
                                {repository.description}
                            </Text>
                        )}
                    </>
                }
            />
            {footer}
        </Card>
    );
};
