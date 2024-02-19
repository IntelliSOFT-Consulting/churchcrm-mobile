<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Note extends Model
{
    use HasFactory;
    protected $fillable = [
        'note_topic',
    ];

    public function User()
    {
        return $this->hasOne(User::class);
    }
}
