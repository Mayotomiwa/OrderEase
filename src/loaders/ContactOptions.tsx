import ContentLoader from 'react-content-loader'

const ContactOptionsLoader = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="10" y="10" rx="5" ry="5" width="30" height="30" />
        <rect x="50" y="10" rx="5" ry="5" width="200" height="15" />
        <rect x="50" y="30" rx="5" ry="5" width="300" height="10" />

        <rect x="10" y="60" rx="5" ry="5" width="30" height="30" />
        <rect x="50" y="60" rx="5" ry="5" width="200" height="15" />
        <rect x="50" y="80" rx="5" ry="5" width="300" height="10" />
    </ContentLoader>
)

export default ContactOptionsLoader
