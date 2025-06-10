import { useState } from "react";
import CollectorIcon from "../../components/icons/CollectorIcon";
import { useCollectors } from "../../hooks/useCollectors";
import { ClipLoader } from "react-spinners";
import { color } from "../../utils/utils";

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

  return (
    <div className="mt-10 ml-56 mr-56 bg-white grid shadow-[0px_4px_200px_rgba(0,0,0,0.50)] h-auto max-h-[750px]">
      <table className="w-full border-collapse">
        <thead className="bg-[#F8F8F8]">
          <tr>
            <th className="p-8 text-center"></th>
            <th className="p-8 text-center">Categoria</th>
            <th className="p-8 text-center">Nome</th>
            <th className="p-8 text-center">Peso</th>
            <th className="p-8 text-center">Lotação</th>
            <th className="p-8 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {collectors.map((collector) => (
            <tr key={collector.id} className="border-1 border-gray-200 relative h-24">
              <td className="p-4 text-center">
                <CollectorIcon color={color(collector.percentage)} size={35} />
              </td>
              <td className="p-4 text-center">{collector.category || '-'}</td>
              <td className="p-4 text-center">{collector.name || '-'}</td>
              <td className="p-4 text-center">{collector.weight ?? '-'}</td>
              <td className="p-4 text-center">{collector.percentage ?? '-'}</td>
              <td className="p-4 text-center">
                <a href={`/coletores/${collector.id}`} passHref>
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
                    Página {page + 1}/{totalPages} — Total de {totalElements} coletores
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
                    className="transform transition-transform duration-200 hover:scale-110 relative disabled:opacity-50">
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