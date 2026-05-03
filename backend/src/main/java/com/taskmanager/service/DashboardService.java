package com.taskmanager.service;

import com.taskmanager.dto.DashboardResponse;
import com.taskmanager.entity.Project;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskStatus;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

        private final ProjectRepository projectRepository;
        private final TaskRepository taskRepository;

        public DashboardService(ProjectRepository projectRepository,
                        TaskRepository taskRepository) {
                this.projectRepository = projectRepository;
                this.taskRepository = taskRepository;
        }

        public DashboardResponse getDashboard() {

                List<Project> projects = projectRepository.findAll();
                List<Task> tasks = taskRepository.findAll();

                long totalProjects = projects.size();
                long totalTasks = tasks.size();

                long completed = tasks.stream()
                                .filter(t -> t.getStatus() == TaskStatus.DONE)
                                .count();

                long inProgress = tasks.stream()
                                .filter(t -> t.getStatus() == TaskStatus.IN_PROGRESS)
                                .count();

                long todo = tasks.stream()
                                .filter(t -> t.getStatus() == TaskStatus.TODO)
                                .count();

                List<DashboardResponse.ProjectSummary> summaries = new ArrayList<>();
                for (Project project : projects) {
                        long totalForProject = tasks.stream()
                                        .filter(t -> t.getProject() != null && t.getProject().getId().equals(project.getId()))
                                        .count();
                        long completedForProject = tasks.stream()
                                        .filter(t -> t.getProject() != null && t.getProject().getId().equals(project.getId()))
                                        .filter(t -> t.getStatus() == TaskStatus.DONE)
                                        .count();
                        summaries.add(DashboardResponse.ProjectSummary.builder()
                                        .id(project.getId())
                                        .name(project.getName())
                                        .totalTasks(totalForProject)
                                        .completedTasks(completedForProject)
                                        .completionPercentage(totalForProject == 0 ? 0.0 : (completedForProject * 100.0 / totalForProject))
                                        .build());
                }

                List<DashboardResponse.RecentTask> recent = new ArrayList<>();
                tasks.stream()
                        .sorted((a, b) -> b.getId().compareTo(a.getId()))
                        .limit(5)
                        .forEach(task -> recent.add(DashboardResponse.RecentTask.builder()
                                        .id(task.getId())
                                        .title(task.getTitle())
                                        .status(task.getStatus() != null ? task.getStatus().name() : "TODO")
                                        .projectName(task.getProject() != null ? task.getProject().getName() : "Unknown")
                                        .deadline(task.getDeadline() != null ? task.getDeadline().toString() : null)
                                        .build()));

                return DashboardResponse.builder()
                                .totalProjects(totalProjects)
                                .totalTasks(totalTasks)
                                .completedTasks(completed)
                                .inProgressTasks(inProgress)
                                .todoTasks(todo)
                                .recentTasks(recent)
                                .projectSummaries(summaries)
                                .build();
        }
}
