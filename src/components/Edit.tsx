import { useEffect, useState } from 'react';
import NavbarMenu from './NavbarMenu'
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();

    // create state manage form
    const [formEdit, setFormEdit] = useState({
        productName: '',
        type: '',
        price: 0
    });

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('anonymous') || '[]');

        if (id) {
            const selectedProduct = storedProducts[parseInt(id, 10)];

            // set data
            if (selectedProduct) {
                setFormEdit({
                    productName: selectedProduct.productName,
                    type: selectedProduct.type,
                    price: selectedProduct.price
                });
            }
        }
    }, [])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormEdit((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const editProduct = (e: any) => {
        e.preventDefault(); // don't refresh page

        const currectData = JSON.parse(localStorage.getItem('anonymous') || '[]');

        currectData[parseInt(id as string, 10)] = formEdit;
        localStorage.setItem('anonymous', JSON.stringify(currectData));

        alert('Product saved!');

        navigate('/');
    }

    return (
        <>
            <NavbarMenu />
            <div className="container">
                <h3 className='text-center my-4'>Edit Product</h3>

                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={editProduct}>
                                    <div className="form-group mb-2">
                                        <label htmlFor="name">Product name</label>
                                        <input type="text" className='form-control' name='productName' value={formEdit.productName} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="name">Type</label>
                                        <select id="" className='form-control' name='type' value={formEdit.type} onChange={handleChange}>
                                            <option value="" disabled>Select Type</option>
                                            <option value="Kitchenware">Kitchenware</option>
                                            <option value="Bath accessories">Bath accessories</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="name">Price</label>
                                        <input type="number" className='form-control' min={0} name='price' value={formEdit.price} onChange={handleChange} required />
                                    </div>

                                    <div className="d-flex justify-content-around flex-wrap">
                                        <button type='submit' className='btn btn-outline-primary w-100 my-2'>Edit</button>
                                        <Link to='/' className='w-100'>
                                            <button type='button' className='btn btn-outline-secondary w-100 my-2'>Back</button>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Edit