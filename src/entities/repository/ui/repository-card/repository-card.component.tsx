import { Card, Space, Typography } from 'antd';

import type * as Model from '../../model';

const { Text } = Typography;

export const RepositoryCard = ({ repository, footer }: Model.IRepositoryCardProps) => {
    return (
        <Card
            key={repository.id}
            hoverable
            onClick={() => window.open(repository.html_url, '_blank', 'noopener noreferrer')}
        >
            <Card.Meta
                title={
                    <Space orientation='vertical' size={0}>
                        <Text strong>{repository.full_name}</Text>
                    </Space>
                }
                description={
                    <>
                        {repository.description && (
                            <Text type='secondary'>{repository.description}</Text>
                        )}
                    </>
                }
            />
            {footer}
        </Card>
    );
};
