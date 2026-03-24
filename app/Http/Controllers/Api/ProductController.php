<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Response;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return $products;
    }
    public function store(Request $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->slug = $request->slug;
        $product->sku = $request->sku;
        $product->category= $request->category;
        $product->description = $request->description;
        $product->price = $request->price;

        $product->save();
    }

    public function show(string $id)
    {
        $product = Product::find($id);
        return $product;
    }

    public function update(Request $request, string $id)
{
    // Validar los datos
    $validated = $request->validate([
        'name' => 'required',
        'slug' => 'required',
        'sku' => 'required',
        'category' => 'required',
        'description' => 'required',
        'price' => 'required',
    ]);

    // Buscar y actualizar el producto
    $product = Product::findOrFail($id);
    $product->fill($validated);
    $product->save();

    // Redirigir al dashboard con un mensaje de éxito
    return Redirect::route('dashboard')->with('success', 'Producto actualizado correctamente.');
}

    

    public function destroy(string $id)
    {
        $product = Product::destroy($id);
        return $product;
    }
}
