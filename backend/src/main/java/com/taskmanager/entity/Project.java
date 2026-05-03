package com.taskmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @JsonIgnoreProperties({ "password" }) // 🔴 hide password + avoid recursion
    @ManyToOne(fetch = FetchType.EAGER) // 🔴 FIX lazy loading crash
    @JoinColumn(name = "created_by")
    private User createdBy;

    public Project() {
    }

    public Project(Long id, String name, User createdBy) {
        this.id = id;
        this.name = name;
        this.createdBy = createdBy;
    }

    // 🔹 Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    // 🔹 Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    // 🔹 Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String name;
        private User createdBy;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder createdBy(User createdBy) {
            this.createdBy = createdBy;
            return this;
        }

        public Project build() {
            return new Project(id, name, createdBy);
        }
    }
}