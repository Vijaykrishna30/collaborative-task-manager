package com.taskmanager.dto;

import com.taskmanager.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TaskRequest {

    @NotBlank(message = "Task title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    private String description;

    private TaskStatus status;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;

    @NotNull(message = "Project ID is required")
    private Long projectId;

    private Long assignedToId;

    public TaskRequest() {}

    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public TaskStatus getStatus() { return status; }
    public LocalDate getDeadline() { return deadline; }
    public Long getProjectId() { return projectId; }
    public Long getAssignedToId() { return assignedToId; }

    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setStatus(TaskStatus status) { this.status = status; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }
    public void setAssignedToId(Long assignedToId) { this.assignedToId = assignedToId; }
}
