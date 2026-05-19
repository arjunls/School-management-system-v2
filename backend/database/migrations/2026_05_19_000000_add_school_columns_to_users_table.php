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
        Schema::table('users', function (Blueprint $table) {
            $table->string('nisn', 20)->unique()->nullable()->after('date_of_birth');
            $table->string('nik', 20)->nullable()->after('nisn');
            $table->unsignedInteger('kelas_id')->nullable()->after('nik');
            $table->string('jurusan', 50)->nullable()->after('kelas_id');
            $table->string('tempat_lahir', 100)->nullable()->after('jurusan');
            $table->text('alamat')->nullable()->after('tempat_lahir');
            
            // Foreign key constraint for kelas_id (will be created when kelas table is ready)
            // $table->foreign('kelas_id')->references('id')->on('kelas')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'nisn',
                'nik',
                'kelas_id',
                'jurusan',
                'tempat_lahir',
                'alamat'
            ]);
        });
    }
};