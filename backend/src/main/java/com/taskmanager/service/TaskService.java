package com.taskmanager.service;

import com.taskmanager.dto.TaskRequest;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskStatus;
import com.taskmanager.entity.Project;
import com.taskmanager.entity.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository,
            UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<Task> getByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    public Task getById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task create(TaskRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User assignedTo = null;
        if (request.getAssignedToId() != null) {
            assignedTo = userRepository.findById(request.getAssignedToId()).orElse(null);
        }

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO)
                .deadline(request.getDeadline())
                .project(project)
                .assignedTo(assignedTo)
                .build();

        return taskRepository.save(task);
    }

    public Task update(Long id, TaskRequest request) {
        Task task = getById(id);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setDeadline(request.getDeadline());

        if (request.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(request.getAssignedToId()).orElse(null);
            task.setAssignedTo(assignedTo);
        } else {
            task.setAssignedTo(null);
        }

        return taskRepository.save(task);
    }

    @Transactional
    public Task updateStatus(Long id, TaskStatus status) {
        Task task = getById(id);
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public void delete(Long id) {
        taskRepository.deleteById(id);
    }
}
