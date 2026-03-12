export interface IRepositoryPageProps {
    title?: string;
}

export const RepositoryPage = ({ title = 'Test Page' }: IRepositoryPageProps) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>This is a stub repository page</p>
        </div>
    );
};
