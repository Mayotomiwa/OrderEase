import { Button, Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import WishItems from '../component/WishListComponents/WishItems'
import { useWish } from '../contexts/WishContext'
import '../css/Cart.css'

export default function WishList() {
    const navigate = useNavigate();
    const { wishItems } = useWish();



    function handleChange() {
        navigate("/")
    }
    return (
        <Container>
            <main className="main main--cart">
                <h2 className="cart">WishList</h2>
                {wishItems && wishItems.length === 0 ? (
                    <>
                        <div className='w-70 form-text d-flex justify-content-center'>
                            <Card className='mb-4 p-5 w-100'>
                                <Card.Header className='textFont' style={{ backgroundColor: '#fff' }}>No Items In Wish List Yet</Card.Header>
                                <Card.Body>
                                    <Card.Title className='textFont'>Click the button below to Add</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                        <Button variant='danger' style={{ width: '20%' }} className='p-3' onClick={handleChange}>
                            Home
                        </Button>
                    </>
                ) : (
                    <>
                        <div className="cart">
                            {wishItems && wishItems.map(item => (
                                <WishItems key={item.id} {...item} />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </Container>
    )

}
