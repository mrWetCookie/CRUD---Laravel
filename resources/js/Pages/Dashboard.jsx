import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

const endpoint = 'http://127.0.0.1:8000'

export default function Dashboard({ auth }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);


    const [ products, setProducts ] = useState([])

    useEffect ( ()=> {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
        const response = await axios.get(`${endpoint}/products`)
        setProducts(response.data)
    }

    const deleteProduct = async (id) => {
        try {
          await axios.delete(`${endpoint}/product/${id}`);
          getAllProducts(); // Actualiza la lista después de la eliminación
        } catch (error) {
          console.error('Error al eliminar el producto:', error);
        }
      };


    return (
        <div class="bg-[#f5f4f4]">
            <Head title="Inicio"/>

            {/* Header */}
            <div class="px-10 py-2 bg-white">
                <div class="flex justify-center md:justify-between h-16">
                <img class="rounded-2xl md:h-14 md:w-14 h-8 w-8 text-xs text-white md:flex hidden items-center p-2 transition-transform duration-500 ease-in-out transform hover:scale-90 cursor-pointer" alt="img" src="/img/logo.png"/>

                <div class="xl:space-x-28 xl:-ml-24 lg:-ml-30 md:-ml-18 hidden md:flex md:space-x-4 lg:space-x-8 -ml-18">
                    <button class="font-bold hover:text-gray-400"><a href="#">Menú</a></button>
                    <button>
                        <a href="#" class="font-bold p-1 inline-block hover:text-gray-400">Mis productos</a>
                    </button>
                    <button class="font-bold hover:text-gray-400"><a href="#">Ofertas</a></button>

                </div>

                <div class="flex items-center lg:space-x-4 md:space-x-2 space-x-4">
                <div class="relative">
                        <input type="text" class="h-8 lg:w-80 w-full rounded-lg text-md" placeholder="Buscar.com.mx" required/>
                        <button class="absolute inset-y-0 right-0 flex items-center pr-2 pl-2 hover:bg-slate-300 hover:text-cyan-500 m-1 rounded-md cursor-pointer">
                        <span class="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        </span>
                        </button>
                </div>

                <div class="relative" ref={menuRef}>
                <button class="font-bold text-gray-700 hidden md:flex" onClick={toggleMenu}>
                    Usuario/Cliente
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>

                {isMenuOpen && (
                    <div className="mt-5 -ml-36 sm:ml-0 w-48 bg-slate-800 text-white rounded-md shadow-lg z-50 fixed grid bg-opacity-90">
                    <Link href="crear" class="px-4 py-2 hover:bg-slate-500 my-1" onClick={() => setIsMenuOpen(false)}>Crear</Link>
                    <Link href={route('logout')} method="post" class="px-4 py-2 hover:bg-slate-500 my-1" onClick={() => setIsMenuOpen(false)}> Cerrar sesión</Link>
                    </div>
                )}
                </div>

                <button class="bg-[#6400a9] rounded-full md:h-12 md:w-12 h-8 w-8 hover:bg-[#ad7fd6] md:hidden justify-center" title="Usuario/Cliente">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke-width="2" class="bi bi-person-fill md:h-9 md:w-9 h-6 mx-auto text-white" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
                </button>

                <button class="bg-[#6400a9] hover:transition-transform duration-500 transform rounded-full md:h-8 md:w-8 h-8 w-8 hover:bg-[#ad7fd6] hidden md:flex items-center justify-center" title="Usuario/Cliente">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke-width="2" class="bi bi-person-fill md:h-7 md:w-7 h-6 mx-auto text-white" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
                </button>

                    <button class="bg-[#6400a9] hover:transition-transform duration-500 transform hover:bg-[#ad7fd6] rounded-full h-8 w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart4  h-6 mx-auto text-white" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                        </svg>
                    </button>
                </div>
                </div>


                <div class="space-y-1 pb-2 border-t pt-2 md:hidden">
                    <a href="#" class="hover:text-gray-400 hover:bg-gray-100 block px-3 py-2 rounded-md">Menú</a>
                    <Link href="#" class="hover:text-gray-400 hover:bg-gray-100 block px-3 py-2 rounded-md">Mis productos</Link>
                    <a href="#" class="hover:text-gray-400 hover:bg-gray-100 block px-3 py-2 rounded-md">Ofertas</a>
                </div>
                </div>



                <div class="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 gap-2 mt-10 mb-10 space-x-2 lg:mr-10 lg:ml-10 ml-5 mr-5">

                { products.map( (product) => (

                    <article key={product.id} class="rounded overflow-hidden m-1 p-8 bg-white">
                    <Link to="#" class="block transition-transform duration-500 ease-in-out transform hover:scale-95">
                        <img src="/img/noAV.png" class="h-52 w-full object-cover rounded" alt="Imagen 1" />
                    </Link>


                    <div class="pt-3 space-y-2 relative">
                        <h3 class="text-base">{product.name}</h3>
                        <div class="flex items-center space-x-2">
                            <Link href={`/editar/${product.id}`} class="rounded-full border-2 border-[#6400a9] p-1 pr-4 pl-4 hover:bg-[#6400a9] hover:text-white inline-block">Editar</Link>
                            <button onClick={ ()=>deleteProduct(product.id) } class="rounded-full border-2 border-[#6400a9] p-1 pr-4 pl-4 hover:bg-[#6400a9] hover:text-white inline-block">Eliminar</button>
                        </div>
                    </div>
                    </article>

                ))}

                </div>

        </div>
    );
}
