// utils/roleFeatures.js

export function getFeaturesByRole(user) {
  const { role, gpa, credits, assignedStudents, totalUsers } = user;

  // ============= GPA HANDLING =============
  const formattedGpa = gpa ? Number(gpa).toFixed(2) : "N/A";

  const getGpaColor = (gpaValue) => {
    if (gpaValue >= 3.0) return "#10B981"; // Green
    if (gpaValue >= 2.0) return "#FBBF24"; // Yellow
    return "#EF4444"; // Red
  };

  // ============= ROLE-BASED FEATURES  =============
  const roleFeatures = {
    student: [
      {
        title: "GPA Tracking",
        description:
          "Track your GPA and monitor course progress throughout your academic journey.",
        color: "#10B981",
        statsText: formattedGpa ? `Current GPA: ${formattedGpa}` : "GPA not available",
        statsStyle: { color: getGpaColor(gpa) },
        route: "/gpa-tracker",
      },
      {
        title: "Wellness Support",
        description:
          "Access mental health resources, mood tracking, and wellness check-ins.",
        color: "#8B5CF6",
        stats: "Last check-in: 2 days ago",
        route: "/alertsResources",
      },
      {
        title: "Course Mapping",
        description:
          "Plan your degree path with intelligent course recommendations and prerequisites.",
        color: "#F59E0B",
        stats: credits ? `${credits} credits` : "Credits not available",
        route: "/course-mapping",
      },
      {
        title: "Academic Calendar",
        description:
          "View important dates, deadlines, and schedule appointments with advisors.",
        color: "#EF4444",
        stats: "3 upcoming deadlines",
        route: "/calendarPage",
      },
    ],

    counselor: [
      {
        title: "Student Management",
        description:
          "View and manage your assigned students' academic progress and wellness.",
        color: "#3B82F6",
        stats: assignedStudents
          ? `${assignedStudents} assigned students`
          : "No students assigned",
        route: "/user-profiles",
      },
      {
        title: "Wellness Dashboard",
        description:
          "Monitor student wellness metrics and intervention recommendations.",
        color: "#10B981",
        stats: "12 students need attention",
        route: "/alertsResources",
      },
      {
        title: "Appointment Scheduling",
        description:
          "Manage your calendar and schedule meetings with students.",
        color: "#F59E0B",
        stats: "8 appointments this week",
        route: "/appointments",
      },
      {
        title: "Resource Library",
        description:
          "Access counseling resources, guides, and intervention strategies.",
        color: "#8B5CF6",
        stats: "127 resources available",
        route: "/resources",
      },
      {
        title: "Reports & Analytics",
        description:
          "Generate reports on student progress and wellness trends.",
        color: "#EF4444",
        stats: "5 reports pending",
        route: "/reports",
      },
    ],

    admin: [
      {
        title: "User Management",
        description:
          "Manage student, counselor, and admin accounts across the system.",
        color: "#6B7280",
        stats: totalUsers
          ? `${totalUsers} total users`
          : "User count not available",
        route: "/user-management",
      },
      {
        title: "System Analytics",
        description:
          "View comprehensive analytics across all users and departments.",
        color: "#3B82F6",
        stats: "98.7% system uptime",
        route: "/analytics",
      },
      {
        title: "College Management",
        description:
          "Manage college information, departments, and organizational structure.",
        color: "#10B981",
        stats: "16 colleges active",
        route: "/college-management",
      },
      {
        title: "Course Catalog",
        description:
          "Manage course offerings, prerequisites, and academic requirements.",
        color: "#F59E0B",
        stats: "2,347 courses listed",
        route: "/course-catalog",
      },
      {
        title: "System Settings",
        description:
          "Configure system-wide settings, permissions, and security.",
        color: "#8B5CF6",
        stats: "All systems operational",
        route: "/system-settings",
      },
      {
        title: "Backup & Security",
        description:
          "Manage data backups, security protocols, and system maintenance.",
        color: "#EF4444",
        stats: "Daily backup: Complete",
        route: "/security",
      },
    ],
  };

  return roleFeatures[role] || [];
}