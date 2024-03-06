<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\AppUser;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register_user(Request $request)
    {
        //TODO Adding User Profile image.
        $validated = $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string|max:12|min:10',
            'email' => 'required|email|unique:app_users,email',
            'password' => 'required|string|min:8',
        ]);
        $password = $request->password;
        $confirmpassword = $request->confirmpassword;
        if ($password == $confirmpassword) {
            $user = new AppUser();

            $user->name = $validated['name'];
            $user->email = $validated['email'];
            $user->phone = $validated['phone'];
            $user->profile_photo_path = 'default_user_profile.jpeg';
            $user->password = Hash::make($password);

            $save = $user->save();

            if ($save) {
                $token = $user->createToken('authToken')->plainTextToken;
                return response()->json(['user' => $user, 'message' => 'App user registered successfully']);
            }
        } else {
            return response()->json(['message' => 'Password do not match']);
        }
    }
    // Update User
    public function updateuser(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string|max:12|min:10',
            'email' => 'required|email',
            'profile_photo_path' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:5120',
        ]);
    
        $user = AppUser::findOrFail($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->phone = $validated['phone'];
    
        if ($request->hasFile('profile_photo_path')) {
            $profile_pic = $request->file('profile_photo_path');
            $fileExtension = strtolower($profile_pic->getClientOriginalExtension());
            $validExtensions = ['jpeg', 'png', 'jpg', 'webp', 'svg'];
    
            if (!in_array($fileExtension, $validExtensions)) {
                return response()->json(['error' => 'Invalid file format. Please upload a jpeg, jpg, png, webp, or svg file.'], 400);
            }
    
            $profile_pic_path = time() . '.' . $fileExtension;
            $profile_pic->move('Mobile_App_Profile_Pics/', $profile_pic_path);
            $user->profile_photo_path = $profile_pic_path;
        }
    
        $user->save();
    
        return response()->json(['message' => 'User updated successfully'], 200);
    }    


    //  Delete user account 
    public function deleteuser($userId)
    {
        $user = AppUser::findOrFail($userId);
        if (!$user) {
            return response()->json(['error' => 'No account for this user']);
        } else {
            $deleteuser = AppUser::where('id', $userId)->delete();
            if ($deleteuser) {
                return response()->json(['success' => 'Account deleted successfully']);
            } else {
                return response()->json(['success' => 'Account deletion not completed.']);
            }
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = AppUser::where('email', $credentials['email'])->first();

        if ($user && Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'user_id' => $user->id,
                'user' => $user,
                'access_token' => $user->createToken('auth_token')->plainTextToken,
                'message' => 'User logged in successfully',
            ]);
        } elseif (!$user) {
            return response()->json(['error' => 'Error'], 404);
        } else {
            return response()->json(['error' => 'Error'], 502);
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    public function passwordchange(Request $request, $user)
    {
        $credentials = $request->validate([
            'currentpassword' => 'required|string',
            'newpassword' => 'required|string',
            'confirmpassword' => 'required|string',
        ]);
        $user = AppUser::findOrFail($user);

        if ($user) {
            $check =  Hash::check($credentials['currentpassword'], $user->password);
            if ($check) {
                $newpassword = $credentials['newpassword'];
                $confirmpassword = $credentials['confirmpassword'];
                if ($newpassword == $confirmpassword) {
                    $password = Hash::make($credentials['confirmpassword']);
                    $user->password = $password;
                    $save = $user->save();
                    if ($save) {
                        return response()->json(['message' => 'user found and passowrd changed'], 200);
                    } else {
                        return response()->json(['error' => 'user fot found'], 404);
                    }
                }
            } elseif (!$check) {
                return response()->json(['failed' => 'wrong password'], 401);
            } else {
                return response()->json(['error' => 'Unknown error'], 404);
            }
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }
}
