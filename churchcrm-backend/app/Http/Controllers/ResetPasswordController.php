<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Models\AppUser;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    public function showResetForm($token, $email)
    {

        return view('auth.reset-appuser-password', [
            'token' => $token,
            'email' => $email,
        ]);
    }


    public function reset(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'token' => 'required|string',
                'password' => 'required|confirmed|min:8',
            ]);

            $status = Password::broker('app_users')->reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->forceFill([
                        'password' => Hash::make($password),
                        'remember_token' => Str::random(60),
                    ])->save();
                }
            );

            if ($status === Password::PASSWORD_RESET) {
                // Password reset was successful
                return view('auth.password-reset-success', ['status' => $status]);
            } else {
                // Password reset failed
                return view('auth.password-reset-failed', ['status' => $status]);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function resetcode(Request $request)
    {
        try {
            $code = $request->code;

            $user = AppUser::where('password_reset_code', '=', $code)->first();

            if ($user) {
                // Check if the password reset code was generated within the last 60 minutes
                if ($code && Carbon::parse($user->password_reset_code_time)->diffInMinutes(now()) < 60) {
                    return response()->json(['message' => 'reset code available'], 200);
                } else {
                    return response()->json(['message' => 'reset code expired'], 400);
                }
                
            } else {
                return response()->json(['error' => 'Invalid reset code'], 404);
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function resetpassword(Request $request, $code)
    {
        $credentials = $request->validate([
            'newpassword' => 'required|string',
            'confirmpassword' => 'required|string',
        ]);

        $user = AppUser::where('password_reset_code', $code)->first();

        if ($user) {
            $newpassword = $credentials['newpassword'];
            $confirmpassword = $credentials['confirmpassword'];

            if ($newpassword === $confirmpassword) {
                $hashedPassword = Hash::make($newpassword);
                $user->password = $hashedPassword;
                $passchange = $user->save();
                if ($passchange) {
                    //send an email

                    return response()->json(['message' => 'Password reset successfully'], 200);
                }
            } else {
                return response()->json(['error' => 'Passwords do not match'], 400);
            }
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }
}
