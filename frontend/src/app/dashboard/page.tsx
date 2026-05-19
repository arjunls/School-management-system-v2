"use client";
import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '@/lib/api';
import { MainLayout } from '@/components/layout/MainLayout';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/widgets/StatCard';
import { SkeletonLoader, SkeletonCard } from '@/components/ui/SkeletonLoader';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    attendanceRate: 0,
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data from API
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch stats
        const statsResponse = await dashboardAPI.getStats();
        if (statsResponse.data.success) {
          setStats(statsResponse.data.data);
        }
        
        // Fetch attendance chart data
        const attendanceResponse = await dashboardAPI.getAttendanceChartData();
        if (attendanceResponse.data.success) {
          // In a real app, we would update chart state here
          console.log("Attendance data:", attendanceResponse.data.data);
        }
        
        // Fetch performance chart data
        const performanceResponse = await dashboardAPI.getPerformanceChartData();
        if (performanceResponse.data.success) {
          // In a real app, we would update chart state here
          console.log("Performance data:", performanceResponse.data.data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);


  if (loading) {
    return (
      <MainLayout>
        <Header />
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonCard className="col-span-1" />
            <SkeletonCard className="col-span-1" />
            <SkeletonCard className="col-span-1" />
            <SkeletonCard className="col-span-1" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkeletonCard className="h-48" />
            <SkeletonCard className="h-48" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Header />
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value={stats.students}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0a4 4 0 00-4 4v1a5 5 0 00-4.472 3.341A5.972 5.972 0 005 12a1 1 0 100 2h10a1 1 0 100-2c0-1.657-.665-3.143-1.528-3.659A5 5 0 0014 5V4a4 4 0 00-4-4zM4.932 7.04a3 3 0 014.136 0l.008.005a3 3 0 004.136 0l.008-.005A3 3 0 0115.068 7a3 3 0 01-4.136 0l-.008-.005a3 3 0 00-4.136 0l-.008.005a3 3 0 010 0zM9 14a1 1 0 100 2h2a1 1 0 100-2H9z"/></svg>}
            color="blue"
            trend={{ value: '2.3%', isPositive: true }}
          />
          <StatCard
            title="Total Teachers"
            value={stats.teachers}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 8a3 3 0 100-6 3 3 0 000 6zm3 7a4 4 0 01-8 0 4 4 0 00-8 0v1a2 2 0 00.293 1.707l-1.414 1.414A2 2 0 004 18h12a2 2 0 001.293-.707l-1.414-1.414A2 2 0 0018 17v-1z"/></svg>}
            color="green"
            trend={{ value: '1.8%', isPositive: true }}
          />
          <StatCard
            title="Total Classes"
            value={stats.classes}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v1a1 1 0 000 2h1a1 1 0 011 1v2.586l-.293.293a1 1 0 01-1.414 0L3 10.586V5a2 2 0 012-2h8a2 2 0 012 2v5.586l-.293.293a1 1 0 01-1.414 0L11 13.586V9a1 1 0 011-1h1a1 1 0 000-2h1a2 2 0 012 2v1a1 1 0 000 2h-1a1 1 0 01-1 1h-1a1 1 0 00-1-1V6a2 2 0 00-2-2H4z" clipRule="evenodd" /></svg>}
            color="yellow"
            trend={{ value: '0.5%', isPositive: true }}
          />
          <StatCard
            title="Attendance Rate"
            value={stats.attendanceRate}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 100 2h3a1 1 0 000 2h-5a1 1 0 100-2h3zm-4 6a1 1 0 100 2h3a1 1 0 000 2h-3a1 1 0 100-2h-3zm8-8a1 1 0 100 2v3a1 1 0 00-2 0v-3a1 1 0 100-2 0z"/></svg>}
            color="purple"
            trend={{ value: '0.8%', isPositive: true }}
          />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Attendance Trend</h3>
            <div className="h-48 bg-gray-100 rounded-lg">
              {/* Chart would go here */}
              <div className="flex h-full items-center justify-center text-gray-400">
                Attendance Chart
              </div>
            </div>
          </div>
          
          {/* Performance Chart */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Student Performance</h3>
            <div className="h-48 bg-gray-100 rounded-lg">
              {/* Chart would go here */}
              <div className="flex h-full items-center justify-center text-gray-400">
                Performance Chart
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Activities</h3>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View All</a>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s1 2 2 2 2-.9 2-2-1.09-2-2-2zm0 12c-1.1 0-2 .9-2 2s1 2 2 2 2-.9 2-2-1.09-2-2-2zm0-6c-1.1 0-2 .9-2 2s1 2 2 2 2-.9 2-2-1.09-2-2-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">New student enrollment</h4>
                <p className="text-sm text-gray-500">15 new students enrolled in Grade 10</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3 3 0 004.743 3.426 3.42 3.42 0 00-1.946 2.055" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Teacher training completed</h4>
                <p className="text-sm text-gray-500">All teachers completed annual training</p>
                <p className="text-xs text-gray-400">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"/>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Exam results published</h4>
                <p className="text-sm text-gray-500">Midterm exam results are now available</p>
                <p className="text-xs text-gray-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}