import ContentLoader from 'react-content-loader'

const ContactFormLoader = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="10" y="10" rx="5" ry="5" width="120" height="20" />
        <rect x="140" y="10" rx="5" ry="5" width="120" height="20" />
        <rect x="270" y="10" rx="5" ry="5" width="120" height="20" />
        <rect x="10" y="40" rx="5" ry="5" width="380" height="80" />
        <rect x="150" y="130" rx="5" ry="5" width="100" height="20" />
    </ContentLoader>
)

export default ContactFormLoader
