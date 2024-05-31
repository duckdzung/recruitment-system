package com.duckdzung.recruitmentsystem.model;

import com.duckdzung.recruitmentsystem.model.idClass.RecruitmentDetailsKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recruitment_details")
@IdClass(RecruitmentDetailsKey.class)
public class RecruitmentDetails {

    @Column(nullable = false)
    int quantity;
    @Column(length = 50)
    String requiredInfo;
    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recruit_id", nullable = false)
    RecruitmentInformation recruitmentInformation;
    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "nominee_id", nullable = false)
    Nominee nominee;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        RecruitmentDetails that = (RecruitmentDetails) o;
        return getNominee().getPosition() != null && Objects.equals(getNominee().getPosition(), that.getNominee().getPosition());
    }

    @Override
    public final int hashCode() {
        return Objects.hash(getNominee().getPosition());
    }


}
