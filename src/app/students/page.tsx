'use client';

import React, { useState, useEffect, useRef } from 'react';

 export interface Item {
  id: string;
  name: string;
  EnrollNumber: string;
  email : string
  phone :number
  DateofAdmision : string
  
  imageUrl: string;
}

export default function ItemsCRUD() {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
 const [students , setstudents] = useState<number>(0)

  const [formData, setFormData] = useState<Omit<Item, 'id'>>({ 
    name: '', 
    EnrollNumber: '', 
    email : '',
    phone : 0 ,
    DateofAdmision : new Date().toISOString().split('T')[0],
   
    imageUrl: '' 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('items');
    const savedstuydents = localStorage.getItem('students')
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
if (savedstuydents)
    setstudents(parseInt(savedstuydents , 10))
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('students' , students.toString())
  }, [items , students]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      
      const fakeImageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imageUrl: fakeImageUrl }));
      setPreviewImage(fakeImageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCreate = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      ...formData
       
    };
    setItems(prev => [...prev, newItem]);
    resetForm();
    setIsModalOpen(false);
    setstudents(prev => prev +1)
  };

  const handleUpdate = () => {
    if (!editingItem) return;
    
    setItems(prev =>
      prev.map(item =>
        item.id === editingItem.id ? { ...item, ...formData } : item
      )
    );
    resetForm();
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
     setstudents(prev => prev -1)
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      EnrollNumber: item.EnrollNumber,
      email : item.email,
      phone : item.phone,
      DateofAdmision: item.DateofAdmision,
     
      imageUrl: item.imageUrl
    });
    setPreviewImage(item.imageUrl || null);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', EnrollNumber: '',  imageUrl: '', email : '', phone : 0 , DateofAdmision: new Date().toISOString().split('T')[0] });
    setPreviewImage(null);
    setEditingItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editingItem ? handleUpdate() : handleCreate();
  };

  const handleDateChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    setFormData(
      prev =>({...prev , DateofAdmision :e.target.value})
    )
  }



  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
        <div className='flex justify-between  bg-gray-200 p-5 border-b-4 border-gray-300'>
      <h1 className="text-3xl  font-bold mb-6 overflow-hidden uppercase  mt-6   ">Students List </h1>
      <button
        onClick={() => {
          resetForm();
          setIsModalOpen(true);
        }}
        className="bg-yellow-500 text-black px-4 py-2 rounded mb-6 hover:bg-yellow-500 uppercase"
      >
        Add New Students
      </button></div>
      <p className=' px-6 py-2 text-lg font-medium uppercase border-b-4 border-gray-300'>Total Students : {students}</p>

       {isModalOpen && (
        <div className="transparent-white md:fixed inset-0   bg-white flex items-center justify-center p-4 z-50 ">
          <div className=" rounded-lg shadow-xl p-6 w-full max-w-full border-2 border-black bg-gray-200 text-black">
            <div className=''>
                         <h2 className="text-2xl font-bold mb-4 text-center capitalize">
              {editingItem ? 'Edit Item' : 'Create New item'}
            </h2>
            
            <form onSubmit={handleSubmit} className=''>
              {/* Image Upload */}
              <div className="mb-4">
                <label className="block  mb-2">Image</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="w-full p-2 border rounded mb-2  text-black bg-gray-50 hover:bg-gray-100"
                >
                  {previewImage ? 'Change Image' : 'Upload Image'}
                </button>
                {previewImage && (
                  <div className="h-32  rounded-lg overflow-hidden mt-2">
                    <img 
                      src={previewImage} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block  mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded  "
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block  mb-2" htmlFor="price">
                  Email 
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  
                  className="w-full p-2 border rounded "
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block  mb-2" htmlFor="EnrollNumber">
                  Enroll Number
                </label>
                <input
                
                  id="EnrollNumber"
                  name="EnrollNumber"
                  value={formData.EnrollNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded "
                  type='number'
                  
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block  mb-2" htmlFor="EnrollNumber">
                  Phone Number
                </label>
                <input
                
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded "
                  type='number'
                  required
                  
                  
                />
              </div>


              <div className="mb-4">
                <label className="block  mb-2" htmlFor="EnrollNumber">
                  Date of Admision
                </label>
                <input
                
                  id="DateofAdmision"
                  name="EnrollNumber"
                  value={formData.DateofAdmision}
                  onChange={handleDateChange}
                  className="w-full p-2 border rounded "
                  type='date'
                 
                  
                 
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-200    bg-white border-black text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingItem ? 'Update ' : 'Create'}
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      )}
      
      <table className='min-w-full bg-gray-50  text-black text-center  border-collapse  overflow-hidden'>
        <thead className='bg-gray-200 text-gray-500 uppercase'>
          <tr>
            <th className='py-3 px-6  font-medium'>Image</th>
            <th className='py-3 px-6  font-medium'>Name</th>
            <th className='py-3 px-6  font-medium'>Email</th>
            <th className='py-3 px-6  font-medium'>Phone Number</th>
            <th className='py-3 px-6  font-medium'>Enroll Number</th>
            <th className='py-3 px-6  font-medium'>Date of Admision</th>
            
            <th className='py-3 px-6  font-medium'></th>
            
          </tr>
        </thead>

        <tbody>
           {/* Items List */}
      
        {items.map(item => (
          <tr key={item.id} className="border-x border-6 hover:text-black  border-gray-300  hover:bg-gray-50 transition duration-300">
            <td className='py-4 px-6'>
            {item.imageUrl && (
              <div className="">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-16 object-cover rounded-lg shadow-sm"
                />
              </div>
            )}</td>
            <td className='py-4 px-6'>{item.name}</td>
            <td className='py-4 px-6'>
              {item.email}
            
           </td>
           <td className='py-4 px-6'>{item.phone}</td>

            <td className='py-4 px-6'>{item.EnrollNumber}</td>
            <td className='py-4 px-6'>{item.DateofAdmision}</td>
           
            <td className="flex space-x-2 mt-3">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      
        </tbody>
      </table>

     

      {/* Modal for Create/Edit */}
     
      
    </div>
  );
}