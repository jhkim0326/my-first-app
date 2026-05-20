import React, { useMemo } from 'react';

const mockStocks = [
  {
    name: '삼성전자',
    type: 'value',
    per: 11,
    pbr: 1.1,
    roe: 14,
    debtRatio: 40,
    reports: 5,
    foreignBuy: true,
    targetGap: 32,
    popular: true,
    rsi: 61,
    volumeBoost: true,
    opMarginGrowth: true,
    smartMoney: false,
    turnoverRank: 10
  },
  {
    name: '알테오젠',
    type: 'growth',
    per: 48,
    pbr: 7.2,
    roe: 18,
    debtRatio: 55,
    reports: 8,
    foreignBuy: true,
    targetGap: 41,
    popular: true,
    rsi: 64,
    volumeBoost: true,
    opMarginGrowth: true,
    smartMoney: true,
    turnoverRank: 7
  }
];

function calculateScore(stock) {
  let score = 0;

  if (stock.foreignBuy) score += 20;
  if (stock.targetGap >= 30) score += 20;
  if (stock.popular && stock.rsi < 70) score += 20;
  if (stock.roe >= 15) score += 20;
  if (stock.volumeBoost) score += 20;

  return score;
}

function growthFilter(stock) {
  return (
    stock.smartMoney &&
    stock.turnoverRank <= 50 &&
    stock.opMarginGrowth
  );
}

function valueFilter(stock) {
  return (
    stock.per < 15 &&
    stock.pbr < 1.2 &&
    stock.debtRatio <= 100 &&
    stock.roe >= 10 &&
    stock.reports >= 2
  );
}

export default function App() {
  const rankedStocks = useMemo(() => {
    return mockStocks
      .filter((stock) => growthFilter(stock) || valueFilter(stock))
      .map((stock) => ({
        ...stock,
        score: calculateScore(stock)
      }))
      .sort((a, b) => b.score - a.score);
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>📈 네이버페이 AI 종목 추천</h1>
      <p>
        데이터 수집 ➜ 필터링 ➜ 점수화 ➜ 최종 추천 구조 기반
      </p>

      <div style={{ marginTop: 30 }}>
        {rankedStocks.map((stock, index) => (
          <div
            key={stock.name}
            style={{
              border: '1px solid #ddd',
              borderRadius: 12,
              padding: 20,
              marginBottom: 20
            }}
          >
            <h2>
              #{index + 1} {stock.name}
            </h2>

            <p>총점: {stock.score} / 100</p>
            <p>ROE: {stock.roe}%</p>
            <p>PER: {stock.per}</p>
            <p>PBR: {stock.pbr}</p>
            <p>목표가 괴리율: {stock.targetGap}%</p>
            <p>거래량 폭증 여부: {stock.volumeBoost ? 'YES' : 'NO'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
