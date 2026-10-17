
package com.klef.soa.exam.service;

import java.util.List;
import com.klef.soa.exam.entity.ElectricityBill;

public interface ElectricityBillService {

    ElectricityBill addBill(ElectricityBill bill);

    List<ElectricityBill> getAllBills();

    boolean deleteBill(Long id);
}
