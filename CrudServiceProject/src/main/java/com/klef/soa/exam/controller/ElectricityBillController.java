package com.klef.soa.exam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.exam.entity.ElectricityBill;
import com.klef.soa.exam.service.ElectricityBillService;

@RestController
public class ElectricityBillController {

    private final ElectricityBillService service;

    public ElectricityBillController(ElectricityBillService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String bill() {
        return "CRUD Service is running";
    }

    @PostMapping("/Add")
    public ResponseEntity<ElectricityBill> add(
            @RequestBody ElectricityBill bill) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.addBill(bill));
    }

    @GetMapping("/DisplayAll")
    public List<ElectricityBill> displayAll() {
        return service.getAllBills();
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if (service.deleteBill(id)) {
            return ResponseEntity.ok(
                    "Record with ID " + id + " deleted successfully");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Record with ID " + id + " not found");
    }
}