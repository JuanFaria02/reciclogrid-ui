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
    <div className="mt-10 mx-4 md:mx-56 bg-white shadow-[0px_4px_200px_rgba(0,0,0,0.50)] h-auto max-h-[750px] overflow-x-auto rounded-xl">
      
      <table className="hidden md:table w-full border-collapse">
        <thead className="bg-[#F8F8F8]">
          <tr>
            <th className="p-4 text-center"></th>
            <th className="p-4 text-center">Categoria</th>
            <th className="p-4 text-center">Nome</th>
            <th className="p-4 text-center">Peso</th>
            <th className="p-4 text-center">Lotação</th>
            <th className="p-4 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {collectors.map((collector) => (
            <tr key={collector.id} className="border-b border-gray-200 h-20">
              <td className="text-center relative left-5">
                <CollectorIcon color={color(collector.percentage)} size={30} />
              </td>
              <td className="text-center">{collector.category || '-'}</td>
              <td className="text-center">{collector.name || '-'}</td>
              <td className="text-center">{collector.weight ?? '-'}</td>
              <td className="text-center">{collector.percentage === undefined || collector.percentage === null ? '-' : `${collector.percentage}%`}</td>
              <td className="text-center">
                <a href={`/coletor/${collector.id}`}>
                  <img src="/seta_detalhes.svg" alt="Detalhes" width="40" height="40" className="mx-auto cursor-pointer hover:scale-110 transition" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <div className="block md:hidden">
        {collectors.map((collector) => (
          <div key={collector.id} className="border-b border-gray-300 p-4">
            <div className="flex items-center gap-3 mb-2">
              <CollectorIcon color={color(collector.percentage)} size={25} />
              <strong>{collector.name || 'Sem Nome'}</strong>
            </div>
            <p><strong>Categoria:</strong> {collector.category || '-'}</p>
            <p><strong>Peso:</strong> {collector.weight ?? '-'}</p>
            <p><strong>Lotação:</strong> {collector.percentage ?? '-'}%</p>
            <div className="mt-2">
              <a href={`/coletor/${collector.id}`}>
                <img src="/seta_detalhes.svg" alt="Detalhes" width="30" height="30" className="cursor-pointer hover:scale-110 transition" />
              </a>
            </div>
          </div>
        ))}
      </div>
  
      <div className="flex justify-between items-center px-6 py-4">
        <p className="text-sm text-gray-600">
          Página {page + 1}/{totalPages} — Total de {totalElements} coletores
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
  )
};

export default Collectors;