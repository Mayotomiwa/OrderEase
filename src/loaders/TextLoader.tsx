import ContentLoader from 'react-content-loader'

const TextLoader = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={60}
        viewBox="0 0 400 60"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="10" y="10" rx="5" ry="5" width="30" height="30" />
        <rect x="50" y="15" rx="5" ry="5" width="100" height="10" />
        <rect x="50" y="35" rx="5" ry="5" width="200" height="15" />
    </ContentLoader>
)

export default TextLoader
