import { useParams } from "react-router-dom";
import { useEmployee } from "../../hooks/useEmployee";
import { ClipLoader } from "react-spinners";

const ViewEmployee = () => {
  const { employeeId } = useParams();
  const { employee, loading, error } = useEmployee(employeeId);

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

  if (error) return <div className="text-center mt-10 text-red-600">Erro ao carregar funcionário.</div>;
  if (!employee) return <div className="text-center mt-10">Funcionário não encontrado.</div>;

  return (
    <div className="mt-10 mx-auto bg-white p-10 shadow-[0px_4px_80px_rgba(0,0,0,0.2)] max-w-3xl rounded-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
            Operador - {employee.name || 'Sem Nome'}
        </h1>

        <div className="space-y-4 text-lg">
            <div className="flex items-center gap-4">
                <span className="w-36 font-semibold">Nome:</span>
                <span className="bg-gray-100 px-4 py-2 rounded">{employee.name || '-'}</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="w-36 font-semibold">Email:</span>
                <span className="bg-gray-100 px-4 py-2 rounded">{employee.email || '-'}</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="w-36 font-semibold">Telefone:</span>
                <span className="bg-gray-100 px-4 py-2 rounded">{employee.phone || '-'}</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="w-36 font-semibold">Tipo:</span>
                <span className="bg-gray-100 px-4 py-2 rounded">{employee.type || '-'}</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="w-36 font-semibold">CPF:</span>
                <span className="bg-gray-100 px-4 py-2 rounded">{employee.documentNumber || '-'}</span>
            </div>

            <div className="flex items-center gap-4">
                <span className="w-36 font-semibold">Empresa:</span>
                <span className="bg-gray-100 px-4 py-2 rounded">{employee.company?.name || '-'}</span>
            </div>
        </div>

        <div className="mt-10 flex">
            <a href="/operadores" title="Voltar para tela de funcionários">
                <img src="/seta_prox_esq_pag.svg"
                    alt="Voltar página"
                    width="40"
                    height="40"
                    className="cursor-pointer hover:scale-105 transition"/>
            </a>
        </div>

    </div>
  );
};

export default ViewEmployee;
