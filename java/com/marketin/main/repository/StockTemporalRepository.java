package com.marketin.main.repository;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.StockTemporal;

public interface StockTemporalRepository extends CrudRepository <StockTemporal, Long>
{

}
