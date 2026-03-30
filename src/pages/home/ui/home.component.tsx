import * as Widgets from '@widgets';

export const HomePage = () => {
    return (
        <Widgets.PageContainer>
            <Widgets.HeroBanner />
            <Widgets.FeaturePoints />
            <Widgets.ArchitecturePoints />
        </Widgets.PageContainer>
    );
};
