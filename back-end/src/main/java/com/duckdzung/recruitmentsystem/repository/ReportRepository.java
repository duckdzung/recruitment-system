package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
    // find report using month and year of Date
    @Query("SELECT r FROM Report r WHERE MONTH(r.date) = ?1 AND YEAR(r.date) = ?2")
    Report findByDate_MonthAndDate_Year(int month, int year);
}
