<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Dashboard\Controllers\DashboardController;
use App\Modules\Student\Controllers\StudentController;
use App\Modules\Teacher\Controllers\TeacherController;
use App\Modules\Class\Controllers\ClassController;
use App\Modules\Subject\Controllers\SubjectController;
use App\Modules\Schedule\Controllers\ScheduleController;
use App\Modules\Grade\Controllers\GradeController;
use App\Modules\Attendance\Controllers\AttendanceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/test', function () {
    return response()->json(['message' => 'Test route working']);
});

Route::prefix('dashboard')->middleware('auth:sanctum')->group(function () {
    Route::get('/stats', [DashboardController::class, 'getStats']);
    Route::get('/attendance-chart', [DashboardController::class, 'getAttendanceChartData']);
    Route::get('/performance-chart', [DashboardController::class, 'getPerformanceChartData']);
});

// Student Routes
Route::prefix('students')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [StudentController::class, 'getAllStudents']);
    Route::get('/paginated', [StudentController::class, 'getStudentsPaginated']);
    Route::get('/{id}', [StudentController::class, 'getStudent']);
    Route::post('/', [StudentController::class, 'createStudent']);
    Route::put('/{id}', [StudentController::class, 'updateStudent']);
    Route::delete('/{id}', [StudentController::class, 'deleteStudent']);
    Route::get('/by-email', [StudentController::class, 'getStudentByEmail']);
});

// Teacher Routes
Route::prefix('teachers')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [TeacherController::class, 'getAllTeachers']);
    Route::get('/paginated', [TeacherController::class, 'getTeachersPaginated']);
    Route::get('/{id}', [TeacherController::class, 'getTeacher']);
    Route::post('/', [TeacherController::class, 'createTeacher']);
    Route::put('/{id}', [TeacherController::class, 'updateTeacher']);
    Route::delete('/{id}', [TeacherController::class, 'deleteTeacher']);
});

// Class Routes
Route::prefix('classes')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [ClassController::class, 'getAllClasses']);
    Route::get('/paginated', [ClassController::class, 'getClassesPaginated']);
    Route::get('/{id}', [ClassController::class, 'getClass']);
    Route::post('/', [ClassController::class, 'createClass']);
    Route::put('/{id}', [ClassController::class, 'updateClass']);
    Route::delete('/{id}', [ClassController::class, 'deleteClass']);
    // Additional Class Management Routes
    Route::post("/{classId}/students/{studentId}", [ClassController::class, "addStudentToClass"]);
    Route::delete("/{classId}/students/{studentId}", [ClassController::class, "removeStudentFromClass"]);
    Route::get("/{classId}/students", [ClassController::class, "getClassStudents"]);
});

// Subject Routes
Route::prefix('subjects')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [SubjectController::class, 'getAllSubjects']);
    Route::get('/paginated', [SubjectController::class, 'getSubjectsPaginated']);
    Route::get('/{id}', [SubjectController::class, 'getSubject']);
    Route::post('/', [SubjectController::class, 'createSubject']);
    Route::put('/{id}', [SubjectController::class, 'updateSubject']);
    Route::delete('/{id}', [SubjectController::class, 'deleteSubject']);
});

// Schedule Routes
Route::prefix('schedules')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [ScheduleController::class, 'getAllSchedules']);
    Route::get('/paginated', [ScheduleController::class, 'getSchedulesPaginated']);
    Route::get('/{id}', [ScheduleController::class, 'getSchedule']);
    Route::post('/', [ScheduleController::class, 'createSchedule']);
    Route::put('/{id}', [ScheduleController::class, 'updateSchedule']);
    Route::delete('/{id}', [ScheduleController::class, 'deleteSchedule']);
});

// Grade Routes
Route::prefix('grades')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [GradeController::class, 'getAllGrades']);
    Route::get('/paginated', [GradeController::class, 'getGradesPaginated']);
    Route::get('/{id}', [GradeController::class, 'getGrade']);
    Route::post('/', [GradeController::class, 'createGrade']);
    Route::put('/{id}', [GradeController::class, 'updateGrade']);
    Route::delete('/{id}', [GradeController::class, 'deleteGrade']);
});

// Attendance Routes
Route::prefix('attendance')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [AttendanceController::class, 'getAllAttendance']);
    Route::get('/paginated', [AttendanceController::class, 'getAttendancePaginated']);
    Route::get('/{id}', [AttendanceController::class, 'getAttendance']);
    Route::post('/', [AttendanceController::class, 'createAttendance']);
    Route::put('/{id}', [AttendanceController::class, 'updateAttendance']);
    Route::delete('/{id}', [AttendanceController::class, 'deleteAttendance']);
});
