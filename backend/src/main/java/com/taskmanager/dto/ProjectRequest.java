package com.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProjectRequest {

    @NotBlank(message = "Project name is required")
    @Size(max = 100, message = "Project name must not exceed 100 characters")
    private String name;

    public ProjectRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
