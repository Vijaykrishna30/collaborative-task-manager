package com.taskmanager.repository;

import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskStatus;
import com.taskmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByProjectId(Long projectId);

    List<Task> findByAssignedTo(User user);

    List<Task> findByProjectIdAndStatus(Long projectId, TaskStatus status);

    long countByProjectId(Long projectId);

    long countByProjectIdAndStatus(Long projectId, TaskStatus status);
}
