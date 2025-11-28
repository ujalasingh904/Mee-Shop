
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Button from '../shared/Button';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';

const ProductCard = ({ data }) => {
    const { addToCart, cart, removeFromCart, updateQty } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const getCartQuantity = (productId) => {
        const item = cart.find(c => c.id === productId);
        return item ? item.qty : 0;
    };

    const handleIncrement = (item) => {
        if (!user) {
            navigate('/auth');
            return;
        }
        addToCart(item);
    };

    const handleDecrement = (itemId) => {
        if (!user) {
            navigate('/auth');
            return;
        }
        const qty = getCartQuantity(itemId);
        if (qty === 1) {
            removeFromCart(itemId);
        } else if (qty > 1) {
            updateQty(itemId, qty - 1);
        }
    };
    return (
        <div className='mb-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 place-items-center'>
                {/* card section  */}
                {data.map((item) => (
                    <div
                        data-aos="fade-up"
                        data-aos-delay={item.aosDelay}
                        key={item.id} className='group w-full max-w-[280px]'>
                        <Link to={`/product/${item.id}`}>
                            <div className='relative'>
                                <img src={item.image || item.img} alt="Loading"
                                    className='h-[180px] w-full object-cover rounded-md'
                                />
                                {/* hover button  */}
                                <div className='hidden group-hover:flex absolute top-1/2 -translate-y-[50%] left-1/2 -translate-x-1/2 w-full h-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200'>
                                    <Button
                                        text={"Add to Cart"}
                                        bgColor={"bg-primary"}
                                        textColor={"text-white"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (!user) {
                                                navigate('/auth');
                                                return;
                                            }
                                            addToCart(item);
                                        }}
                                    />
                                </div>
                            </div>
                        </Link>
                        <div className='leading-7'>
                            <Link to={`/product/${item.id}`}>
                                <h2 className='font-semibold hover:text-primary transition-colors line-clamp-1'>{item.title || item.name}</h2>
                            </Link>
                            <div className='flex items-center justify-between mt-2'>
                                <h2 className='font-bold'>₹{item.price}</h2>
                                {getCartQuantity(item.id) > 0 && (
                                    <div className='flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1'>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDecrement(item.id);
                                            }}
                                            className='text-gray-700 dark:text-white hover:text-primary'
                                        >
                                            <FiMinus size={14} />
                                        </button>
                                        <span className='text-sm font-semibold min-w-[1rem] text-center'>{getCartQuantity(item.id)}</span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleIncrement(item);
                                            }}
                                            className='text-gray-700 dark:text-white hover:text-primary'
                                        >
                                            <FiPlus size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductCard