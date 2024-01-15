import ContentLoader from 'react-content-loader'

const ImageLoader = () => (
    <ContentLoader
        speed={2}
        width={1000}
        height={500}
        viewBox="0 0 1000 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="50" y="50" rx="10" ry="10" width="1000" height="500" />
    </ContentLoader>
)

export default ImageLoader
