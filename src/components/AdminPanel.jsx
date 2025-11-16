// src/components/AdminPanel.jsx (ACTUALIZADO CON 'EDITAR')
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Trash2, Edit } from 'lucide-react'; // Importar ícono de Editar

const API_URL = "https://cla-royale.azure-api.net/api/productos";

export const AdminPanel = ({ darkMode }) => {
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // --- NUEVO ESTADO ---
    const [editingId, setEditingId] = useState(null); // null = Modo Crear, (numero) = Modo Editar

    // Estados para el formulario
    const [formState, setFormState] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        category: 'General',
        stock: 100,
        imageUrl1: '',
        imageUrl2: '',
        imageUrl3: '',
        rating: 4.5, // Añadimos todos los campos del modelo
        reviews: 0
    });

    const fetchProducts = async () => {
        try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProducts(data);
        } catch (error) {
        console.error("Error cargando productos:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // --- NUEVA FUNCIÓN: Cargar datos para editar ---
    const handleEditClick = (product) => {
        setEditingId(product.id); // Pone el formulario en "Modo Editar"
        // Rellena el formulario con los datos del producto
        setFormState({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        category: product.category,
        stock: product.stock,
        imageUrl1: product.imageUrl1 || '',
        imageUrl2: product.imageUrl2 || '',
        imageUrl3: product.imageUrl3 || '',
        rating: product.rating,
        reviews: product.reviews
        });
        window.scrollTo({ top: 0, behavior: "smooth" }); // Sube al formulario
    };

    // --- NUEVA FUNCIÓN: Cancelar Edición ---
    const cancelEdit = () => {
        setEditingId(null); // Vuelve a "Modo Crear"
        // Limpia el formulario
        setFormState({
        nombre: '', descripcion: '', precio: 0, category: 'General',
        stock: 100, imageUrl1: '', imageUrl2: '', imageUrl3: '',
        rating: 4.5, reviews: 0
        });
    };

    // --- FUNCIÓN DE BORRADO (Sin cambios) ---
    const handleDelete = async (id) => {
        if (!window.confirm(`¿Seguro que quieres borrar el producto ${id}?`)) return;
        setLoading(true);
        try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('No se pudo borrar el producto.');
        fetchProducts();
        } catch (error) {
        alert(error.message);
        } finally {
        setLoading(false);
        }
    };
    
    // --- FUNCIÓN DE ENVÍO (ACTUALIZADA) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Junta el ID (si existe) con los datos del formulario
        const productData = {
        ...formState,
        id: editingId, // Será null si es nuevo, o un ID si se edita
        precio: parseFloat(formState.precio),
        stock: parseInt(formState.stock),
        rating: parseFloat(formState.rating),
        reviews: parseInt(formState.reviews)
        };

        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `${API_URL}/${editingId}` : API_URL;

        setLoading(true);
        try {
        const response = await fetch(url, {
            method: method,
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error(`No se pudo ${editingId ? 'actualizar' : 'crear'} el producto.`);
        }

        fetchProducts(); // Recargar la lista
        cancelEdit(); // Limpiar el formulario y salir del modo edición

        } catch (error) {
        alert(error.message);
        } finally {
        setLoading(false);
        }
    };

    // Pequeña función para manejar los cambios del formulario
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-center">Panel de Administración</h1>
        
        {/* --- FORMULARIO DE CREAR/EDITAR PRODUCTO --- */}
        <Card className={`${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
            <CardHeader>
            {/* Título dinámico */}
            <CardTitle>{editingId ? `Editando Producto (ID: ${editingId})` : 'Añadir Nuevo Producto'}</CardTitle>
            </CardHeader>
            <CardContent>
            {/* El 'name' en cada input es crucial para 'handleFormChange' */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Columna 1 */}
                <div className="space-y-2">
                <div>
                    <label className="text-sm font-medium">Nombre</label>
                    <input name="nombre" type="text" value={formState.nombre} onChange={handleFormChange} className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} required />
                </div>
                <div>
                    <label className="text-sm font-medium">Descripción</label>
                    <textarea name="descripcion" value={formState.descripcion} onChange={handleFormChange} className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} />
                </div>
                </div>
                {/* Columna 2 */}
                <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                    <label className="text-sm font-medium">Precio</label>
                    <input name="precio" type="number" value={formState.precio} onChange={handleFormChange} className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} required />
                    </div>
                    <div>
                    <label className="text-sm font-medium">Stock</label>
                    <input name="stock" type="number" value={formState.stock} onChange={handleFormChange} className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} required />
                    </div>
                    <div>
                    <label className="text-sm font-medium">Categoría</label>
                    <input name="category" type="text" value={formState.category} onChange={handleFormChange} className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                    <label className="text-sm font-medium">Rating</label>
                    <input name="rating" type="number" step="0.1" value={formState.rating} onChange={handleFormChange} className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} />
                    </div>
                    <div>
                    <label className="text-sm font-medium">Reviews</label>
                    <input name="reviews" type="number" value={formState.reviews} onChange={handleFormChange} className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium">URL Imagen 1</label>
                    <input name="imageUrl1" type="text" value={formState.imageUrl1} onChange={handleFormChange} className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} />
                </div>
                <div>
                    <label className="text-sm font-medium">URL Imagen 2</label>
                    <input name="imageUrl2" type="text" value={formState.imageUrl2} onChange={handleFormChange} className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} />
                </div>
                <div>
                    <label className="text-sm font-medium">URL Imagen 3</label>
                    <input name="imageUrl3" type="text" value={formState.imageUrl3} onChange={handleFormChange} className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} />
                </div>
                </div>
                {/* Botones de envío */}
                <div className="md:col-span-2 flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1 bg-yellow-500 dark:bg-red-800 text-black dark:text-white">
                    {loading ? (editingId ? 'Actualizando...' : 'Creando...') : (editingId ? 'Actualizar Producto' : 'Crear Producto')}
                </Button>
                {/* Botón de Cancelar (solo se muestra si estamos editando) */}
                {editingId && (
                    <Button type="button" variant="outline" onClick={cancelEdit} className="flex-1">
                    Cancelar Edición
                    </Button>
                )}
                </div>
            </form>
            </CardContent>
        </Card>
        
        {/* --- LISTA DE PRODUCTOS (CON BOTÓN EDITAR) --- */}
        <Card className={`${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
            <CardHeader>
            <CardTitle>Administrar Productos</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-2">
                {products.map(product => (
                <div key={product.id} className="flex items-center justify-between p-2 border rounded dark:border-slate-700">
                    <div>
                    <span className="font-bold">{product.nombre}</span>
                    <span className="text-sm text-gray-500 ml-2">(ID: {product.id})</span>
                    </div>
                    <div className="flex gap-2">
                    {/* --- NUEVO BOTÓN DE EDITAR --- */}
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditClick(product)}
                        disabled={loading}
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(product.id)}
                        disabled={loading}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    </div>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
        </div>
    );
};