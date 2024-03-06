<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Announcement;
use App\Models\Sermons;
use App\Models\SermonNotes;
use App\Models\Event;
use App\Models\ShortVideo;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Jetstream\HasProfilePhoto;
use Illuminate\Support\Str;

class AdminController extends Controller
{

    //
    public function dashboard()
    {
        return view('admin.index');
    }
    public function users()
    {
        return view('admin.pages.users.users');
    }
    public function announcements()
    {
        return view('admin.pages.announcements');
    }
    public function sermons()
    {
        return view('admin.pages.sermons');
    }
    public function sermonsnotes()
    {
        return view('admin.pages.sermons-notes');
    }
    // Events =====================
    public function events()
    {
        return view('admin.pages.events');
    }

    // Profile page ==================
    public function profile()
    {
        return view('admin.pages.profile_page');
    }
    public function updateProfileInformation(Request $request)
    {
        // Validate the request inputs
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . Auth::id(),
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Update the user's profile
        $user = Auth::user();
        $user->update($data);

        // Handle photo upload if applicable
        if ($request->hasFile('photo')) {
            $user->updateProfilePhoto($request->file('photo'));
        }

        // Flash a success message and redirect
        return redirect()->route('profile')->with('status', 'Profile information updated successfully!');
    }
    public function adminusrregister(Request $request)
    {
        $userData = $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);
        $userName = Str::before($userData['email'], '@');
        $user = User::create([
            'name' => $userName,
            'email' => $userData['email'],
            'password' => bcrypt($userData['password']),
        ]);

        if (!$user) {
            // Failed to create user
            $message = 'Failed to create user';
            return redirect()->back()->with('message', $message)->withErrors(['Failed to create user']);
        }

        // User created successfully
        $message = 'User ' . $user->email . ' created successfully';
        return redirect()->back()->with('message', $message);
    }

    public function update_user(Request $request, $id)
    {
        $userData = $request->validate([
            'email'    => 'required|email|unique:users,email,' . $id,
            'password' => 'sometimes|nullable|min:6',
        ]);

        // Extract the user name from the email
        $userName = Str::before($userData['email'], '@');

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->name = $userName;
        $user->email = $userData['email'];

        if ($request->filled('password')) {
            $pass = $request->input('password');
            $user->password = Hash::make($pass);
        }

        $user->save();

        // Check if the user was successfully updated
        if (!$user->wasChanged()) {
            $message = 'No changes were made for user ' . $user->email;
            return redirect()->back()->with('message', $message);
        }

        $message = 'User ' . $user->email . ', password:  ' . $pass . '  ' . ' Updated successfully';
        return redirect()->back()->with('message', $message);
    }
    //Delete User
    public function delete_user($id)
    {
        try {
            $event = User::findOrFail($id);
            $event->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the user.'], 500);
        }
    }




    public function validateAndMoveImage($file)
    {
        $validExtensions = ['jpeg', 'jpg', 'png', 'webp', 'svg'];
        $fileExtension = strtolower($file->getClientOriginalExtension());

        if (!in_array($fileExtension, $validExtensions)) {
            return false;
        }

        $fileName = time() . '.' . $fileExtension;
        $file->move('EventImages/', $fileName);

        return $fileName;
    }

    public function newevent(Request $request)
    {
        $request->validate([
            'eventupload' => 'required|mimes:jpeg,png,jpg,webp,svg|max:2048',
            'event_title' => 'required|string|max:255',
            'event_date' => 'required|date',
            'event_description' => 'required|string',
        ]);

        $eventfile = $request->file('eventupload');
        $eventfileName = $this->validateAndMoveImage($eventfile);

        if ($eventfileName === false) {
            return redirect()
                ->back()
                ->with('error', 'Invalid file format. Please upload a jpeg, jpg, png, webp, svg file.');
        }

        $event = new Event();
        $event->Event_Title = $request->event_title;
        $event->Event_Date = $request->event_date;
        $event->Event_Description = $request->event_description;
        $event->Img_Path = $eventfileName;

        $save = $event->save();

        return redirect()->back();
    }

    public function updateevent(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
            'event_title' => 'required|string|max:255',
            'event_date' => 'required|date',
            'event_description' => 'required|string',
            'event_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Add image validation if needed
        ]);

        $event = Event::findOrFail($request->event_id);

        $event->Event_Title = $request->event_title;
        $event->Event_Date = $request->event_date;
        $event->Event_Description = $request->event_description;

        if ($request->hasFile('event_image')) {
            $imagePath = $this->validateAndMoveImage($request->file('event_image'));

            if ($imagePath === false) {
                return redirect()
                    ->back()
                    ->with('error', 'Invalid file format. Please upload a jpeg, jpg, png, webp, svg file.');
            }

            $event->Img_Path = $imagePath;
        }

        $event->save();

        return redirect()->back()->with('success', 'Event updated successfully');
    }



    public function deleteevent($id)
    {
        try {
            $event = Event::findOrFail($id);
            $event->delete();
            return response()->json(['message' => 'Event deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the announcement.'], 500);
        }
    }
    // END Events

    public function newannouncement(Request $request)
    {
        //user ajax.to save the data.
        $announcement = new Announcement();
        $announcement->Topic = $request->Topic;
        $announcement->Message = $request->Message;

        // Validate the poster using Laravel's validation
        $validation = $request->validate([
            'poster' => 'required|image|mimes:jpg,png,jpeg',
        ]);

        $poster = $request->file('poster');
        if ($poster) {
            $postername = uniqid() . '.' . $poster->getClientOriginalExtension();
            $poster->move('Announcements/', $postername);
        }
        $announcement->poster = $postername;

        $announcement->save();

        return redirect()->back()->with('success', 'Announcement created successfully');
    }


    //deleteannouncement
    public function deleteannouncement($id)
    {
        try {
            $announcement = Announcement::findOrFail($id);
            $announcement->delete();

            return response()->json(['message' => 'Announcement deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the announcement.'], 500);
        }
    }

    //Sermon notes start
    public function newsermonnotes(Request $request)
    {
        $sermonnotes = new SermonNotes();
        $validate = $request->validate([
            'notesupload' => 'required|mimes:pdf,doc,docx,ppt,pptx|max:5120',
            'notesimage' => 'image|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
        ]);

        $notesfile = $request->file('notesupload');
        $notesFileSaved = $this->uploadEventFile($notesfile, ['pdf', 'doc', 'docx', 'ppt', 'pptx'], 'SermonNotes/');

        $notes_thumbnail = $request->file('notesimage');
        if ($notes_thumbnail) {
            $notesThumbnailFile = $this->uploadEventFile($notes_thumbnail, ['jpeg', 'png', 'jpg', 'gif', 'webp', 'svg'], 'Notes_Thumbnails/');
            $sermonnotes->notesimage = $notesThumbnailFile['thumbnail_file_name'];
        } else {
            $sermonnotes->notesimage = null;
        }

        $sermonnotes->notesupload = $notesFileSaved['file_name'];
        $sermonnotes->sermondescription = $request->sermondescription;
        $sermonnotes->sermon_date = $request->sermon_date;
        $sermonnotes->save();

        return redirect()->back();
    }

    private function uploadEventFile($file, $validExtensions, $destination)
    {
        if ($file) {
            $fileExtension = strtolower($file->getClientOriginalExtension());

            if (!in_array($fileExtension, $validExtensions)) {
                return redirect()
                    ->back()
                    ->with('error', 'Invalid file format. Please upload a valid file.');
            }

            $fileName = time() . '.' . $fileExtension;
            $file->move($destination, $fileName);

            return ['file_name' => $fileName, 'thumbnail_file_name' => $fileName];
        }

        return null;
    }


    public function deletesermonnotes($id)
    {
        try {
            $announcement = SermonNotes::findOrFail($id);
            $announcement->delete();

            return response()->json(['message' => 'Announcement deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the announcement.'], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();
        return redirect()->route('login');
    }

    public function newsermons(Request $request)
    {
        $sermons = new Sermons();

        // Adding the Sermon Notes
        $request->validate([
            'Sermon_Notes' => 'mimes:pdf,doc,docx,ppt,pptx|max:2048',
            'Thumbnail' => 'mimes:jpeg,png,jpg,webp,svg|max:2048',
            'Notes_Thumbnail' => 'mimes:jpeg,png,jpg,webp,svg|max:2048',
        ]);

        $sermon_notes = $request->file('Sermon_Notes');
        if ($sermon_notes) {
            $validExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];
            $fileExtension = strtolower($sermon_notes->getClientOriginalExtension());

            if (!in_array($fileExtension, $validExtensions)) {
                return redirect()
                    ->back()
                    ->with('error', 'Invalid file format. Please upload a PDF, DOC, DOCX, PPT, or PPTX file.');
            }
            $sermon_notes_fileName = time() . '.' . $fileExtension;
            $sermon_notes->move('SermonNotes/', $sermon_notes_fileName);
            $sermons->Sermon_Notes = $sermon_notes_fileName;
        }
        // Adding the Thumbnail


        $thumbnailFile = $request->file('Thumbnail');
        if ($thumbnailFile) {
            $validExtensions = ['jpeg', 'png', 'jpg', 'webp', 'svg'];
            $fileExtension = strtolower($thumbnailFile->getClientOriginalExtension());

            if (!in_array($fileExtension, $validExtensions)) {
                return redirect()
                    ->back()
                    ->with('error', 'Invalid file format. Please upload a jpeg, jpg,  png, webp, svg file.');
            }
            $thumbnailFileName = time() . '.' . $fileExtension;
            $thumbnailFile->move('SermonThumbnails/', $thumbnailFileName);
            $sermons->Thumbnail = $thumbnailFileName;
        }

        $notes_image_thumbnail = $request->file('Notes_Thumbnail');
        if ($notes_image_thumbnail) {
            $validExtensions = ['jpeg', 'png', 'jpg', 'webp', 'svg'];
            $fileExtension = strtolower($notes_image_thumbnail->getClientOriginalExtension());

            if (!in_array($fileExtension, $validExtensions)) {
                return redirect()
                    ->back()
                    ->with('error', 'Invalid file format. Please upload a jpeg, jpg,  png, webp, svg file.');
            }
            $notesThumbnailFile = time() . '.' . $fileExtension;
            $notes_image_thumbnail->move('Sermon_Notes_Thumbnails/', $notesThumbnailFile);
            $sermons->Notes_Thumbnail = $notesThumbnailFile;
        }

        $sermons->Title = $request->Title;
        $sermons->sermon_date = $request->sermon_date;
        $sermons->Sermon_Description = $request->Sermon_Description;
        $sermons->Sermon_Link = $request->Sermon_Link;
        $sermons->save();
        return redirect()->back();
    }

    public function update_announcement(Request $request, $id)
    {
        $request->validate([
            'Topic'    => 'required|string',
            'Message' => 'required|string',
        ]);

        $announcements = Announcement::findOrfail($id);

        if (!$announcements) {
            return response()->json(['message' => 'Announcement not found'], 404);
        }

        $announcements->Topic = $request->input('Topic');
        $announcements->Message = $request->input('Message');

        $announcements->save();


        return redirect()->back()->with('message', 'Announcement updated successfully.');
    }

    public function update_sermon_notes(Request $request, $id)
    {
        $request->validate([
            'notesupload' => 'sometimes|required|mimes:pdf,doc,docx,ppt,pptx|max:2048',
            'sermondescription' => 'required|string',
        ]);

        $sermonnotes = SermonNotes::findOrFail($id);

        if (!$sermonnotes) {
            return response()->json(['message' => 'Notes not found'], 404);
        }

        $notesfileName = $sermonnotes->notesupload;

        if ($request->hasFile('notesupload')) {
            $validExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];
            $fileExtension = strtolower($request->file('notesupload')->getClientOriginalExtension());

            if (!in_array($fileExtension, $validExtensions)) {
                return redirect()
                    ->back()
                    ->with('error', 'Invalid file format. Please upload a PDF, DOC, DOCX, PPT, or PPTX file.');
            }

            $notesfileName = time() . '.' . $fileExtension;
            $request->file('notesupload')->move('SermonNotes/', $notesfileName);
        }

        $sermonnotes->update([
            'notesupload' => $notesfileName,
            'sermondescription' => $request->sermondescription,
        ]);

        return redirect()->back();
    }


    public function download_sermon_notes($id)
    {
        $path_name = SermonNotes::where("id", $id)->value("notesupload");
        $file_path = 'public/SermonNotes/' . $path_name;
        if (Storage::exists($file_path)) {
            return Storage::disk('local')->get($file_path);
        } else {
            return response()->json(['error' => 'File not found'], 404);
        }
    }

    protected function handleUpdateResponse($saved, $successMessage, $failureMessage)
    {
        if ($saved) {
            return redirect()->back()->with('message', $successMessage);
        } else {
            return redirect()->back()->with('error', $failureMessage);
        }
    }

    public function update_admin_profile(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->name = $request->input('name');
        $user->email = $request->input('email');

        $profileImage = $request->file('Profile_photo');

        if ($profileImage) {
            $validExtensions = ['jpeg', 'png', 'jpg', 'webp', 'svg'];
            $fileExtension = strtolower($profileImage->getClientOriginalExtension());

            if (!in_array($fileExtension, $validExtensions)) {
                return redirect()->back()->with('error', 'Invalid file format. Please upload a jpeg, jpg, png, webp, svg file.');
            }

            $profileImageName = time() . '.' . $fileExtension;
            $profileImage->move('ProfileImage/', $profileImageName);
            $user->profile_photo_path = 'ProfileImage/' . $profileImageName;
        }

        $user->save();
        return $this->handleUpdateResponse(true, 'Admin profile updated successfully.', 'Failed to update admin profile.');
    }

    public function update_admin_password(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        if (!Hash::check($request->input('password'), $user->password)) {
            return redirect()->back()->with('error', 'Incorrect password');
        }

        $user->password = bcrypt($request->input('newpassword'));

        $saved = $user->save();

        return $this->handleUpdateResponse($saved, 'Password updated successfully.', 'Failed to update password');
    }



    public function adminprofile()
    {
        return view('admin.pages.admin-profile.adminprofile');
    }
    //shortvideos
    public function shortvideos()
    {
        return view('admin.pages.short-videos.short-videos');
    }

    public function shortvideoupload(Request $request)
    {
        $shortvideo = new ShortVideo();
        $validated = $request->validate([
            'thumbnail_path' => 'mimes:jpeg,png,jpg,webp,svg|max:2048',
            'video_path' =>'mimes:mp4|max:20480',
        ]);
        $shortvideo->title = $request->title;
        $shortvideo->video_description = $request->video_description;
        $thumbnailFile = $validated['thumbnail_path'];
        if ($thumbnailFile) {
            $validExtensions = ['jpeg', 'png', 'jpg', 'webp', 'svg'];
            $fileExtension = strtolower($thumbnailFile->getClientOriginalExtension());
            if (!in_array($fileExtension, $validExtensions)) {
                return redirect()
                    ->back()
                    ->with('error', 'Invalid file format. Please upload a jpeg, jpg,  png, webp, svg file.');
            }
            $thumbnailFileName = time() . '.' . $fileExtension;
            $thumbnailFile->move('ShortVideoThumbnails/', $thumbnailFileName);
        }

        $video = $validated['video_path'];
        if ($video) {
            $validExtensions = ['mp4'];
            $fileExtension = strtolower($video->getClientOriginalExtension());
            if (!in_array($fileExtension, $validExtensions)) {
                return redirect()
                    ->back()
                    ->with('error', 'Invalid file format. Please upload a mp4.');
            }
            $videoName = time() . '.' . $fileExtension;
            $video->move('Shortvideos/', $videoName);
        }
        $shortvideo->title = $request->title;
        $shortvideo->video_description = $request->video_description;
        $shortvideo->thumbnail_path = $thumbnailFileName;
        $shortvideo->video_path = $videoName;
        $shortvideo->save();
        return redirect()->back()->with('message', 'Video saved successfully');
    }
}
