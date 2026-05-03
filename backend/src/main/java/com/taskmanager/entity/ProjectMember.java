package com.taskmanager.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "project_members",
        uniqueConstraints = @UniqueConstraint(columnNames = {"project_id", "user_id"}))
public class ProjectMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public ProjectMember() {}

    public ProjectMember(Long id, Project project, User user) {
        this.id = id;
        this.project = project;
        this.user = user;
    }

    // Getters
    public Long getId() { return id; }
    public Project getProject() { return project; }
    public User getUser() { return user; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setProject(Project project) { this.project = project; }
    public void setUser(User user) { this.user = user; }

    // Builder
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Project project;
        private User user;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder project(Project project) { this.project = project; return this; }
        public Builder user(User user) { this.user = user; return this; }

        public ProjectMember build() {
            return new ProjectMember(id, project, user);
        }
    }
}
