import { useEffect, useState } from 'react'
import NavbarMenu from './NavbarMenu';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slice/CartSlice';
import { RootState } from '../redux/store/store';

function ManageProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);

    // load data when open page
    useEffect(() => {
        const storedProducts = localStorage.getItem('anonymous');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }

    }, [cart]);

    const deleteProduct = (index: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete product?');
        if (isConfirmed) {
            const currentData = JSON.parse(localStorage.getItem('anonymous') || '[]');
            currentData.splice(index, 1);
            localStorage.setItem('anonymous', JSON.stringify(currentData));

            alert('Product deleted successfully!');
            setProducts(currentData);
        }
    };

    const exportFileCSV = () => {
        const rows = [];

        rows.push(['#', 'Name', 'Type', 'Price']);

        products.forEach((product, index) => {
            rows.push([index + 1, product.productName, product.type, product.price]);
        });

        const csvString = rows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);
        link.download = 'product.csv';
        link.click();
    }

    const handleToCart = (product: Product) => { // add to cart
        dispatch(addToCart(product));
    }

    return (
        <>
            <NavbarMenu />
            <div className="container-fluid">
                <h3 className="text-center my-4">Product</h3>
                <div className="d-flex justify-content-end w-100">
                    <button
                        className="btn btn-outline-success btn-sm my-4 mx-2"
                        onClick={exportFileCSV}
                        disabled={products.length === 0}
                    >
                        Export CSV
                    </button>
                    <button
                        className="btn btn-outline-primary btn-sm my-4 mx-2"
                        onClick={() => navigate(`/create`)}
                    >
                        Create Product
                    </button>
                </div>
                <Table responsive className="text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.type}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-outline-success btn-sm mx-2"
                                            onClick={() => handleToCart(product)}
                                        >
                                            Add To Cart
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-warning btn-sm mx-2"
                                            onClick={() => navigate(`/edit/${index}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm mx-2"
                                            onClick={() => deleteProduct(index)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>No products available.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ManageProduct

interface Product {
    productName: string;
    type: string;
    price: number;
    quantity: number;
}