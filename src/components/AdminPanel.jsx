// src/components/AdminPanel.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts'; // Importa tu contexto
import { Button } from './ui/button'; // Reusa tus componentes de UI
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Trash2 } from 'lucide-react';

const API_URL = "https://cla-royale.azure-api.net/api/productos"; // La URL base de tu API

export const AdminPanel = ({ darkMode }) => {
    const { token } = useContext(AuthContext); // Obtenemos el token JWT del contexto
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Estados para el formulario de nuevo producto
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [category, setCategory] = useState('General');
    const [stock, setStock] = useState(100);
    const [imageUrl1, setImageUrl1] = useState('');

    // Función para cargar los productos
    const fetchProducts = async () => {
        try {
        // El GET no necesita token porque es público
        const res = await fetch(API_URL);
        const data = await res.json();
        setProducts(data);
        } catch (error) {
        console.error("Error cargando productos:", error);
        }
    };

    // Cargar productos al montar el componente
    useEffect(() => {
        fetchProducts();
    }, []);

    // --- FUNCIÓN DE BORRADO (DELETE) ---
    const handleDelete = async (id) => {
        if (!window.confirm(`¿Seguro que quieres borrar el producto ${id}?`)) {
        return;
        }
        
        setLoading(true);
        try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
            // ¡CRUCIAL! Esto le dice al backend que eres un Admin
            'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('No se pudo borrar el producto. ¿Tienes permisos de Admin?');
        }

        // Si se borra, recargamos la lista
        fetchProducts(); 

        } catch (error) {
        console.error("Error al borrar:", error);
        alert(error.message);
        } finally {
        setLoading(false);
        }
    };
    
    // --- FUNCIÓN DE CREACIÓN (POST) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newProduct = {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        category,
        imageUrl1,
        // Los demás campos (rating, reviews, etc.) usarán los defaults
        // que definimos en el modelo de C#
        };

        setLoading(true);
        try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            // ¡CRUCIAL! Esto le dice al backend que eres un Admin
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newProduct)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error del servidor:", errorData);
            throw new Error('No se pudo crear el producto. ¿Tienes permisos de Admin?');
        }

        // Si se crea, limpiamos el formulario y recargamos la lista
        fetchProducts();
        setNombre('');
        setDescripcion('');
        setPrecio(0);

        } catch (error) {
        console.error("Error al crear:", error);
        alert(error.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-center">Panel de Administración</h1>
        
        {/* --- FORMULARIO DE CREAR PRODUCTO --- */}
        <Card className={`${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
            <CardHeader>
            <CardTitle>Añadir Nuevo Producto</CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Columna 1 */}
                <div className="space-y-2">
                <div>
                    <label className="text-sm font-medium">Nombre</label>
                    <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} 
                    required 
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">Descripción</label>
                    <textarea 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                    className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} 
                    />
                </div>
                </div>
                {/* Columna 2 */}
                <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="text-sm font-medium">Precio</label>
                    <input 
                        type="number" 
                        value={precio} 
                        onChange={(e) => setPrecio(e.target.value)} 
                        className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} 
                        required 
                    />
                    </div>
                    <div>
                    <label className="text-sm font-medium">Stock</label>
                    <input 
                        type="number" 
                        value={stock} 
                        onChange={(e) => setStock(e.target.value)} 
                        className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} 
                        required 
                    />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium">Categoría</label>
                    <input 
                    type="text" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} 
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">URL de Imagen 1</label>
                    <input 
                    type="text" 
                    value={imageUrl1} 
                    onChange={(e) => setImageUrl1(e.target.value)} 
                    className={`w-full p-2 border rounded ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`} 
                    />
                </div>
                </div>
                {/* Botón de envío */}
                <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className="w-full bg-yellow-500 dark:bg-red-800 text-black dark:text-white">
                    {loading ? "Creando..." : "Crear Producto"}
                </Button>
                </div>
            </form>
            </CardContent>
        </Card>
        
        {/* --- LISTA DE PRODUCTOS PARA BORRAR --- */}
        <Card className={`${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
            <CardHeader>
            <CardTitle>Eliminar Productos</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-2">
                {products.map(product => (
                <div key={product.id} className="flex items-center justify-between p-2 border rounded dark:border-slate-700">
                    <div>
                    <span className="font-bold">{product.nombre}</span>
                    <span className="text-sm text-gray-500 ml-2">(ID: {product.id})</span>
                    </div>
                    <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(product.id)}
                    disabled={loading}
                    >
                    <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
        </div>
    );
};