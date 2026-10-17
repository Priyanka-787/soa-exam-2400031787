package com.klef.soa.exam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.soa.exam.entity.ElectricityBill;

public interface ElectricityBillRepository
        extends JpaRepository<ElectricityBill, Long> {
}