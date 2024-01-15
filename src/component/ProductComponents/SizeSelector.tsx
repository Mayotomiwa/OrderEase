import { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';

function SizeSelector() {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    return (
        <Stack direction='horizontal' gap={3} className='mt-4 mb-4'>
            <h6>Size:</h6>
            {sizes.map((size) => (
                <Button
                    variant='outline-danger'
                    onClick={() => setSelectedSize(size)}
                    active={selectedSize === size}
                >
                    {size}
                </Button>
            ))}
        </Stack>
    );
}

export default SizeSelector;
