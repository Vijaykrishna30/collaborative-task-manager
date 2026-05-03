package com.taskmanager.controller;

import com.taskmanager.dto.ProjectRequest;
import com.taskmanager.entity.Project;
import com.taskmanager.entity.ProjectMember;
import com.taskmanager.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // 🔹 Get all projects
    @GetMapping
    public ResponseEntity<List<Project>> getAll() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    // 🔹 Get single project
    @GetMapping("/{id}")
    public ResponseEntity<Project> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getById(id));
    }

    // 🔹 Create project
    @PostMapping
    public ResponseEntity<Project> create(@Valid @RequestBody ProjectRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.create(request));
    }

    // 🔹 Update project
    @PutMapping("/{id}")
    public ResponseEntity<Project> update(@PathVariable Long id,
                                          @Valid @RequestBody ProjectRequest request) {
        return ResponseEntity.ok(projectService.update(id, request));
    }

    // 🔹 Delete project
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // 🔹 Get members
    @GetMapping("/{id}/members")
    public ResponseEntity<List<ProjectMember>> getMembers(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getMembers(id));
    }

    // 🔹 Add member
    @PostMapping("/{id}/members")
    public ResponseEntity<ProjectMember> addMember(@PathVariable Long id,
                                                   @RequestBody Map<String, Object> body) {

        Long userId = Long.valueOf(body.get("userId").toString());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.addMember(id, userId));
    }

    // 🔹 Remove member
    @DeleteMapping("/{id}/members/{userId}")
    public ResponseEntity<Void> removeMember(@PathVariable Long id,
                                             @PathVariable Long userId) {

        projectService.removeMember(id, userId);
        return ResponseEntity.noContent().build();
    }
}