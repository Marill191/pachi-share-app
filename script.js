const form = document.getElementById('investmentForm');
const list = document.getElementById('investmentList');
const totalAmountElement = document.getElementById('totalAmount');
const individualShareElement = document.getElementById('individualShare');
const profitAmountInput = document.getElementById('profitAmount');
const profitDistributionElement = document.getElementById('profitDistribution');

let totalAmount = 0;
let investments = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const amount = parseInt(document.getElementById('amount').value);
  const datetime = document.getElementById('datetime').value;

  // 投資情報をリストに追加
  const li = document.createElement('li');
  li.textContent = `${name} が ${datetime} に ${amount}円 投資しました。`;
  list.appendChild(li);

  // 投資データを保存
  investments.push({ name, amount });

  // 総投資額の更新
  totalAmount += amount;
  totalAmountElement.textContent = totalAmount;

  // 各人の投資割合を計算して表示
  let shareText = '';
  investments.forEach(investment => {
    const share = ((investment.amount / totalAmount) * 100).toFixed(2);
    shareText += `${investment.name}: ${share}%<br>`;
  });

  individualShareElement.innerHTML = shareText;

  form.reset();
});

// 利益の分配計算
profitAmountInput.addEventListener('input', () => {
  const totalProfit = parseInt(profitAmountInput.value);

  if (!isNaN(totalProfit) && totalProfit > 0) {
    // 各投資者の投資額を引いた残り金額を計算
    let remainingProfit = totalProfit;
    investments.forEach(investment => {
      remainingProfit -= investment.amount; // 投資額を引く
    });

    // 残り金額を分配
    let distributionText = '利益の分配:<br>';
    if (remainingProfit > 0) {
      investments.forEach(investment => {
        const shareOfProfit = (investment.amount / totalAmount) * remainingProfit;
        distributionText += `${investment.name} の分配額: ${shareOfProfit.toFixed(2)}円<br>`;
      });
    } else {
      distributionText += '利益は投資額を引いた後の残り金額が0以下です。';
    }

    profitDistributionElement.innerHTML = distributionText;
  } else {
    profitDistributionElement.innerHTML = '';
  }
});