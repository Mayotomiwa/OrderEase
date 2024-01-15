import ContentLoader from 'react-content-loader';

const SwiperLoader = () => (
    <ContentLoader
        speed={2}
        width={1200}
        height={560}
        viewBox="0 0 800 560"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="30" y="20" rx="10" ry="10" width="840" height="500" />
        <rect x="30" y="340" rx="5" ry="5" width="340" height="20" />
        <rect x="30" y="370" rx="5" ry="5" width="100" height="20" />
        <rect x="30" y="400" rx="5" ry="5" width="200" height="40" />
    </ContentLoader>
)

export default SwiperLoader;