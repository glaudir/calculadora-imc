import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Label from "./components/Label";
import ReferenceTable from "./components/referenceTable";
import { IMCResult, calculateIMC } from "./lib/IMC";
import ResultsTable from "./components/ResultsTable";

function App() {

  const [IMCData, setIMCData] = useState<null | { 
    weight: number, 
    height: number, 
    IMC: number, 
    IMCResult: string
  }>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // evento para nao recarregar a pagina ao submeter o form
    e.preventDefault();
    // pega o valor do formulario
    const formData = new FormData(e.currentTarget);
    // converte para objeto javascript
    const data = Object.fromEntries(formData) as { weight: string, height: string };
    // lidar com campo vazio do formulario
    const { weight, height } = data;
    // se algum campo estiver vazio
    if(!weight || !height) {
      alert('Preencha todos os campos');
      return;
    }
    // parse strings para numeros
    const weightNumber = parseFloat(weight.replace(',', '.'));
    const heightNumber = parseFloat(height.replace(',', '.')) / 100;
    // testa se os numeros sao validos
    if(isNaN(weightNumber) || isNaN(heightNumber)) {
      alert('Preencha os campos com números válidos');
      return;
    }
    // verifica os pesos maximos e minimos
    if(weightNumber < 2 || weightNumber > 500) {
      alert('O Peso precisa ser entre 2 e 500 Kg');
      return;
    }
    // verifica as alturas maximas e minimss
    if(heightNumber < 0.5 || heightNumber > 2.5) {
      alert('A altura precisa ser entre 0.5 e 2.5');
      return;
    }
    // calcula o imc
    const IMC = calculateIMC(weightNumber, heightNumber);
    const IMCResultString = IMCResult(IMC);
    console.log(IMCResultString);

    setIMCData({
      weight: weightNumber,
      height: heightNumber,
      IMC: IMC,
      IMCResult: IMCResultString
    });

    e.currentTarget.reset();
  }

  function handleClickReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIMCData(null);
  }
  
  return (
    <main className="bg-white max-w-4xl mx-auto md:py-24 md:px-48 px-5 py-10">
      <section id="form">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="weight">Peso (Kg)</Label>
            <Input disabled={!!IMCData} name="weight" className="mt-2" type="text" id="weight" />
          </div>
          <div className="mt-4">
            <Label htmlFor="height">Altura (cm)</Label>
            <Input disabled={!!IMCData} name="height" className="mt-2" type="text" id="height" />
          </div>
          { IMCData ? (
            <Button type="button" onClick={handleClickReset}>Refazer</Button>
          ) : (
            <Button type="submit">Calcular</Button>
          )}
        </form>
      </section>
      <section id="result" className="py-10 px-4 h-40">
        { IMCData ? (
          <ResultsTable IMCData={IMCData} />
        ) : (
          <p className="text-center text-neutral-400 text-xl">Saiba agora se está no seu peso ideal</p>
        )}
        
      </section>
      <section id="reference-table">
        <ReferenceTable/>
      </section>
    </main>
  )
}

export default App
