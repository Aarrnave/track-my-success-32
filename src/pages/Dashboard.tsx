import { Users, GraduationCap, AlertTriangle, TrendingUp, Calendar, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const quickStats = [
  {
    title: "Total Students",
    value: "1,247",
    change: "+12.5%",
    icon: Users,
    trend: "up",
    color: "text-primary"
  },
  {
    title: "At-Risk Students",
    value: "23",
    change: "-8.2%",
    icon: AlertTriangle,
    trend: "down",
    color: "text-destructive"
  },
  {
    title: "Active Sessions",
    value: "18",
    change: "+4.1%",
    icon: Calendar,
    trend: "up",
    color: "text-accent"
  },
  {
    title: "Avg Attendance",
    value: "87.4%",
    change: "+2.3%",
    icon: BookOpen,
    trend: "up",
    color: "text-success"
  }
];

const attendanceTrend = [
  { month: "Jan", attendance: 85.2 },
  { month: "Feb", attendance: 87.1 },
  { month: "Mar", attendance: 86.8 },
  { month: "Apr", attendance: 88.2 },
  { month: "May", attendance: 87.4 },
  { month: "Jun", attendance: 89.1 }
];

const riskDistribution = [
  { name: "Low Risk", value: 1156, color: "hsl(var(--success))" },
  { name: "Medium Risk", value: 68, color: "hsl(var(--warning))" },
  { name: "High Risk", value: 23, color: "hsl(var(--destructive))" }
];

const departmentStats = [
  { department: "Computer Science", students: 320, attendance: 89.2 },
  { department: "Electronics", students: 285, attendance: 87.8 },
  { department: "Mechanical", students: 298, attendance: 85.4 },
  { department: "Civil", students: 244, attendance: 88.1 },
  { department: "Chemical", students: 100, attendance: 86.9 }
];

const recentActivities = [
  {
    id: 1,
    type: "alert",
    message: "Alice Johnson flagged as high-risk student",
    time: "2 hours ago",
    priority: "high"
  },
  {
    id: 2,
    type: "session",
    message: "Group counseling session completed - 25 students",
    time: "4 hours ago",
    priority: "normal"
  },
  {
    id: 3,
    type: "achievement",
    message: "Department attendance increased by 3.2%",
    time: "6 hours ago",
    priority: "positive"
  },
  {
    id: 4,
    type: "reminder",
    message: "Semester report submissions due in 3 days",
    time: "1 day ago",
    priority: "normal"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Dr. Sarah</h1>
          <p className="text-muted-foreground">Here's what's happening with your students today</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
          <Button>
            <GraduationCap className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge 
                        variant={stat.trend === "up" ? "default" : "secondary"}
                        className={stat.trend === "up" ? "bg-success text-success-foreground" : ""}
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Monthly attendance rates across all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Student Risk Distribution</CardTitle>
            <CardDescription>Current risk assessment across all students</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
          <CardDescription>Student count and attendance by department</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="department" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.priority === "high" ? "bg-destructive" :
                  activity.priority === "positive" ? "bg-success" :
                  "bg-primary"
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge 
                  variant={
                    activity.priority === "high" ? "destructive" :
                    activity.priority === "positive" ? "default" :
                    "secondary"
                  }
                >
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}