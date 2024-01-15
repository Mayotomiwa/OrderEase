import ContentLoader from 'react-content-loader';

const ResetLoader = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={300}
        viewBox="0 0 400 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="15" y="15" rx="4" ry="4" width="370" height="30" />
        <rect x="15" y="70" rx="3" ry="3" width="370" height="20" />
        <rect x="15" y="120" rx="3" ry="3" width="370" height="20" />
        <rect x="15" y="170" rx="4" ry="4" width="370" height="50" />
        <rect x="15" y="240" rx="4" ry="4" width="370" height="50" />
    </ContentLoader>
)

export default ResetLoader;
