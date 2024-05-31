package com.duckdzung.recruitmentsystem.model.idClass;

import com.duckdzung.recruitmentsystem.model.RecruitmentInformation;
import org.hibernate.proxy.HibernateProxy;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

public class AdvertisingFormKey implements Serializable {
    // Recruitment ID
    RecruitmentInformation recruitmentInformation;
    // Datetime of recruitment launched
    LocalDate recruitmentTime;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        AdvertisingFormKey that = (AdvertisingFormKey) o;
        return recruitmentInformation != null && Objects.equals(recruitmentInformation, that.recruitmentInformation)
                && recruitmentTime != null && Objects.equals(recruitmentTime, that.recruitmentTime);
    }

    @Override
    public final int hashCode() {
        return Objects.hash(recruitmentInformation, recruitmentTime);
    }
}
