package com.duckdzung.recruitmentsystem.model.idClass;

import com.duckdzung.recruitmentsystem.model.Nominee;
import com.duckdzung.recruitmentsystem.model.RecruitmentInformation;
import org.hibernate.proxy.HibernateProxy;

import java.io.Serializable;
import java.util.Objects;


public class RecruitmentDetailsKey implements Serializable {
    RecruitmentInformation recruitmentInformation;
    Nominee nominee;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        RecruitmentDetailsKey that = (RecruitmentDetailsKey) o;
        return recruitmentInformation != null && Objects.equals(recruitmentInformation, that.recruitmentInformation)
                && nominee != null && Objects.equals(nominee, that.nominee);
    }

    @Override
    public final int hashCode() {
        return Objects.hash(recruitmentInformation, nominee);
    }
}
