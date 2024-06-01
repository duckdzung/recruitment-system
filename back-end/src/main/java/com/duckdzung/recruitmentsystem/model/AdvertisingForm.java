package com.duckdzung.recruitmentsystem.model;

import com.duckdzung.recruitmentsystem.model.enums.AdvertisingType;
import com.duckdzung.recruitmentsystem.model.idClass.AdvertisingFormKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.proxy.HibernateProxy;

import java.time.LocalDateTime;
import java.util.Objects;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "advertising_form")
@IdClass(AdvertisingFormKey.class)
public class AdvertisingForm {


    // Recruitment method
    @Enumerated(EnumType.STRING)
    @Column(length = 30, nullable = false)
    AdvertisingType advertisingType;

    @Id
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recruit_id", nullable = false)
    @JsonIgnore
    RecruitmentInformation recruitmentInformation;

    @Id
    @Column(nullable = false)
    LocalDateTime recruitmentTime;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        AdvertisingForm that = (AdvertisingForm) o;
        return  getRecruitmentTime() != null && Objects.equals(getRecruitmentTime(), that.getRecruitmentTime())
                && getAdvertisingType() != null && Objects.equals(getAdvertisingType(), that.getAdvertisingType());
    }

    @Override
    public final int hashCode() {
        return Objects.hash(recruitmentTime, advertisingType);
    }
}
