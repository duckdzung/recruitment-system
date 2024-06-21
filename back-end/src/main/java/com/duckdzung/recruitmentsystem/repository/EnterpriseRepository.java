package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.Enterprise;
import com.duckdzung.recruitmentsystem.model.idClass.EnterpriseId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnterpriseRepository extends JpaRepository<Enterprise, EnterpriseId> {
    Enterprise findByCompanyName(String companyName);
    Enterprise findByTaxCode(String taxCode);
    Enterprise findByMemberId(String memberId);
    void deleteByMemberId(String memberId);
    Optional<Enterprise> findFirstByIdStartsWithOrderByIdDesc(String prefix);

    @Query("SELECT e FROM Enterprise e WHERE e.id = ?1")
    Optional<Enterprise> findByEnterpriseId(String enterpriseId);

    Page<Enterprise> findAll(Specification<Enterprise> spec, Pageable pageable);
}
