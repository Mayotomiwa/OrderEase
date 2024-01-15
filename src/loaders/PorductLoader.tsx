import ContentLoader from 'react-content-loader'

const ProductLoader = () => (
    <ContentLoader
        speed={2}
        width={500}
        height={460}
        viewBox="0 0 500 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="15" y="15" rx="4" ry="4" width="470" height="30" />
        <rect x="15" y="70" rx="3" ry="3" width="370" height="20" />
        <rect x="15" y="120" rx="3" ry="3" width="370" height="20" />
        <rect x="15" y="170" rx="3" ry="3" width="370" height="20" />
        <rect x="15" y="220" rx="3" ry="3" width="370" height="20" />
        <rect x="15" y="270" rx="4" ry="4" width="370" height="50" />
        <rect x="15" y="340" rx="4" ry="4" width="370" height="50" />
        <rect x="15" y="410" rx="0" ry="0" width="200" height="15" />
    </ContentLoader>
)

export default ProductLoader
