<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function SignUp(Request $request){
        $data= $request->validate([
            'name'=> 'required|max:20',
            'email'=> 'required|unique:users,email',
            'password'=> [
                'required',
                Password::min(8)
            ]
        ]);

        $user= User::create([
            'name'=> $data['name'],
            'email'=> $data['email'],
            'password'=> Hash::make($data['password']),
        ]);

        $token= $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function Login(Request $request){
        $credentials= $request->validate([
            'email'=> 'required|email|exists:users,email',
            'password'=>'required'
        ]);

        if(!Auth::attempt($credentials)){
            return response([
                'message'=> 'Provided email address or password is incorrect'
            ], 422);
        }

        $user= Auth::user();
        $token= $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function Logout(Request $request){
        $user= $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }

    public function index(){
        return response()->json([
            User::all()
        ]);
    }

    public function destroy($id){
        $data= User::find($id);

        $data->delete();
    }
}
