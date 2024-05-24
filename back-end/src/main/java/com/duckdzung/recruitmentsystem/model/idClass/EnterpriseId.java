package com.duckdzung.recruitmentsystem.model.idClass;

import jakarta.persistence.Embeddable;
import org.hibernate.proxy.HibernateProxy;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class EnterpriseId implements Serializable {
    String memberId;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        EnterpriseId that = (EnterpriseId) o;
        return memberId != null && Objects.equals(memberId, that.memberId);
    }

    @Override
    public final int hashCode() {
        return Objects.hash(memberId);
    }
}
