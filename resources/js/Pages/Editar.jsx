import { Link, Head, router, useForm } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const endpoint = 'http://127.0.0.1:8000/product/';

const Editar = ({ auth, product }) => {

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


    const [name, setName] = useState(product.name);
    const [slug, setSlug] = useState(product.slug);
    const [sku, setSku] = useState(product.sku);
    const [category, setCategory] = useState(product.category);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);

    const update = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/product/${product.id}`, { 
                name,
                slug,
                sku,
                category,
                description,
                price,
            });
            console.log('Producto actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
        router.visit('/dashboard');
    };

    useEffect( () => {
      const getProductById = async () => {
        const response = await axios.get(`${endpoint}${id}`)
        setName(response.data.name)
        setSlug(response.data.slug)
        setSku(response.data.sku)
        setCategory(response.data.category)
        setDescription(response.data.description)
        setPrice(response.data.price)
      }
      getProductById()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div class="bg-[#f5f4f4]">
            <Head title="Editar"/>
            <div class="px-10 py-2 bg-white">
                <div class="flex justify-center md:justify-between h-16">
                <img class="rounded-2xl md:h-14 md:w-14 h-8 w-8 text-xs text-white md:flex hidden items-center p-2 transition-transform duration-500 ease-in-out transform hover:scale-90 cursor-pointer" alt="img" src="/img/logo.png"/>

                <div class="xl:space-x-28 xl:-ml-24 lg:-ml-30 md:-ml-18 hidden md:flex md:space-x-4 lg:space-x-8 -ml-18">
                    <button class="font-bold hover:text-gray-400"><a href="#">Menú</a></button>
                    <button>
                        <Link href="/dashboard" class="font-bold p-1 inline-block hover:text-gray-400">Mis productos</Link>
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
                    <Link href="/crear" class="px-4 py-2 hover:bg-slate-500 my-1" onClick={() => setIsMenuOpen(false)}>Crear</Link>
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
                    <Link href="/dashboard" class="hover:text-gray-400 hover:bg-gray-100 block px-3 py-2 rounded-md">Mis productos</Link>
                    <a href="#" class="hover:text-gray-400 hover:bg-gray-100 block px-3 py-2 rounded-md">Ofertas</a>
                </div>
                </div>



                
<form onSubmit={update}>
        <div class="flex flex-wrap mx-auto lg:mr-10 lg:ml-10 mt-5 justify-evenly w-full">

        {/* Primera parte */}
            <div class="w-full md:w-[45%] md:p-4 p-8 md:pr-20">
              <div class="space-y-4 mt-3">
              <h1 class="font-bold text-md">Información básica del Producto</h1><br/>
                <div class="flex justify-between items-center">
                  <span>Nombre del producto <span class="text-red-500">*</span></span>
                  <input value={name} onChange={ (e)=> setName(e.target.value)} type="text" class="focus:outline-none ml-2 rounded-sm h-8 pl-1"/>
                </div><br/>

                <div class="flex justify-between items-center">
                  <span>Slug <span class="text-red-500">*</span></span>
                  <input value={slug} onChange={ (e)=> setSlug(e.target.value)} type="text" class="focus:outline-none ml-2 rounded-sm h-8 pl-1"/>
                </div><br/>

                <div class="flex justify-between items-center">
                  <span>SKU(Stock Keeping Unit) <span class="text-red-500">*</span></span>
                  <input value={sku} onChange={ (e)=> setSku(e.target.value)} type="text" class="focus:outline-none ml-2 rounded-sm h-8 pl-1"/>
                </div><br/>

                <div class="flex justify-between items-center">
                  <span>Categoría <span class="text-red-500">*</span></span>
                  <input value={category} onChange={ (e)=> setCategory(e.target.value)} type="text" class="focus:outline-none ml-2 rounded-sm h-8 pl-1"/>
                </div><br/>

                <span>Descripcion <span class="text-red-500">*</span></span>
                <div class="flex justify-between items-center">
                <textarea value={description} onChange={ (e)=> setDescription(e.target.value)} class="focus:outline-none rounded-sm md:h-16 h-16 pl-1 w-full resize-none" rows="4" placeholder="Introduzca una descripcion del producto"></textarea>
                </div><br/>

                <h1 class="font-bold text-md">Detalles del Producto</h1><br/>

                <div class="flex justify-between items-center">
                  <span>Precio <span class="text-red-500">*</span></span>
                  <input value={price} onChange={ (e)=> setPrice(e.target.value)} type="text" class="focus:outline-none ml-2 rounded-sm h-8 pl-1"/>
                </div><br/>

              </div>
            </div>


        {/* Segunda parte */}
            <div class="w-full md:w-[45%] md:p-4 p-8 md:pl-20 md:mr-20">

            <div>
              <div class="space-y-2">

              <h1 class="font-bold text-md">Datos personales</h1><br/>
              <div class="flex justify-between items-center">
                  <span>Nombre completo <span class="text-red-500">*</span></span>
                  <input type="text" class="focus:outline-none ml-2 rounded-sm h-8 pl-1"/>
                </div><br/>

                <h1 class="font-bold text-md">Filtros de búsqueda</h1><br/>
              <div class="flex justify-between items-center">
                <span>Características destacadas   <span class="text-red-500">*</span></span>
                <input type="text" class="focus:outline-none ml-2 rounded-sm h-8 pl-1"/>
              </div><br/>

              <h1 class="font-bold text-md">Imágenes</h1><br/>
              <div class="flex justify-between items-center">
                <span>Imágenes del producto <span class="text-red-500">*</span></span>
              </div>
              </div>

              <br/>

                <div class="justify-center">
                  <div class="upload-container relative flex items-center justify-center w-full h-34 max-w-[700px] bg-white rounded-lg p-5 border-2 border-dashed border-gray-300 cursor-pointer hover:border-purple-700 sm:max-w-[800px] sm:h-[200px]">
                  <span class="upload-text absolute text-lg text-gray-500 font-bold z-10 hover:text-purple-700">Subir imágenes</span>
                  <input type="file" class="upload-input absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer" accept="image/*"/>
                  </div>



                <br/>
                <div class="space-y-2">
                <button type="submit" class="bg-[#111827] text-white px-4 py-2 rounded w-full hover:bg-gray-700 active:bg-[#6400a9]">Editar producto</button><br/>
                <button class="bg-[#111827] text-white px-4 py-2 rounded w-full hover:bg-gray-700 active:bg-[#6400a9]">Cancelar</button><br/>
                </div>
                </div>
              </div>
            </div>

    
</div>
</form>




            


            </div>
    );
};
export default Editar;