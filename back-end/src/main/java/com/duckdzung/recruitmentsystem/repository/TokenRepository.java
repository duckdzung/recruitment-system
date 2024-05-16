package com.duckdzung.recruitmentsystem.repository;

import com.duckdzung.recruitmentsystem.model.RefreshToken;
import com.duckdzung.recruitmentsystem.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository<T extends Token> extends JpaRepository<T, String> {

    @Query(value = """
      select t from Token t inner join Member u\s
      on t.member.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
    List<T> findAllValidTokenByMember(String id);
    @Query(value = """
      select case when count(t) > 0 then true else false end\s
      from Token t\s
      where t.token = :token and (t.expired = false or t.revoked = false)\s
      """)
    Boolean isTokenValid(String token);

    Optional<RefreshToken> findRefreshTokenByToken(String refreshToken);
}