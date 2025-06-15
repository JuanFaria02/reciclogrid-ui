import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useEmployees } from "../../hooks/useEmployees";

const TableEmployee = () => {
  const [page, setPage] = useState(0);
  const size = 5;

  const {
    employees,
    loading,
    error,
    totalPages,
    totalElements
  } = useEmployees({ page, size, sort: 'id', direction: 'asc' });

  const prevPage = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const nextPage = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="white" loading={loading} size={150} aria-label="Loading Spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mx-4 md:mx-56 bg-white shadow-[0px_4px_200px_rgba(0,0,0,0.50)] h-auto max-h-[750px] overflow-x-auto rounded-xl">
      
      <table className="hidden md:table w-full border-collapse">
        <thead className="bg-[#F8F8F8]">
          <tr>
            <th className="p-4 text-center">Nome</th>
            <th className="p-4 text-center">Email</th>
            <th className="p-4 text-center">Qtd Coletores</th>
            <th className="p-4 text-center">Telefone</th>
            <th className="p-4 text-center">Cargo</th>
            <th className="p-4 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b border-gray-200 h-20">
              <td className="text-center">{employee.name || '-'}</td>
              <td className="text-center">{employee.email || '-'}</td>
              <td className="text-center">{employee.collectorsCount ?? '-'}</td>
              <td className="text-center">{employee.phone || '-'}</td>
              <td className="text-center">{employee.position || '-'}</td>
              <td className="text-center">
                <a href={`/operador/${employee.id}`}>
                  <img
                    src="/seta_detalhes.svg"
                    alt="Detalhes"
                    width="40"
                    height="40"
                    className="mx-auto cursor-pointer hover:scale-110 transition"
                  />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="block md:hidden">
        {employees.map((employee) => (
          <div key={employee.id} className="border-b border-gray-300 p-4">
            <strong className="block mb-2">{employee.name || 'Sem Nome'}</strong>
            <p><strong>Email:</strong> {employee.email || '-'}</p>
            <p><strong>Qtd Coletores:</strong> {employee.collectorsCount ?? '-'}</p>
            <p><strong>Telefone:</strong> {employee.phone || '-'}</p>
            <p><strong>Cargo:</strong> {employee.position || '-'}</p>
            <div className="mt-2">
              <a href={`/operador/${employee.id}`}>
                <img
                  src="/seta_detalhes.svg"
                  alt="Detalhes"
                  width="30"
                  height="30"
                  className="cursor-pointer hover:scale-110 transition"
                />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center px-6 py-4">
        <p className="text-sm text-gray-600">
          Página {page + 1}/{totalPages} — Total de {totalElements} operadores
        </p>
        <div className="flex">
          <button onClick={prevPage} disabled={page === 0} className="disabled:opacity-50 hover:scale-110 transition mr-2.5">
            <img src="/seta_prox_esq_pag.svg" alt="Anterior" width="40" height="40" />
          </button>
          <button onClick={nextPage} disabled={page >= totalPages - 1} className="disabled:opacity-50 hover:scale-110 transition">
            <img src="/seta_prox_dir_pag.svg" alt="Próxima" width="40" height="40" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableEmployee;
