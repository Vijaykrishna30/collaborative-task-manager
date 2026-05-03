package com.taskmanager.service;

import com.taskmanager.dto.ProjectRequest;
import com.taskmanager.entity.Project;
import com.taskmanager.entity.ProjectMember;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.ProjectMemberRepository;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, ProjectMemberRepository projectMemberRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.projectMemberRepository = projectMemberRepository;
        this.userRepository = userRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getById(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public Project create(ProjectRequest request) {
        // Assume user ID 1 is the creator for now, as auth is not fully wired.
        User creator = userRepository.findById(1L).orElse(null);
        
        Project project = Project.builder()
                .name(request.getName())
                .createdBy(creator)
                .build();
        return projectRepository.save(project);
    }

    public Project update(Long id, ProjectRequest request) {
        Project project = getById(id);
        project.setName(request.getName());
        return projectRepository.save(project);
    }

    public void delete(Long id) {
        projectRepository.deleteById(id);
    }

    public List<ProjectMember> getMembers(Long id) {
        Project project = getById(id);
        return projectMemberRepository.findByProject(project);
    }

    public ProjectMember addMember(Long id, Long userId) {
        Project project = getById(id);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        ProjectMember member = ProjectMember.builder()
                .project(project)
                .user(user)
                .build();
        return projectMemberRepository.save(member);
    }

    public void removeMember(Long id, Long userId) {
        Project project = getById(id);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        projectMemberRepository.deleteByProjectAndUser(project, user);
    }
}
