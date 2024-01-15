import ContentLoader from 'react-content-loader'

const NavbarLoader = () => (
    <ContentLoader
        speed={2}
        width={1800}
        height={80}
        viewBox="0 0 1200 60"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="20" y="15" rx="5" ry="5" width="200" height="50" />
        <rect x="150" y="15" rx="5" ry="5" width="100" height="50" />
        <rect x="220" y="15" rx="5" ry="5" width="60" height="50" />
        <rect x="310" y="15" rx="5" ry="5" width="120" height="50" />
        <rect x="420" y="15" rx="5" ry="5" width="120" height="50" />
        <rect x="600" y="15" rx="5" ry="5" width="300" height="50" />
        <rect x="850" y="15" rx="5" ry="5" width="50" height="50" />
        <rect x="900" y="15" rx="5" ry="5" width="50" height="50" />
        <rect x="950" y="15" rx="5" ry="5" width="50" height="50" />
    </ContentLoader>
)

export default NavbarLoader
