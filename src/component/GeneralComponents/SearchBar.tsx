import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../css/NavBar.css';
import { fetchAllProducts } from '../../data/APIs';
import Search from '../../icons/search';
import { Product } from '../../types/Products';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchProducts, setSearchProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const navigate = useNavigate()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const filtered = searchProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        const getAllProducts = async () => {
            const data = await fetchAllProducts();
            setSearchProducts(data);
        };

        getAllProducts();
    }, []);

    return (
        <>
            <Form onSubmit={handleSubmit} className='search-form'>
                <Form.Control className='search' type="text" value={searchTerm} onChange={handleChange} style={{
                    width: '100%', paddingRight: '10rem', padding: '0.6rem',
                    borderRadius: '0.5rem', borderWidth: '0px'
                }} placeholder='What are you looking for?' />
                <Button type='submit' style={{ position: 'absolute', right: '10px', bottom: '3px' }} variant='outlined-primary'>
                    <Search />
                </Button>
                {searchTerm && (
                    <Button type='button' onClick={() => { setSearchTerm(''); setFilteredProducts([]); }} style={{ position: 'absolute', right: '60px', bottom: '3px' }} variant='outlined-primary'>
                        Cancel
                    </Button>
                )}
            </Form>

            <ListGroup className='search-results'>
                {filteredProducts.map(product => (
                    <ListGroup.Item action
                        onClick={() => {
                            navigate(`/products/${product.id}`);
                            setSearchTerm('');
                            setFilteredProducts([]);
                        }}
                        key={product.id}>
                        {product.title}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );

};