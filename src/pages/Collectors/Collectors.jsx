import { useState } from "react";
import CollectorIcon from "../../components/icons/CollectorIcon";
import { useCollectors } from "../../hooks/useCollectors";
import { ClipLoader } from "react-spinners";

const Collectors = () => {
  const [page, setPage] = useState(0);
  const size = 5;

  const {
    collectors,
    loading,
    error,
    totalPages,
    totalElements
  } = useCollectors({ page, size, sort: 'id', direction: 'asc' });

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

  const color = (p) => (p <= 25 ? "green" : p <= 85 ? "yellow" : "red");

  return (
    <div className="mt-10 ml-56 mr-56 bg-white grid shadow-[0px_4px_200px_rgba(0,0,0,0.50)] h-auto max-h-[750px]">
      <table className="w-full border-collapse">
        <thead className="bg-[#F8F8F8]">
          <tr>
            <th className="p-8"></th>
            <th className="p-8 text-center">Categoria</th>
            <th className="p-8 text-center">Nome</th>
            <th className="p-8 text-center">Peso</th>
            <th className="p-8 text-center">Lotação</th>
            <th className="p-8"></th>
          </tr>
        </thead>
        <tbody>
          {collectors.map((collector) => (
            <tr key={collector.id}>
              <td colSpan={6} className="px-8 h-3 py-4">
                <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-5">
                  <CollectorIcon color={color(collector.percentage)} size={35} />
                  <span className="text-center font-medium flex-1 relative left-16">
                    {collector.category}
                  </span>
                  <span className="text-center flex-1 relative left-[70px]">
                    {collector.name}
                  </span>
                  <span className="text-center flex-1">
                    {collector.weight}
                  </span>
                  <span className="text-center flex-1 relative right-[50px]">
                    {collector.percentage}
                  </span>
                  <img
                    className="hover:bg-green-100 transition cursor-pointer"
                    src="/seta_detalhes.svg"
                    alt="Detalhes do Coletor"
                    title="Detalhes do Coletor"
                    width="50"
                    height="50"
                  />
                </div>
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
                    Página {page + 1}/{totalPages} — Total de {totalElements} coletor
                  </p>
                </div>
                <div className="flex">
                  <button
                    onClick={prevPage}
                    disabled={page === 0}
                    style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                    className="transform transition-transform duration-200 hover:scale-110 relative bottom-5 disabled:opacity-50">
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
                    className="transform transition-transform duration-200 hover:scale-110 relative bottom-5 disabled:opacity-50">
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
  );
};

export default Collectors;