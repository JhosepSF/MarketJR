package com.marketin.main.repository;

import java.sql.Date;

import org.springframework.data.repository.CrudRepository;

import com.marketin.main.models.ReporteDiario;

public interface ReporteDiarioRepository extends CrudRepository<ReporteDiario, Long>
{
	ReporteDiario findByFecha(Date fecha);
}
