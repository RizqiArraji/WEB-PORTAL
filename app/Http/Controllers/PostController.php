<?php

namespace App\Http\Controllers;

use auth;
use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            Post::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'=> 'required|max:255',
            'slug'=> 'required|max:255',
            'excerpt'=> 'required',
            'body'=> 'required',
            'category_id'=> 'required',
            'image'=> 'image|file',
        ]);

        try{
            $imageName= Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('images', $request->image, $imageName);

            $request['user_id']= auth()->user()->id;

            Post::create($request->post() + ['image' => $imageName]);

            return response()->json([
                'message'=> 'success'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Bermasalah'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return response()->json([
            Post::find($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return response()->json([
            Post::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data= Post::find($id);

            $request->validate([
                'title',
                'slug',
                'excerpt',
                'body',
            'image',
            ]);


                if($request->file("image")){
                    $exists= Storage::disk('public')->exists("images/{$data->image}");
                    if($exists){
                        Storage::disk('public')->delete("images/{$data->image}");
                    }
                }

                $imageName= Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('images', $request->image, $imageName);

                $request['user_id']= auth()->user()->id;
                $data->update($request->post() + ['image'=> $imageName]);

            return response()->json([
                'message'=> 'success'
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data= Post::find($id);

        if($data->image){
            Storage::delete($data->image);
        }

       $data->delete();
        return response()->json([
            'message'=> 'success'
        ]);
    }

    public function banner(){
        return response()->json([
            Post::first()
        ]);
    }

    public function author(){
        return response()->json([
            Post::where('user_id', auth()->user()->id)->get()
        ]);
    }
}
