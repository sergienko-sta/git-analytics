import { Flex, Space, Tag } from 'antd';

import * as Entities from '@entities';

import type * as Model from '../model';

export const SearchReposResult = ({ data }: Model.ISearchResultProps) => {
    return (
        <Space orientation='vertical' size='middle' style={{ width: '100%' }}>
            {data?.items.map((repo) => (
                <Entities.RepositoryCard
                    repository={repo}
                    key={repo.id}
                    footer={
                        <Flex vertical gap={4} style={{ marginTop: 16 }}>
                            {<Entities.RepositoryStatistic repository={repo} />}
                            {repo.topics && repo.topics.length > 0 && (
                                <Flex gap='small' style={{ marginTop: 8 }}>
                                    {repo.topics.slice(0, 5).map((topic) => (
                                        <Tag key={topic}>{topic}</Tag>
                                    ))}
                                </Flex>
                            )}
                        </Flex>
                    }
                />
            ))}
        </Space>
    );
};
