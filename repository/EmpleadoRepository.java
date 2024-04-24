package com.marketin.main.repository;

import org.springframework.data.repository.CrudRepository;
import com.marketin.main.models.Empleado;

import java.util.Optional;

public interface EmpleadoRepository extends CrudRepository <Empleado, String>
{
    Optional<Empleado> findByEmpleadoDni(String empleadoDni);
    Empleado findByEmpleadoNombre(String nombre);
    boolean existsByEmpleadoDni(String dni);
}
