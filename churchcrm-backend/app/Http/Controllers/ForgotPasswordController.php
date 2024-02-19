<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use App\Models\Password_reset_code;
use App\Notifications\SendResetCode;
use Illuminate\Http\Request;
use App\Http\Controllers\Carbon;
use Carbon\Carbon as CarbonCarbon;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Carbon as SupportCarbon;
use Illuminate\Support\Facades\Notification;

class ForgotPasswordController extends Controller
{
    //
    // public function forgotPassword(Request $request)
    // {
    //     try {
    //         $request->validate(['email' => 'required|email']);

    //         $status = Password::broker('app_users')->sendResetLink(
    //             $request->only('email')
    //         );

    //         if ($status === Password::RESET_LINK_SENT) {
    //             return response()->json(['message' => 'passwords.sent']);
    //         } else {
    //             throw ValidationException::withMessages(['email' => [__($status)]]);
    //         }
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => $e->getMessage()], 500);
    //     }
    // }
    public function resetcodegen(Request $request)
    {
        try {
            $email = $request->validate(['email' => 'required|email']);

            $user = AppUser::where('email', $email)->firstOrFail();

            if ($user) {
                $code = substr(str_shuffle(str_repeat('0123456789', 5)), 0, 6);
                //save the new user token code to thje app users table.
                $user->password_reset_code = $code;
                $user->password_reset_code_time = now();
                $save = $user->save();

                if ($save) {
                    //send an email to the user for reset.

                    $details = [
                        'email' => $request->input('email'),
                        'resetcode' => $code,
                    ];
                    $mail = $details['email'];

                    sleep(5);
                    try {
                        Notification::route('mail', $mail)->notify(new SendResetCode($details));
                        return response()->json(['message' => 'Notification sent successfully'], 200);
                    } catch (\Exception $e) {
                        return response()->json(['error' => 'Failed to send notification: ' . $e->getMessage()], 500);
                    }
                } else {
                    return response()->json(['error' => 'unable to update the reset code'], 404);
                }
            } else {
                return response()->json(['code' => 'Wrong reset code.'], 404);
            }
        } catch (ModelNotFoundException $e) {

            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
