import CollectorIcon from "../../components/icons/CollectorIcon"

const Collectors = () => {
    return (
        <>
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
                    <tr>
                        <td colSpan={6} className="px-8 h-3 py-4">
                        <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-5">
                            <CollectorIcon color="green" size={35}/>
                            <span className="text-center font-medium flex-1 left-16 relative">TOT A</span>
                            <span className="text-center flex-1 relative left-[70px]">Coletor A1</span>
                            <span className="text-center flex-1 relativ">2Kg</span>
                            <span className="text-center flex-1 relative right-[50px]">3%</span>
                            <img className="hover:bg-green-100 transition cursor-pointer" src="/seta_detalhes.svg" alt="Detalhes do Coletor" width="50" height="50"/>
                        </div>
                        </td>
                    </tr>
                </tbody>
            
                <tfoot className="h-20">
                    <tr>
                        <td colSpan="100%">
                        <div className="flex justify-end w-full pr-10">
                            <button
                                onClick={() => {}}
                                style={{ outline: 'none' }}
                                className="transform transition-transform duration-200 hover:scale-110 pt-8 pb-8 relative bottom-5"
                            >
                                <img
                                src="/seta_prox_esq_pag.svg"
                                alt="Voltar página"
                                width="50"
                                height="50"
                                className="cursor-pointer relative right-3"/>
                            </button>

                            <button
                                onClick={() => {}}
                                style={{ outline: 'none' }}
                                className="transform transition-transform duration-200 hover:scale-110 relative bottom-5"
                            >
                                <img
                                src="/seta_prox_dir_pag.svg"
                                alt="Avançar página"
                                width="50"
                                height="50"
                                className="cursor-pointer"
                                />
                            </button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        </>
    )
}

export default Collectors