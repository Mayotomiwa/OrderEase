import ContentLoader from 'react-content-loader'

const FooterLoader = () => (
    <ContentLoader
        speed={2}
        width={1800}
        height={200}
        viewBox="0 0 1200 200"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="20" y="20" rx="5" ry="5" width="200" height="15" />
        <rect x="20" y="50" rx="5" ry="5" width="300" height="10" />
        <rect x="20" y="70" rx="5" ry="5" width="200" height="10" />

        <rect x="250" y="20" rx="5" ry="5" width="200" height="15" />
        <rect x="250" y="50" rx="5" ry="5" width="300" height="10" />
        <rect x="250" y="70" rx="5" ry="5" width="200" height="10" />

        <rect x="480" y="20" rx="5" ry="5" width="200" height="15" />
        <rect x="480" y="50" rx="5" ry="5" width="300" height="10" />
        <rect x="480" y="70" rx="5" ry="5" width="200" height="10" />

        <rect x="710" y="20" rx="5" ry="5" width="200" height="15" />
        <rect x="710" y="50" rx="5" ry="5" width="300" height="10" />
        <rect x="710" y="70" rx="5" ry="5" width="200" height="10" />

        <rect x="940" y="20" rx="5" ry="5" width="200" height="15" />
        <rect x="940" y="50" rx="5" ry="5" width="300" height="10" />
        <rect x="940" y="70" rx="5" ry="5" width="200" height="10" />

        <rect x="20" y="150" rx="5" ry="5" width="400" height="10" />
        <rect x="20" y="170" rx="5" ry="5" width="200" height="10" />
    </ContentLoader>
)

export default FooterLoader
