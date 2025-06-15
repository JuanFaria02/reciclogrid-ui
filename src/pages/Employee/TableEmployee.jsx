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
      if (page > 0) {
        setPage((prev) => prev - 1);
      }
    };
  
    const nextPage = () => {
      if (page < totalPages - 1) {
        setPage((prev) => prev + 1);
      }
    };
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <ClipLoader
              color="white"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
          />
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
        <div className="mt-10 ml-56 mr-56 bg-white grid shadow-[0px_4px_200px_rgba(0,0,0,0.50)] h-auto max-h-[750px]">
        <table className="w-full border-collapse">
          <thead className="bg-[#F8F8F8]">
            <tr>
              <th className="p-8">Nome</th>
              <th className="p-8 text-center">Email</th>
              <th className="p-8 text-center">Quantidade de Coletores</th>
              <th className="p-8 text-center">Telefone</th>
              <th className="p-8 text-center">Cargo</th>
              <th className="p-8"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
                <tr key={employee.id} className="border-1 border-gray-200 relative h-24">
                <td className="p-4 text-center">{employee.name || '-'}</td>
                <td className="p-4 text-center">{employee.email || '-'}</td>
                <td className="p-4 text-center">{employee.collectorsCount ?? '-'}</td>
                <td className="p-4 text-center">{employee.phone || '-'}</td>
                <td className="p-4 text-center">{employee.position || '-'}</td>
                <td className="p-4 text-center">
                  <a href={`/operador/${employee.id}`} passHref>
                    <img
                      className="hover:bg-green-100 transition cursor-pointer mx-auto"
                      src="/seta_detalhes.svg"
                      alt="Detalhes do Coletor"
                      title="Detalhes do Coletor"
                      width="50"
                      height="50"
                    />
                  </a>
                </td>
                </tr>
            ))}
            </tbody>          

            <tfoot className="h-20">
                <tr>
                <td colSpan={6}>
                    <div className="flex justify-between items-center w-full pr-10">
                    <div>
                        <p className="relative left-2.5 text-sm text-gray-600">
                        Página {page + 1}/{totalPages} — Total de {totalElements} operadores
                        </p>
                    </div>
                    <div className="flex">
                        <button
                        onClick={prevPage}
                        disabled={page === 0}
                        style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                        className="transform transition-transform duration-200 hover:scale-110 relative disabled:opacity-50">
                        <img
                            src="/seta_prox_esq_pag.svg"
                            alt="Voltar página"
                            width="50"
                            height="50"
                            className="cursor-pointer relative right-3"
                        />
                        </button>
                        <button
                        onClick={nextPage}
                        disabled={page >= totalPages - 1}
                        style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                        className="transform transition-transform duration-200 hover:scale-110 relative  disabled:opacity-50">
                        <img
                            src="/seta_prox_dir_pag.svg"
                            alt="Avançar página"
                            width="50"
                            height="50"
                            className="cursor-pointer"
                        />
                        </button>
                    </div>
                    </div>
                </td>
                </tr>
            </tfoot>
        </table>
      </div>
    )
}

export default TableEmployee