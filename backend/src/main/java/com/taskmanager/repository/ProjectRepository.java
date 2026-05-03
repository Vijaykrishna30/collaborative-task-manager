package com.taskmanager.repository;

import com.taskmanager.entity.Project;
import com.taskmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByCreatedBy(User createdBy);

    @Query("""
            SELECT DISTINCT p FROM Project p
            LEFT JOIN ProjectMember pm ON pm.project = p
            WHERE p.createdBy = :user OR pm.user = :user
            ORDER BY p.id DESC
            """)
    List<Project> findAllAccessibleByUser(@Param("user") User user);
}
