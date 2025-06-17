import { useParams } from "react-router-dom";
import { useCollector } from "../../hooks/useCollector";
import { color } from "../../utils/utils";
import CollectorIcon from "../../components/icons/CollectorIcon";
import { ClipLoader } from "react-spinners";

const ViewCollector = () => {
  const { collectorId } = useParams();
  const { collector, loading, error } = useCollector(collectorId);

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
                <h1 className="text-3xl font-bold text-green-700">
                    Coletor - {collector.name || 'Sem Nome'}
                </h1>
                <div className="flex items-center gap-2 mt-4">
                    <CollectorIcon color={statusColor} size={24} />
                    <span
                        className="px-3 py-1 rounded-md text-sm font-medium border"
                        style={{
                        backgroundColor: `${statusColor}20`, 
                        color: statusColor,
                        borderColor: statusColor,
                        }}>
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
                    <span className="bg-gray-100 px-4 py-2 rounded">{collector.weight ?? '-'}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="w-28 font-semibold">Lotação:</span>
                    <span className="bg-gray-100 px-4 py-2 rounded">{collector.percentage ?? '-'}%</span>
                </div>
            </div>

            <div className="flex items-start justify-center">
                <div className="w-64 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm text-sm space-y-2">
                <div>
                    <strong>Latitude:</strong>{" "}
                    {collector.address.latitude ?? <span className="text-gray-400">Não informada</span>}
                </div>
                <div>
                    <strong>Longitude:</strong>{" "}
                    {collector.address.longitude ?? <span className="text-gray-400">Não informada</span>}
                </div>

                {collector.address.latitude && collector.address.longitude && (
                    <a
                    href={`https://www.google.com/maps?q=${collector.address.latitude},${collector.address.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 underline hover:text-blue-800"
                    >
                    Ver no Google Maps
                    </a>
                )}
                </div>
            </div>
        </div>
        <div className="mt-8">
            <a href="/coletores" title="Voltar para tela de coletores">
                <img
                src="/seta_prox_esq_pag.svg"
                alt="Voltar página"
                width="40"
                height="40"
                className="cursor-pointer hover:scale-105 transition"
                />
            </a>
        </div>
    </div>
  );
};

export default ViewCollector;
