import { Link } from 'react-router-dom'
import NavbarMenu from './NavbarMenu'
import { useForm } from 'react-hook-form'

function Registor() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onTouched", // first check validate
        reValidateMode: "onChange" // recheck validate
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <NavbarMenu />
            <div className="container">
                <h3 className='text-center my-4'>Registor</h3>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card p-4">
                                <div className="card-body">
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control"
                                            {...register('name', { required: 'Name is required' })} />
                                        {errors.name?.message && <p className="text-danger">{errors.name.message as string}</p>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="lastname">Lastname</label>
                                        <input type="text" className="form-control"
                                            {...register('lastname', { required: 'Lastname is required' })} />
                                        {errors.lastname?.message && <p className="text-danger">{errors.lastname.message as string}</p>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                    message: 'Invalid email format'
                                                }
                                            })}
                                        />
                                        {errors.email?.message && <p className="text-danger">{errors.email.message as string}</p>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control"
                                            {...register('username', { required: 'Username is required' })} />
                                        {errors.username?.message && <p className="text-danger">{errors.username.message as string}</p>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control"
                                            {...register('password', {
                                                required: 'Password is required',
                                                minLength: {
                                                    value: 8,
                                                    message: 'Password must be at least 8 characters'
                                                }

                                                , pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                    message: 'Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
                                                }
                                            })} />
                                        {errors.password?.message && <p className="text-danger">{errors.password.message as string}</p>}
                                    </div>

                                    <div className="d-flex justify-content-around flex-wrap">
                                        <button type='submit' className='btn btn-outline-primary btn-sm w-100 my-2'>Register</button>
                                        <Link to='/' className='w-100'>
                                            <button type='button' className='btn btn-outline-secondary btn-sm w-100 my-2'>Back</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Registor