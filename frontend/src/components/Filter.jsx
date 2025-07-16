import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap/'
import { FaFilter } from 'react-icons/fa';
import '../App.css'

function Filter({ price, setPrice, rating, setRating, category, setCategory }) {
    let minPrice = 50;
    let maxPrice = 10000;
    const priceRanges = {
        beauty: [500, 10500],
        fragrances: [500, 15000],
        groceries: [50, 1500],
        furniture: [10000, 200000],
    };
    if (category.length == 1) {
        const [min, max] = priceRanges[category[0]] || [50, 10000];
        minPrice = min;
        maxPrice = max;
    } else if (category.length > 1) {
        let minList = [];
        let maxList = [];
        category.forEach((cat) => {
            const [min, max] = priceRanges[cat] || [50, 10000];
            minList.push(min);
            maxList.push(max);
        });
        minPrice = Math.min(...minList);
        maxPrice = Math.max(...maxList);
    }
    useEffect(() => {
        setPrice(maxPrice); // or any default you prefer
    }, [category, maxPrice, setPrice]);

    const clearFilter = () => {
        setPrice(5000)
        setCategory([])
        setRating(5);
    }
    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            // ADD the value to the array
            setCategory([...category, value]);
        } else {
            // REMOVE the unchecked value from the array
            setCategory(category.filter((item) => item !== value));
        }
    }

    return (
        <>
            <h4 className="mb-3">
                <FaFilter className="me-2" />
                Filter Products
            </h4>
            <Form className="">
                <Form.Group controlId="categoryChecklist" className="mb-3">
                    <Form.Label><strong>Category</strong></Form.Label>

                    <div>
                        <Form.Check
                            type="checkbox"
                            label="Beauty"
                            value="beauty"
                            checked={category.includes("beauty")}
                            onChange={(e) => handleCheckboxChange(e)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Fragrances"
                            value="fragrances"
                            checked={category.includes("fragrances")}
                            onChange={(e) => handleCheckboxChange(e)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Groceries"
                            value="groceries"
                            checked={category.includes("groceries")}
                            onChange={(e) => handleCheckboxChange(e)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Furniture"
                            value="furniture"
                            checked={category.includes("furniture")}
                            onChange={(e) => handleCheckboxChange(e)}
                        />
                    </div>
                </Form.Group>

                {/* Price Range Slider */}
                <Form.Group controlId="priceRange" className="mb-3">
                    <Form.Label><strong>Price Range</strong></Form.Label>
                    <div className="d-flex justify-content-between mb-1">
                        <span>₹{minPrice}</span>
                        <span>₹{price}</span>
                    </div>
                    <Form.Range
                        min={minPrice}
                        max={maxPrice}
                        step={50}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="d-flex justify-content-between mt-2 px-1 text-muted" style={{ fontSize: '0.85rem' }}>
                        {[minPrice, (minPrice + maxPrice) / 4, (minPrice + maxPrice) / 2, (3 * (minPrice + maxPrice)) / 4, maxPrice].map((val, i) => (
                            <span key={i}>₹{Math.round(val / 1000) >= 1 ? `${Math.round(val / 1000)}k` : Math.round(val)}</span>
                        ))}
                    </div>
                </Form.Group>

                {/* Rating slider */}
                <Form.Group controlId="ratingSlider" className="mb-3">
                    <Form.Label><strong>Minimum Rating: {rating} ⭐</strong></Form.Label>
                    <Form.Range
                        min={1}
                        max={5}
                        step={1}
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                    <div className="d-flex justify-content-between text-muted px-1" style={{ fontSize: '0.85rem' }}>
                        {[1, 2, 3, 4, 5].map((val) => (
                            <span key={val}>{val}</span>
                        ))}
                    </div>
                </Form.Group>

                {/* 🏷️ Brand Dropdown */}
                <div className="text-center mt-3 border-top pt-2">
                    {/* <Button variant="success" className="me-3" onClick={handleApply}>
                        Apply Filters
                    </Button> */}
                    <Button className='clear-btn' variant="danger" onClick={clearFilter}>
                        Clear Filters
                    </Button>
                </div>

            </Form>
        </>
    )
}

export default Filter