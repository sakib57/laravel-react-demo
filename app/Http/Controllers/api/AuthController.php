<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $data = $request->validated();

        if(!Auth::attempt($data)){
            return response([
                'message' => 'Invalid Credentials'
            ]);
        }
        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function register(RegisterRequest $request){
        $data = $request->validated();
        $newUser = User::create([
            "name" => $data['name'],
            "email" => $data['email'],
            "password" => bcrypt($data['password']),
        ]);

        $token = $newUser->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $newUser,
            'token' => $token
        ]);
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('',204);
    }
}
