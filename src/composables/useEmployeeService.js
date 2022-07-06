import { useAxios } from '@vueuse/integrations/useAxios';
import useBaseAxiosInstance from './useBaseAxiosInstance';

export default function useEmployeeService() {
  const defaultPageSize = 10;

  const getEmployees = () => {
    const { instance } = useBaseAxiosInstance();

    return useAxios(
      '/employees',
      {
        method: 'GET',
      },
      instance.value,
    );
  };

  const getEmployeesWithPaging = ({ page, pageSize }) => {
    const { instance } = useBaseAxiosInstance();

    return useAxios(
      '/employees',
      {
        method: 'GET',
        params: { _page: page || 1, _limit: pageSize || defaultPageSize },
      },
      instance.value,
    );
  };

  const getEmployeesById = (id) => {
    const { instance } = useBaseAxiosInstance();

    return useAxios(
      `/employees/${id}`,
      {
        method: 'GET',
      },
      instance.value,
    );
  };

  const getEmployeesByIds = ({ ids }) => {
    const { instance } = useBaseAxiosInstance();
    // regex to match a list of ids one by one using lookahead, lookbehinds and non-capturing groups
    // given list: 1, 2, 3, 4
    // regex will be: (?:^|(?<= ))(1|2|3|4)})(?:(?= )|$)
    // will match records where id = 1 or 2 or 3 or 4
    const searchString = `(?:^|(?<= ))(${ids.join('|')})(?:(?= )|$)`;

    return useAxios(
      `/employees?id_like=${searchString}`,
      {
        method: 'GET',
      },
      instance.value,
    );
  };

  const getEmployeesByIdsCountryAndGenderWithPaging = ({
    ids,
    page,
    pageSize,
    country,
    gender,
  }) => {
    const { instance } = useBaseAxiosInstance();
    const searchString = `(?:^|(?<= ))(${ids.join('|')})(?:(?= )|$)`;

    return useAxios(
      `/employees?id_like=${searchString}`,
      {
        method: 'GET',
        params: {
          gender: gender === 'a' ? null : gender,
          nat: country === 'All' ? null : country,
          _page: page || 1,
          _limit: pageSize || defaultPageSize,
        },
      },
      instance.value,
    );
  };

  const getEmployeesByCountryAndGenderWithPaging = ({
    country,
    gender,
    page,
    pageSize,
  }) => {
    const { instance } = useBaseAxiosInstance();

    return useAxios(
      '/employees',
      {
        method: 'GET',
        params: {
          gender: gender === 'a' ? null : gender,
          nat: country === 'All' ? null : country,
          _page: page || 1,
          _limit: pageSize,
        },
      },
      instance.value,
    );
  };

  const createEmployee = (employee) => {
    const { instance } = useBaseAxiosInstance();

    return useAxios(
      '/employees',
      {
        method: 'POST',
        data: employee,
      },
      instance.value,
    );
  };

  const updateEmployeeById = (id, employee) => {
    const { instance } = useBaseAxiosInstance();

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
    const { instance } = useBaseAxiosInstance();

    return useAxios(
      `/employees/${id}`,
      {
        method: 'DELETE',
      },
      instance.value,
    );
  };

  return {
    defaultPageSize,
    getEmployees,
    getEmployeesWithPaging,
    getEmployeesById,
    getEmployeesByIds,
    getEmployeesByIdsCountryAndGenderWithPaging,
    getEmployeesByCountryAndGenderWithPaging,
    createEmployee,
    updateEmployeeById,
    deleteEmployeeById,
  };
}
