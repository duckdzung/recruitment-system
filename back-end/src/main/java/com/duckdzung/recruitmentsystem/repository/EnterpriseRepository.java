package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnterpriseRepository extends JpaRepository<Enterprise, String> {
    Enterprise findByCompanyName(String companyName);
    Enterprise findByTaxCode(String taxCode);
}
