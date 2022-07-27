import { useState } from "react";
import RangeInput from "./components/RangeInput";

function calculateMorgage(
  loanAmount: number,
  interestRate: number,
  repaymentTime: number
) {
  const monthlyInterest = interestRate / 100 / 12;
  const totalMonths = repaymentTime * 12;
  return (
    loanAmount *
    ((monthlyInterest * (1 + monthlyInterest) ** totalMonths) /
      ((1 + monthlyInterest) ** totalMonths - 1))
  );
}

function App() {
  const [purchasePrice, setPurchasePrice] = useState(450_000);
  const [downPayment, setDownPayment] = useState(135_000);
  const [repaymentTime, setRepaymentTime] = useState(25);
  const [interestRate, setInterestRate] = useState(3);
  const loanAmount = Math.max(purchasePrice - downPayment, 0);

  const estimatedPerMonth = calculateMorgage(
    loanAmount,
    interestRate,
    repaymentTime
  );

  return (
    <div className="flex h-screen text-lg">
      <div className="container grid grid-cols-1 gap-8 m-auto md:grid-cols-2 lg:grid-cols-3 bg-gray-200 rounded border border-black p-8">
        <div className="md:col-span-2 lg:col-span-3 font-semibold text-2xl">
          Mortgage Calculator
        </div>
        <div>
          <label className="block space-y-4">
            Purchase price: <b>${purchasePrice.toLocaleString()}</b>
            <RangeInput
              value={purchasePrice}
              step={5_000}
              min={0}
              max={995_000}
              set={setPurchasePrice}
            />
          </label>
        </div>
        <div>
          <label className="block space-y-4">
            Down payment:{" "}
            <b>${Math.min(downPayment, purchasePrice).toLocaleString()}</b>
            <RangeInput
              value={Math.min(downPayment, purchasePrice)}
              step={5_000}
              min={0}
              max={955_000}
              set={setDownPayment}
            />
          </label>
        </div>
        <div>
          <label className="block space-y-4">
            Repayment time:{" "}
            <b>
              {repaymentTime} year{repaymentTime > 1 ? "s" : ""}
            </b>
            <RangeInput
              value={repaymentTime}
              step={1}
              min={1}
              max={30}
              set={setRepaymentTime}
            />
          </label>
        </div>
        <div>
          <label className="block space-y-4">
            Interest rate: <b>{interestRate}%</b>
            <RangeInput
              value={interestRate}
              step={0.5}
              min={0.5}
              max={10}
              set={setInterestRate}
            />
          </label>
        </div>
        <div className="space-y-2">
          <div className="block">Loan amount</div>
          <div>
            <b className="text-xl">${loanAmount.toLocaleString()}</b>
          </div>
        </div>
        <div className="space-y-2">
          <div className="block">Estimated pr. month:</div>
          <div>
            <b className="text-xl">
              ${(+estimatedPerMonth.toFixed(2)).toLocaleString()}
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
