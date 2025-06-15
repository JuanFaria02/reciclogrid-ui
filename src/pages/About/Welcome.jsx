const Welcome = () => {
    return (
      <div className="mt-24 mx-auto bg-white p-10 shadow-[0px_4px_80px_rgba(0,0,0,0.2)] max-w-5xl rounded-2xl border border-gray-200 text-center flex flex-col justify-between h-[500px]">
        
        <h1 className="text-4xl font-bold text-green-700 mb-6">Bem-vindos ao RecicloGrid</h1>
  
        <p className="text-lg text-gray-800 max-w-3xl mx-auto">
          Esse Sistema consiste no monitoramento de coletores com foco na sustentabilidade e gestão eficiente de resíduos descartados. 
          O Sistema tem o objetivo de auxiliar a coleta de resíduos eletrônicos, coletando informações enviadas pelos sensores inseridos nos recipientes.
        </p>
  
        <div className="flex items-center justify-center gap-4 mt-10">
          <img src="/uff_logo.svg" 
            alt="Logo UFF" 
            width="200"
            height="100"
            className="h-16 object-contain"
          />
          <img
            src="/reciclogrid_logo.svg"
            alt="Logo Reciclogrid"
            width="200"
            height="100"
            className="h-16 md:h-auto"
          />        
        </div>
      </div>
    );
  };
  
  export default Welcome;
  