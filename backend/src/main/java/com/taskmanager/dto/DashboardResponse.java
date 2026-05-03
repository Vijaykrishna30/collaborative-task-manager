package com.taskmanager.dto;

import java.util.List;

public class DashboardResponse {

    private long totalProjects;
    private long totalTasks;
    private long completedTasks;
    private long inProgressTasks;
    private long todoTasks;
    private List<ProjectSummary> projectSummaries;
    private List<RecentTask> recentTasks;

    public DashboardResponse() {}

    public long getTotalProjects() { return totalProjects; }
    public long getTotalTasks() { return totalTasks; }
    public long getCompletedTasks() { return completedTasks; }
    public long getInProgressTasks() { return inProgressTasks; }
    public long getTodoTasks() { return todoTasks; }
    public List<ProjectSummary> getProjectSummaries() { return projectSummaries; }
    public List<RecentTask> getRecentTasks() { return recentTasks; }

    public void setTotalProjects(long totalProjects) { this.totalProjects = totalProjects; }
    public void setTotalTasks(long totalTasks) { this.totalTasks = totalTasks; }
    public void setCompletedTasks(long completedTasks) { this.completedTasks = completedTasks; }
    public void setInProgressTasks(long inProgressTasks) { this.inProgressTasks = inProgressTasks; }
    public void setTodoTasks(long todoTasks) { this.todoTasks = todoTasks; }
    public void setProjectSummaries(List<ProjectSummary> projectSummaries) { this.projectSummaries = projectSummaries; }
    public void setRecentTasks(List<RecentTask> recentTasks) { this.recentTasks = recentTasks; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private long totalProjects;
        private long totalTasks;
        private long completedTasks;
        private long inProgressTasks;
        private long todoTasks;
        private List<ProjectSummary> projectSummaries;
        private List<RecentTask> recentTasks;

        public Builder totalProjects(long v) { this.totalProjects = v; return this; }
        public Builder totalTasks(long v) { this.totalTasks = v; return this; }
        public Builder completedTasks(long v) { this.completedTasks = v; return this; }
        public Builder inProgressTasks(long v) { this.inProgressTasks = v; return this; }
        public Builder todoTasks(long v) { this.todoTasks = v; return this; }
        public Builder projectSummaries(List<ProjectSummary> v) { this.projectSummaries = v; return this; }
        public Builder recentTasks(List<RecentTask> v) { this.recentTasks = v; return this; }

        public DashboardResponse build() {
            DashboardResponse r = new DashboardResponse();
            r.totalProjects = totalProjects;
            r.totalTasks = totalTasks;
            r.completedTasks = completedTasks;
            r.inProgressTasks = inProgressTasks;
            r.todoTasks = todoTasks;
            r.projectSummaries = projectSummaries;
            r.recentTasks = recentTasks;
            return r;
        }
    }

    // --- Nested: ProjectSummary ---

    public static class ProjectSummary {
        private Long id;
        private String name;
        private long totalTasks;
        private long completedTasks;
        private double completionPercentage;

        public ProjectSummary() {}

        public Long getId() { return id; }
        public String getName() { return name; }
        public long getTotalTasks() { return totalTasks; }
        public long getCompletedTasks() { return completedTasks; }
        public double getCompletionPercentage() { return completionPercentage; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private String name;
            private long totalTasks;
            private long completedTasks;
            private double completionPercentage;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder name(String name) { this.name = name; return this; }
            public Builder totalTasks(long v) { this.totalTasks = v; return this; }
            public Builder completedTasks(long v) { this.completedTasks = v; return this; }
            public Builder completionPercentage(double v) { this.completionPercentage = v; return this; }

            public ProjectSummary build() {
                ProjectSummary s = new ProjectSummary();
                s.id = id;
                s.name = name;
                s.totalTasks = totalTasks;
                s.completedTasks = completedTasks;
                s.completionPercentage = completionPercentage;
                return s;
            }
        }
    }

    // --- Nested: RecentTask ---

    public static class RecentTask {
        private Long id;
        private String title;
        private String status;
        private String projectName;
        private String deadline;

        public RecentTask() {}

        public Long getId() { return id; }
        public String getTitle() { return title; }
        public String getStatus() { return status; }
        public String getProjectName() { return projectName; }
        public String getDeadline() { return deadline; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private String title;
            private String status;
            private String projectName;
            private String deadline;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder title(String title) { this.title = title; return this; }
            public Builder status(String status) { this.status = status; return this; }
            public Builder projectName(String projectName) { this.projectName = projectName; return this; }
            public Builder deadline(String deadline) { this.deadline = deadline; return this; }

            public RecentTask build() {
                RecentTask t = new RecentTask();
                t.id = id;
                t.title = title;
                t.status = status;
                t.projectName = projectName;
                t.deadline = deadline;
                return t;
            }
        }
    }
}
