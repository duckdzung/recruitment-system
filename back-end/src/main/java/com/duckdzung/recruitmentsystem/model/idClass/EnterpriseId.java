package com.duckdzung.recruitmentsystem.model.idClass;

import com.duckdzung.recruitmentsystem.model.Member;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class EnterpriseId implements Serializable {
    String memberId;
}
