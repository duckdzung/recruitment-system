package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.model.idClass.EnterpriseId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnterpriseRepository extends JpaRepository<Enterprise, EnterpriseId> {
    Enterprise findByCompanyName(String companyName);
    Enterprise findByTaxCode(String taxCode);

    Optional<Enterprise> findFirstByIdStartsWithOrderByIdDesc(String prefix);
}
