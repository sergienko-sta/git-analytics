import { CodeOutlined, ForkOutlined, StarOutlined } from '@ant-design/icons';
import { Space, Statistic, Tag } from 'antd';

import type * as Model from '../../model';

export const RepositoryStatistic = ({ repository }: Model.IRepositoryStatisticProps) => {
    return (
        <Space size='large'>
            <Statistic
                value={repository.stargazers_count}
                prefix={<StarOutlined />}
                styles={{ content: { fontSize: 14 } }}
            />
            <Statistic
                value={repository.forks_count}
                prefix={<ForkOutlined />}
                styles={{ content: { fontSize: 14 } }}
            />
            {repository.language && (
                <Tag icon={<CodeOutlined />} color='blue'>
                    {repository.language}
                </Tag>
            )}
        </Space>
    );
};
