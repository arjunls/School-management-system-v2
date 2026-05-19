<?php

namespace App\Modules\Dashboard\Services;

class DashboardService
{
    public function getStats()
    {
        $students = \App\Models\User::where('role', 'student')->count();
        $teachers = \App\Models\User::where('role', 'teacher')->count();
        $classes = \App\Modules\Class\Models\Kelas::count();

        // Attendance rate would come from an attendance table in a real app
        $attendanceRate = null;

        return [
            'students' => $students,
            'teachers' => $teachers,
            'classes' => $classes,
            'attendanceRate' => $attendanceRate,
        ];
    }

    public function getAttendanceChartData()
    {
        return [
            'labels' => [],
            'datasets' => [
                [
                    'label' => 'Attendance Rate (%)',
                    'data' => [],
                    'borderColor' => 'rgb(75, 192, 192)',
                    'backgroundColor' => 'rgba(75, 192, 192, 0.2)',
                    'tension' => 0.1,
                ]
            ]
        ];
    }

    public function getPerformanceChartData()
    {
        return [
            'labels' => [],
            'datasets' => [
                [
                    'label' => 'Average Score by Class',
                    'data' => [],
                    'borderColor' => 'rgb(255, 99, 132)',
                    'backgroundColor' => 'rgba(255, 99, 132, 0.2)',
                    'tension' => 0.1,
                ]
            ]
        ];
    }
}
