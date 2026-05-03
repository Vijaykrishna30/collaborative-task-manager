package com.taskmanager.controller;

import com.taskmanager.dto.TaskRequest;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskStatus;
import com.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // 🔹 Get all tasks by project
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Task>> getByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(taskService.getByProject(projectId));
    }

    // 🔹 Get single task
    @GetMapping("/{id}")
    public ResponseEntity<Task> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getById(id));
    }

    // 🔹 Create task
    @PostMapping
    public ResponseEntity<Task> create(@Valid @RequestBody TaskRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taskService.create(request));
    }

    // 🔹 Update task
    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id,
            @Valid @RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.update(id, request));
    }

    // 🔹 Update status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> updateStatus(@PathVariable Long id,
            @RequestBody Map<String, String> body) {

        String statusStr = body.get("status");

        if (statusStr == null) {
            throw new RuntimeException("Status is required");
        }

        TaskStatus status;
        try {
            status = TaskStatus.valueOf(statusStr.trim().toUpperCase());
        } catch (Exception e) {
            throw new RuntimeException("Invalid status value");
        }

        return ResponseEntity.ok(taskService.updateStatus(id, status));
    }

    // 🔹 Delete task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleExceptions(Exception e) {
        e.printStackTrace();
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Internal Server Error");
        errorResponse.put("message", e.getMessage() != null ? e.getMessage() : e.toString());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}