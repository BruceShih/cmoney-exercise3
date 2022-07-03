import { useAxios } from '@vueuse/integrations/useAxios';
import useBaseAxiosInstance from './useBaseAxiosInstance';

export default function useEmployeeService() {
  const pageSize = 10;

  const getEmployees = () => {
    const instance = useBaseAxiosInstance();

    return useAxios(
      '/employees',
      {
        method: 'GET',
      },
      instance.value,
    );
  };

  const getEmployeesWithPaging = (page) => {
    const instance = useBaseAxiosInstance();

    return useAxios(
      '/employees',
      {
        method: 'GET',
        params: { _page: page || 1, _limit: pageSize },
      },
      instance.value,
    );
  };

  const getEmployeesByIdWithPaging = (id, page) => {
    const instance = useBaseAxiosInstance();

    return useAxios(
      `/employees/${id}`,
      {
        method: 'GET',
        params: { _page: page || 1, _limit: pageSize },
      },
      instance.value,
    );
  };

  const getEmployeesByCountryAndGenderWithPaging = (country, gender, page) => {
    const instance = useBaseAxiosInstance();

    return useAxios(
      '/employees',
      {
        method: 'GET',
        params: {
          gender: gender || null,
          'location.country': country || null,
          _page: page || 1,
          _limit: pageSize,
        },
      },
      instance.value,
    );
  };

  const updateEmployeeById = (id, employee) => {
    const instance = useBaseAxiosInstance();

    return useAxios(
      `/employees/${id}`,
      {
        method: 'PUT',
        data: employee,
      },
      instance.value,
    );
  };

  const deleteEmployeeById = (id) => {
    const instance = useBaseAxiosInstance();

    return useAxios(
      `/employees/${id}`,
      {
        method: 'DELETE',
      },
      instance.value,
    );
  };

  return {
    pageSize,
    getEmployees,
    getEmployeesWithPaging,
    getEmployeesByIdWithPaging,
    getEmployeesByCountryAndGenderWithPaging,
    updateEmployeeById,
    deleteEmployeeById,
  };
}
