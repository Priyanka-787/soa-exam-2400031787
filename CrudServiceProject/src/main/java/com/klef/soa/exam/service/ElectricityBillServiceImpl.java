package com.klef.soa.exam.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.klef.soa.exam.entity.ElectricityBill;
import com.klef.soa.exam.repository.ElectricityBillRepository;

@Service
public class ElectricityBillServiceImpl implements ElectricityBillService {

    private final ElectricityBillRepository repository;

    public ElectricityBillServiceImpl(ElectricityBillRepository repository) {
        this.repository = repository;
    }

    @Override
    public ElectricityBill addBill(ElectricityBill bill) {
        return repository.save(bill);
    }

    @Override
    public List<ElectricityBill> getAllBills() {
        return repository.findAll();
    }

    @Override
    public boolean deleteBill(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}