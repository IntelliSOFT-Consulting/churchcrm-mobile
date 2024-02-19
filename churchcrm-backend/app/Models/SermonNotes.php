<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SermonNotes extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'notesupload',
        'sermondescription',
    ];
}
