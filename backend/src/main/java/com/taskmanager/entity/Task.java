package com.taskmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private LocalDate deadline;

    @JsonIgnoreProperties({ "password" }) // 🔴 hide sensitive fields
    @ManyToOne(fetch = FetchType.EAGER) // 🔴 avoid lazy crash
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    @JsonIgnoreProperties({ "createdBy" }) // 🔴 prevent recursion
    @ManyToOne(fetch = FetchType.EAGER) // 🔴 avoid lazy proxy issue
    @JoinColumn(name = "project_id")
    private Project project;

    public Task() {
    }

    public Task(Long id, String title, String description, TaskStatus status,
            LocalDate deadline, User assignedTo, Project project) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.deadline = deadline;
        this.assignedTo = assignedTo;
        this.project = project;
    }

    // 🔹 Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public Project getProject() {
        return project;
    }

    // 🔹 Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    // 🔹 Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String title;
        private String description;
        private TaskStatus status;
        private LocalDate deadline;
        private User assignedTo;
        private Project project;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder status(TaskStatus status) {
            this.status = status;
            return this;
        }

        public Builder deadline(LocalDate deadline) {
            this.deadline = deadline;
            return this;
        }

        public Builder assignedTo(User assignedTo) {
            this.assignedTo = assignedTo;
            return this;
        }

        public Builder project(Project project) {
            this.project = project;
            return this;
        }

        public Task build() {
            return new Task(id, title, description, status, deadline, assignedTo, project);
        }
    }
}