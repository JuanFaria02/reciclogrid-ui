import { useParams } from "react-router-dom";
import { useCollector } from "../../hooks/useCollector";
import { color } from "../../utils/utils";
import CollectorIcon from "../../components/icons/CollectorIcon";

const ViewCollector = () => {
  const { collectorId } = useParams();
  const { collector, loading, error } = useCollector(collectorId);

  if (loading) return <div className="text-center mt-10">Carregando coletor...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Erro ao carregar coletor.</div>;
  if (!collector) return <div className="text-center mt-10">Coletor não encontrado.</div>;

  const statusColor = color(collector.percentage);
  const statusLabel =
    collector.percentage < 50
      ? "Lotação Baixa"
      : collector.percentage < 85
      ? "Lotação Média"
      : "Lotação Alta";

  return (
    <div className="mt-10 mx-auto bg-white p-10 shadow-[0px_4px_80px_rgba(0,0,0,0.2)] max-w-5xl rounded-2xl border border-gray-200">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-700">Coletor - {collector.name}</h1>
          <div className="flex items-center gap-2 mt-4">
            <CollectorIcon color={statusColor} size={24} />
            <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-md text-sm font-medium">
              {statusLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4 text-lg">
          <div className="flex items-center gap-4">
            <span className="w-28 font-semibold">Nome:</span>
            <span className="bg-gray-100 px-4 py-2 rounded">{collector.name || '-'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-28 font-semibold">Categoria:</span>
            <span className="bg-gray-100 px-4 py-2 rounded">{collector.category || '-'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-28 font-semibold">Peso:</span>
            <span className="bg-gray-100 px-4 py-2 rounded">{collector.weight ?? '-'}kg</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-28 font-semibold">Lotação:</span>
            <span className="bg-gray-100 px-4 py-2 rounded">{collector.percentage ?? '-'}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCollector;
