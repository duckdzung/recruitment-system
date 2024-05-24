package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.AdvertisingForm;
import com.duckdzung.recruitmentsystem.model.idClass.AdvertisingFormKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvertisingFormRepository extends JpaRepository<AdvertisingForm, AdvertisingFormKey> {
}
