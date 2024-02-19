<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sermon_notes', function (Blueprint $table) {
            $table->id();
            $table->string('notesupload');
            $table->string('notesimage')->nullable();
            $table->string('sermon_date')->nullable();
            $table->longtext('sermondescription');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sermon_notes');
    }
};
