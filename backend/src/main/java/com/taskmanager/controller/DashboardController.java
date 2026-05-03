package com.taskmanager.controller;

import com.taskmanager.dto.DashboardResponse;
import com.taskmanager.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // 🔹 Get dashboard data
    @GetMapping
    public DashboardResponse getDashboard() {
        return dashboardService.getDashboard();
    }
}