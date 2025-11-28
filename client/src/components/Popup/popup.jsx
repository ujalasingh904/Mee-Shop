
import { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import Button from '../shared/Button';
import { createOrder } from '../../api';

const Popup = ({ OrderPopup, handleOrderPopup }) => {
    const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            await createOrder(form);
            setSuccess(true);
            setForm({ name: '', phone: '', email: '', address: '' });
        } catch (err) {
            setError('Order failed. Try again.');
        }
        setLoading(false);
    };

    return (
        <>
            {OrderPopup && (
                <div>
                    <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm'>
                        <div className='w-[300px]  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4  shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 rounded-xl'>
                            <div className='flex justify-between'>
                                <h1>Order Now</h1>
                                <div>
                                    <IoCloseOutline
                                        onClick={handleOrderPopup}
                                        className='text-2xl cursor-pointer' />
                                </div>
                            </div>
                            <form className='mt-4' onSubmit={handleSubmit}>
                                <input name="name" value={form.name} onChange={handleChange} type="text" placeholder='Name' className='form-input' required />
                                <input name="phone" value={form.phone} onChange={handleChange} type="text" placeholder='Phone no.' className='form-input' required />
                                <input name="email" value={form.email} onChange={handleChange} type="email" placeholder='Email' className='form-input' required />
                                <input name="address" value={form.address} onChange={handleChange} type="text" placeholder='Address' className='form-input' required />
                                <div className='flex justify-center'>
                                    <Button
                                        text={loading ? "Ordering..." : "Order Now"}
                                        bgColor="bg-primary"
                                        textColor="text-white"
                                        type="submit"
                                        disabled={loading}
                                    />
                                </div>
                                {success && <div className='text-green-600 text-center mt-2'>Order placed!</div>}
                                {error && <div className='text-red-600 text-center mt-2'>{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Popup