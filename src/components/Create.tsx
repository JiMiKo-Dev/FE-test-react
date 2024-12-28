import { Link, useNavigate } from 'react-router-dom'
import NavbarMenu from './NavbarMenu'
import { useState } from 'react'

function Create() {

    const navigate = useNavigate();

    // create state manage form
    const [formCreate, setFormCreate] = useState({
        productName: '',
        type: '',
        price: 0
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormCreate((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const createProduct = (e: any) => {
        e.preventDefault(); // don't refresh page

        const currectData = JSON.parse(localStorage.getItem('anonymous') || '[]');

        currectData.push(formCreate)
        localStorage.setItem('anonymous', JSON.stringify(currectData));

        alert('Product created');

        navigate('/');
    }

    return (
        <>
            <NavbarMenu />
            <div className="container">
                <h3 className='text-center my-4'>Create Product</h3>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={createProduct}>
                                    <div className="form-group mb-2">
                                        <label htmlFor="name">Product name</label>
                                        <input type="text" className='form-control' name='productName' value={formCreate.productName} onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="type">Type</label>
                                        <select id="" className='form-control' name='type' value={formCreate.type} onChange={handleChange}>
                                            <option value="" disabled>Select Type</option>
                                            <option value="Kitchenware">Kitchenware</option>
                                            <option value="Bath accessories">Bath accessories</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="price">Price</label>
                                        <input type="number" className='form-control' min={0} name='price' value={formCreate.price} onChange={handleChange} required />
                                    </div>


                                    <div className="d-flex justify-content-around flex-wrap">
                                        <button type='submit' className='btn btn-outline-primary btn-sm w-100 my-2'>Create</button>
                                        <Link to='/' className='w-100'>
                                            <button type='button' className='btn btn-outline-secondary btn-sm w-100 my-2'>Back</button>
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

export default Create