<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Event;
use App\Models\Note;
use App\Models\SermonNotes;
use App\Models\Sermons;
use Illuminate\Http\Request;
use App\Models\AppUser;
use Illuminate\Support\Facades\Storage;

class MobileApiController extends Controller
{
    public function fetchEvents()
    {
        $data = Event::orderBy('id', 'desc')->get();
        return response()->json($data);
    }
    public function fetchAnnouncements()
    {
        $data = Announcement::orderBy('updated_at', 'desc')->get();
        return response()->json($data);
    }
    public function fetchSermonnotes()
    {
        $data = SermonNotes::orderBy('id', 'desc')->get();
        // $notes = Sermons::select('Notes_Thumbnail', 'Sermon_Notes')->get();
        return response()->json($data);
    }
    public function fetchSermons()
    {
        $data = Sermons::orderBy('id', 'desc')->get();
        return response()->json($data);
    }
    public function fetchProfile($userId)
    {
        $data = AppUser::where('id', $userId)->first();
        return response()->json($data);
    }



    public function createNotes(Request $request)
    {
        $validatedData = $request->validate([
            'note_topic' => 'required|string',
            'content' => 'required|string',
        ]);

        $notes = new Note();

        $notes->note_topic = $validatedData['note_topic'];
        $notes->user_id_fk = $request->user_id_fk;

        $notes->save();

        $jsonFilePath = Storage::path('notes_file.json');
        // $jsonFilePath = public_path('notes_file.json');
        if (file_exists($jsonFilePath)) {
            $existingNotes = file_get_contents($jsonFilePath);
            $data = json_decode($existingNotes, true) ?? [];
        } else {
            $data = [];
        }

        // Data to be sent to the file
        $data[$notes->id] = [
            'userID' => $notes->user_id_fk,
            'note_topic' => $notes->note_topic,
            'content' => $validatedData['content'],
        ];

        file_put_contents($jsonFilePath, json_encode($data, JSON_PRETTY_PRINT));
    }

    public function displayNotes($id)
    {
        $user = AppUser::where('id', $id)->first();

        if ($user) {
            $data = Note::where('user_id_fk', $user->id)->orderBy('id', 'desc')->get();
            if ($data) {
                return response()->json($data);
            } else {
                return response()->json(['error' => 'User has no notes.'], 404);
            }
        } else {
            return response()->json(['error' => 'User not found.'], 404);
        }
    }

    public function getNote($noteId)
    {
        $jsonFilePath = Storage::path('notes_file.json');

        if (file_exists($jsonFilePath)) {
            $existingNotes = file_get_contents($jsonFilePath);

            $data = json_decode($existingNotes, true) ?? [];
        } else {
            $data = [];
        }

        if (array_key_exists($noteId, $data)) {
            $specificNote = $data[$noteId];
            return response()->json($specificNote);
        } else {
            return response()->json(['error' => 'Note not found'], 404);
        }
    }
    public function updateNote(Request $request, $noteId)
    {
        // Validate request data
        $validatedData = $request->validate([
            'note_topic' => 'required|string',
            'content' => 'required|string',
        ]);

        // Find the note by ID or throw a 404 error if not found
        $note = Note::findOrFail($noteId);

        // Update the note with the validated data
        $note->note_topic = $validatedData['note_topic'];
        $note->user_id_fk = $request->userID;

        // Save the changes to the database
        $save = $note->save();

        // Update the data in the JSON file
        $jsonFilePath = Storage::path('notes_file.json');
        if (file_exists($jsonFilePath)) {
            $existingNotes = file_get_contents($jsonFilePath);
            $data = json_decode($existingNotes, true) ?? [];
        } else {
            $data = [];
        }

        // Update the specific note data
        if (array_key_exists($noteId, $data)) {
            $data[$noteId] = [
                'userID' => $note->user_id_fk,
                'note_topic' => $validatedData['note_topic'],
                'content' => $validatedData['content'],
            ];

            // Save the updated data back to the JSON file
            file_put_contents($jsonFilePath, json_encode($data, JSON_PRETTY_PRINT));
        } else {
            // Return error response if note ID not found in the JSON file
            return response()->json(['error' => 'Note not found in JSON file'], 404);
        }

        // Return success response
        return response()->json(['message' => 'Note updated successfully'], 200);
    }
    public function deletenote($id)
    {
        $note = Note::find($id);

        if (!$note) {
            return response()->json(['message' => 'Note not found'], 404);
        }

        $note->delete();

        return response()->json(['message' => 'Note deleted successfully'], 200);
    }


    public function sermonAndNote($id)
    {
        $data = Sermons::where('id', $id)->first();

        //     $pdfFile =  public_path('SermonNotes/' . $data->Sermon_Notes);
        //     $parser = new \Smalot\PdfParser\Parser();
        //     $pdf = $parser->parseFile($pdfFile);
        //     $text = mb_convert_encoding($pdf->getText(), 'UTF-8', 'UTF-8');
        //     $data->text = $text;

        return response()->json($data);
    }

    public function downloadSermonNotes($id)
    {
        $sermon = Sermons::where("id", $id)->first();
        $path_name = $sermon->Sermon_Notes;

        $sermonNotesPath = public_path('SermonNotes');

        $filePath = $sermonNotesPath . '/' . $path_name;

        if (file_exists($filePath)) {
            return response()->file($filePath);
        } else {
            return response()->json(['error' => 'File not found'], 404);
        }
    }

    public function downloadHomePageNotes($id)
    {
        $notes = SermonNotes::where("id", $id)->first();
        $path_name = $notes->notesupload;

        $notesPath = public_path('SermonNotes');

        $filePath = $notesPath . '/' . $path_name;

        if (file_exists($filePath)) {
            return response()->file($filePath);
        } else {
            return response()->json(['error' => 'File not found'], 404);
        }
    }

    public function sermonNotesView($id)
    {
        $data = SermonNotes::where('id', '!=', $id)->orderBy('id', 'desc')->get();
        return response()->json($data);
    }
}
