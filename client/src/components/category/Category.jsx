
import React, { useEffect, useState } from 'react';
import Button from '../shared/Button';
import { fetchCategories } from '../../api';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories().then(data => {
            setCategories(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="py-6 sm:py-8">
            <div className="container">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Categories</h2>
                {loading ? <div className="text-sm sm:text-base">Loading...</div> : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {categories.map(cat => (
                            <div key={cat.id} className="py-6 sm:py-8 lg:py-10 pl-4 sm:pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-2xl sm:rounded-3xl relative h-[150px] sm:h-[180px] flex items-end">
                                <div>
                                    <div className='mb-3 sm:mb-4'>
                                        <p className='mb-[2px] text-xs sm:text-sm text-gray-400'>Category</p>
                                        <p className='text-lg sm:text-xl lg:text-2xl font-semibold mb-[2px]'>{cat.name}</p>
                                        <Button
                                            onClick={() => window.location.href = `/products`}
                                            text="Browse"
                                            bgColor="bg-primary"
                                            textColor="text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Category