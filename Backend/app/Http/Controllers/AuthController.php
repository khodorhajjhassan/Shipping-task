<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(RegisterRequest $request){

        try {

            $formFields = $request ->validated() ;
               
             $formFields['password']= Hash::make($formFields['password']);
    
             $user= User::create($formFields);
             
             $token = $user->createToken('auth_token')->plainTextToken;

             $cookie = cookie('token', $token, 60 * 24);
    
              return response()->json([ 'status'=> 'success',
              'message'=> 'User Register success and complete',
              'token'=> $token,
              'user' =>$user])->withCookie($cookie);
        }
        catch (\Exception $e) {
            return response()->json([ 'status'=> 'error',
            'message'=> $e->getMessage() ]);
        }

    }
    public function login(LoginRequest $request)
    {
        try {

            $formFields = $request->validated();

            $user = User::where('email', $formFields['email'])->first();
            if (!Auth::attempt($formFields)) {
                return response()->json([
                    'message'=>'Email or password invailed'
                    ],422);

                }
                $token = $user->createToken('auth_token')->plainTextToken;
                $cookie = cookie('token', $token, 60 * 24);
                
                return response()->json([
                    'token'=>$token,
                    'user'=>$user,
                    'status'=>'success',
                    'token_type'=>'Bearer',
                ])->withCookie($cookie);
        }
        catch (\Exception $e) {
            return response()->json([
                'status'=> 'error',
                'message'=> $e->getMessage()
                ]);
            }
    }

    public function logout(Request $request) {
        try {
        $request->user()->currentAccessToken()->delete();

        $cookie = cookie()->forget('token');

        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);
        }
        catch (\Exception $e) {
            return response()->json([
                'message'=> $e->getMessage()
                ]);
            }
    }
  
    
}
