package com.duckdzung.recruitmentsystem.service;

import com.duckdzung.recruitmentsystem.model.Nominee;
import com.duckdzung.recruitmentsystem.repository.NomineeRepository;
import org.springframework.stereotype.Service;

@Service
public class NomineeService {
    private final NomineeRepository nomineeRepository;

    public NomineeService(NomineeRepository nomineeRepository) {
        this.nomineeRepository = nomineeRepository;
    }

    public Nominee createNominee(String position, String description) {
        return nomineeRepository.save(Nominee.builder()
                .position(position)
                .description(description)
                .build());
    }

    public Iterable<Nominee> getAllNominees() {
        return nomineeRepository.findAll();
    }

    public Nominee getNomineeById(int id) {
        return nomineeRepository.findById(id).orElse(null);
    }

    public Nominee updateNominee(int id, String position, String description) {
        Nominee nominee = nomineeRepository.findById(id).orElse(null);
        if (nominee == null) {
            return null;
        }
        nominee.setPosition(position);
        nominee.setDescription(description);
        return nomineeRepository.save(nominee);
    }

    public void deleteNominee(int id) {
        nomineeRepository.deleteById(id);
    }
}
