<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MobileApiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::group(['middleware' => 'auth:sanctum'], function () {
//     // Your authenticated routes go here
// });



//the auth functions
Route::post('/register', [AuthController::class, 'register_user']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('deleteuser/{userId}', [AuthController::class, 'deleteuser']);

// fetch of the api data
Route::get('/fetchEvents', [MobileApiController::class, 'fetchEvents']);
Route::get('/fetchAnnouncements', [MobileApiController::class, 'fetchAnnouncements']);
Route::get('/fetchSermonnotes', [MobileApiController::class, 'fetchSermonnotes']);
Route::get('/fetchSermons', [MobileApiController::class, 'fetchSermons']);

// Profile
Route::get('/profile/{userId}', [MobileApiController::class, 'fetchProfile']);

// Update profile
Route::post('/updateuser/{userId}', [AuthController::class, 'updateuser']);

// Notes
Route::post('/newNotes', [MobileApiController::class, 'createNotes']);
Route::get('/showNotes/{userId}', [MobileApiController::class, 'displayNotes']);
Route::get('/getNote/{noteId}', [MobileApiController::class, 'getNote']);
Route::post('/updateNote/{noteId}', [MobileApiController::class, 'updateNote']);
Route::delete('/deletenote/{id}', [MobileApiController::class, 'deletenote']);
// Sermon and sermon notes
Route::get('/fetch/sermonNotes/{sermonId}', [MobileApiController::class, 'sermonAndNote']);

// View sermon notes
Route::get('/fetch_other_notes/{noteID}', [MobileApiController::class, 'sermonNotesView']);


// Download notes
Route::get('/download_notes/{sermonId}', [MobileApiController::class, 'downloadSermonNotes']);

// Download notes from home page
Route::get('/download_sermon_notes/{noteID}', [MobileApiController::class, 'downloadHomePageNotes']);


// Forgot Password
Route::post('/passwordchange/{user}', [AuthController::class, 'passwordchange'])->name('passwordchange');
// Route::post('/forgot-password', [ForgotPasswordController::class, 'forgotPassword']);
Route::post('/resetcodegen', [ForgotPasswordController::class, 'resetcodegen']);
Route::post('/resetcode', [ResetPasswordController::class, 'resetcode'])->name('resetcode');
Route::post('/resetpassword/{code}', [ResetPasswordController::class, 'resetpassword']);


// Reset Password
Route::get('/showResetForm/{token}/{email}', [ResetPasswordController::class, 'showResetForm'])->name('appuser_reset');
Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('appuser_reset_password');