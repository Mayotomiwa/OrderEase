import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { BulletList } from "react-content-loader";
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import { fetchCategories, fetchProducts } from "../../data/APIs";
import { Product } from '../../types/Products';

export default function Categories() {

    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<{ [key: string]: Product[] }>({});
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
            setLoading(false);
        };
    
        getCategories();
    }, []);

    const handleCategoryClick = async (category: string) => {
        if (activeCategory === category) {
            setActiveCategory(null);
        } else {
            setActiveCategory(category);
            if (!products[category]) {
                const data = await fetchProducts(category);
                setProducts(prevProducts => ({ ...prevProducts, [category]: data }));
            }
        }
    };

    return (
        <Container fluid className="col-lg-12 col-md-0 mb-4 mt-4">
            {!loading ? (
                <div>
                    {categories.map((category: string, index: number) => (
                        <div key={index}>
                            <Button variant="text" className="categoryButton" style={{ justifyContent: "space-between", textAlign: "center", display: 'flex', alignItems: 'center' }} onClick={() => handleCategoryClick(category)}>
                                {category}
                                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                    {activeCategory === category ? <FaCaretDown /> : <FaCaretRight />}
                                </span>
                            </Button>

                            {activeCategory === category && products[category] && (
                                <div>
                                    {products[category].map((item, index) => (
                                        <div key={index} className="categories">
                                            <li className="categoriesItems">{item.title}</li>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <BulletList />
            )

            }
        </Container>
    )
}
