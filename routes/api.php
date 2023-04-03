<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'Logout']);
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/auth', [UserController::class, 'auth']);
    Route::delete('/UserDelete/{id}', [UserController::class, 'destroy']);

    // crud
    Route::post('/store', [PostController::class, 'store']);
    Route::get('/show/{id}', [PostController::class, 'show']);
    Route::get('/author', [PostController::class, 'author']);
    Route::get('/edit/{id}', [PostController::class, 'edit']);
    Route::post('/update/{id}', [PostController::class, 'update']);
    Route::delete('/delete/{id}', [PostController::class, 'destroy']);
});

Route::get('/index', [PostController::class, 'index']);
Route::get('/category', [CategoryController::class, 'category']);
Route::get('/banner', [PostController::class, 'banner']);
Route::post('/signup', [UserController::class, 'SignUp']);
Route::post('/login', [UserController::class, 'Login']);
