import ContentLoader from 'react-content-loader'

const TextContentLoader = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="10" y="10" rx="5" ry="5" width="100" height="20" />
        <rect x="10" y="40" rx="5" ry="5" width="380" height="15" />
        <rect x="10" y="65" rx="5" ry="5" width="380" height="15" />
        <rect x="10" y="90" rx="5" ry="5" width="380" height="15" />
        <rect x="10" y="115" rx="5" ry="5" width="380" height="15" />
        <rect x="10" y="140" rx="5" ry="5" width="380" height="15" />
    </ContentLoader>
)

export default TextContentLoader
