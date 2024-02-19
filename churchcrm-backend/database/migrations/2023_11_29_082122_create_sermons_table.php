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
        Schema::create('sermons', function (Blueprint $table) {
            $table->id();
            $table->string('Title');
            $table->string('Sermon_Notes')->nullable();
            $table->string('Sermon_Link')->nullable();
            $table->string('Thumbnail')->nullable();
            $table->string('Notes_Thumbnail')->nullable();
            $table->string('sermon_date')->nullable();
            $table->longText('Sermon_Description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sermons');
    }
};
