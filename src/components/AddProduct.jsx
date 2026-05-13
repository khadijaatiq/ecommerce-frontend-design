import React, { useState } from 'react';

const AddProduct = ({ setPage, user }) => {
    const [formData, setFormData] = useState({
        name: '', price: '', category: '', image: '', description: '', stock: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    if (!user) {
        setPage('auth');
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('https://ecommerce-backend-design-seven.vercel.app/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    stock: Number(formData.stock)
                })
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Failed to add product');
            } else {
                setSuccess('Product added successfully!');
                setFormData({ name: '', price: '', category: '', image: '', description: '', stock: '' });
            }
        } catch (err) {
            setError('Server error, try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-8">
            <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setPage('profile')} className="text-blue-600 hover:underline text-sm">← Back</button>
                    <h1 className="text-2xl font-bold">Add New Product</h1>
                </div>

                {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
                {success && <p className="text-green-600 text-sm mb-4 bg-green-50 p-3 rounded-lg">{success}</p>}

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Product Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Price ($)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange}
                                placeholder="0.00"
                                className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Stock</label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange}
                                placeholder="0"
                                className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}
                            className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500">
                            <option value="">Select category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Home and outdoor">Home and outdoor</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Image URL</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange}
                            placeholder="https://..."
                            className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange}
                            placeholder="Enter product description" rows={3}
                            className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 resize-none" />
                    </div>

                    <button onClick={handleSubmit} disabled={loading}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50">
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;