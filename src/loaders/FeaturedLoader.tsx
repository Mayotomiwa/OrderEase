import { Container, Stack } from 'react-bootstrap'
import ContentLoader from 'react-content-loader'

const ProductAdLoader = () => (
    <Container className='d-flex justify-content-center align-content-center align-items-center'>
        <Stack direction='horizontal'>
            <ContentLoader
                speed={2}
                width={400}
                height={560}
                viewBox="0 0 400 560"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="30" y="20" rx="10" ry="10" width="340" height="400" />
            </ContentLoader>
            <>
                <Stack>
                    <ContentLoader
                        speed={2}
                        width={400}
                        height={230}
                        viewBox="0 0 400 230"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="30" y="20" rx="10" ry="10" width="340" height="300" />
                    </ContentLoader>
                    <Stack direction='horizontal' className='ms-4'>
                    <ContentLoader
                        speed={2}
                        width={200}
                        height={230}
                        viewBox="0 0 400 230"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="30" y="20" rx="10" ry="10" width="200" height="300" />
                    </ContentLoader>
                    <ContentLoader
                        speed={2}
                        width={200}
                        height={230}
                        viewBox="0 0 400 230"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="30" y="20" rx="10" ry="10" width="200" height="300" />
                    </ContentLoader>
                    </Stack>
                </Stack>
            </>
        </Stack>
    </Container>

)

export default ProductAdLoader
